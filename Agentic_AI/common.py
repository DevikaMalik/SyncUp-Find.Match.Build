
import os, json, re
from typing import List, Dict, Any, Optional, Literal, Tuple
from pydantic import BaseModel, Field
from dataclasses import dataclass
from tenacity import retry, stop_after_attempt, wait_exponential
from dotenv import load_dotenv

load_dotenv()

class AgentTrace(BaseModel):
    steps: List[str] = Field(default_factory=list, description="Transparent reasoning steps for the user")

class ChatResponse(BaseModel):
    type: Literal["chat"] = "chat"
    reply: str
    trace: AgentTrace

class Teammate(BaseModel):
    id: str
    name: str
    match_score: float
    complement_skills: List[str]

class MatchResult(BaseModel):
    type: Literal["matchmake"] = "matchmake"
    query: Dict[str, Any]
    candidates: List[Teammate]
    trace: AgentTrace

class Mentor(BaseModel):
    id: str
    name: str
    score: float
    why: str

class MentorRecommendation(BaseModel):
    type: Literal["mentor"] = "mentor"
    goal: str
    mentors: List[Mentor]
    trace: AgentTrace


def load_users(path: str) -> List[Dict[str, Any]]:
    with open(path, "r") as f:
        return json.load(f)

def load_mentors(path: str) -> List[Dict[str, Any]]:
    with open(path, "r") as f:
        return json.load(f)


def score_teammate(user_skills: List[str], desired: List[str], candidate: Dict[str, Any]) -> Tuple[float, List[str]]:
    """Score by how many desired skills the candidate adds that user lacks."""
    desired_set = set(s.lower() for s in desired)
    have_set = set(s.lower() for s in user_skills)
    cand_set = set(s.lower() for s in candidate.get("skills", []))
    complement = list((desired_set - have_set) & cand_set)
    interest_bonus = 0.25 if any(k in (candidate.get("interests") or []) for k in 
                                 ["ai","healthcare","vision","sports","backend","frontend"]) else 0.0
    return len(complement) + interest_bonus, complement

def score_mentor(goal: str, m: Dict[str, Any]) -> Tuple[float, str]:
    g = goal.lower()
    exp = [e.lower() for e in m.get("expertise", [])]
    overlap = sum(1 for e in exp if e in g)
    why = f"Overlaps on: {', '.join([e for e in exp if e in g])}" if overlap else "General guidance"
    return float(overlap), why



def simple_route(user_input: str) -> str:
    text = user_input.lower()
    if any(k in text for k in ["team", "teammate", "match", "matchmaking", "form team"]):
        return "matchmake"
    if any(k in text for k in ["mentor", "guide", "adviser", "advice on project"]):
        return "mentor"
    return "chat"



def _use_gemini() -> bool:
    return bool(os.getenv("GOOGLE_API_KEY"))

def _use_openai() -> bool:
    return bool(os.getenv("OPENAI_API_KEY"))

@retry(stop=stop_after_attempt(2), wait=wait_exponential(multiplier=1, min=1, max=4))
def call_llm(prompt: str) -> str:
    """Call Gemini if available, else OpenAI, else mock LLM."""
    if _use_gemini():
        import google.generativeai as genai
        genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
        model = genai.GenerativeModel(model_name=os.getenv("GEMINI_MODEL", "gemini-1.5-flash"))
        resp = model.generate_content(prompt)
        return getattr(resp, "text", "") or "[Gemini returned empty]"
    if _use_openai():
        from openai import OpenAI
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
        resp = client.chat.completions.create(model=model, messages=[{"role": "user", "content": prompt}])
        return resp.choices[0].message.content
    # Mock fallback
    return f"[mock-llm] {prompt[:160]}..."



def tool_matchmake(payload: Dict[str, Any], users_path: str) -> MatchResult:
    skills = [s.lower() for s in payload.get("skills", [])]
    desired = [s.lower() for s in payload.get("desired", skills)]
    trace = AgentTrace(steps=[
        "Parsing input → skills & desired skills",
        "Loading candidate users",
        "Scoring complementarity",
        "Returning top candidates"
    ])
    db = load_users(users_path)
    scored = []
    for u in db:
        sc, comp = score_teammate(skills, desired, u)
        if sc > 0:
            scored.append((sc, comp, u))
    scored.sort(key=lambda x: x[0], reverse=True)
    top = [Teammate(id=u["id"], name=u["name"], match_score=round(sc, 2), complement_skills=comp)
           for sc, comp, u in scored[:5]]
    return MatchResult(query={"skills": skills, "desired": desired}, candidates=top, trace=trace)

def tool_mentor(goal: str, mentors_path: str) -> MentorRecommendation:
    trace = AgentTrace(steps=[
        "Parsing goal description",
        "Loading mentor directory",
        "Scoring expertise overlap",
        "Returning recommended mentors"
    ])
    db = load_mentors(mentors_path)
    scored = []
    for m in db:
        sc, why = score_mentor(goal, m)
        if sc >= 0:
            scored.append((sc, why, m))
    scored.sort(key=lambda x: x[0], reverse=True)
    top = [Mentor(id=m["id"], name=m["name"], score=float(sc), why=why)
           for sc, why, m in scored[:5]]
    return MentorRecommendation(goal=goal, mentors=top, trace=trace)

from typing import Dict, Any, List, Optional
from pathlib import Path
import random
from pydantic import BaseModel


class HackathonState(BaseModel):
    duration: str
    user_skills: List[str]
    required_skills: List[str]
    goal: str
    max_iterations: int = 5
    iterations: int = 0
    team_members: List[Dict[str, Any]] = [] 
    project_idea: Optional[str] = None
    evaluation_reason: Optional[str] = None
    strategy_plan: Optional[str] = None
    
    evaluation: Optional[str] = None
    team_dynamics: Optional[List[Dict[str, Any]]] = None
    tech_stack: List[Dict[str, str]] = [] 


from pathlib import Path

# def node_matchmake(state: HackathonState) -> HackathonState:
#     """LangGraph node → wrap existing tool_matchmake into state."""
#     payload = {
#         "skills": state.user_skills,
#         "desired": state.required_skills,
#     }
#     users_path = load_users(users_path)
    
#     # Call your existing tool_matchmake
#     result = tool_matchmake(payload, users_path)
    
#     # Store teammates in the state (names only or full objects)
#     state.team_members = [c.name for c in result.candidates]
#     return state

def node_matchmake(state: HackathonState) -> HackathonState:
    """LangGraph node → directly use load_users + score_teammate for matchmaking."""
    payload = {
        "skills": [s.lower() for s in state.user_skills],
        "desired": [s.lower() for s in state.required_skills],
    }

    users_path = str(Path(__file__).parent / "data" / "mock_users.json")
    db = load_users(users_path)

    scored = []
    for u in db:
        sc, comp = score_teammate(payload["skills"], payload["desired"], u)
        if sc > 0:
            scored.append((sc, comp, u))

    scored.sort(key=lambda x: x[0], reverse=True)

    
    state.team_members = [
        {
            "id": u["id"],
            "name": u["name"],
            "match_score": round(sc, 2),
            "complement_skills": comp,
        }
        for sc, comp, u in scored[:5]
    ]

    return state



# def tool_project_ideas(state: HackathonState) -> HackathonState:
#     """Generate simple project ideas from goal."""
#     ideas = [
#         f"AI-powered solution for {state.goal}",
#         f"Blockchain platform targeting {state.goal}",
#         f"Mobile app for {state.goal}",
#     ]
#     state.project_idea = random.choice(ideas)
#     return state

def tool_project_ideas(state: HackathonState) -> HackathonState:
    """
    Generate unique, multipurpose project ideas based on the hackathon goal.
    Uses LLM to ensure creativity and global relevance.
    """
    prompt = f"""
    You are participating in a global hackathon.
    The hackathon goal is: {state.goal}.
    
    Suggest 3 unique and innovative project ideas that could be applied worldwide,
    across multiple industries or communities. 
    Keep the ideas short (1 sentence each) but clear enough to inspire a project team.
    """

    try:
        response = call_llm(prompt)
        ideas = [line.strip("-• \n") for line in response.split("\n") if line.strip()]
    except Exception as e:
        ideas = [
            f"AI-driven platform for {state.goal}",
            f"Blockchain-based solution for {state.goal}",
            f"Mobile-first global app tackling {state.goal}",
        ]

    if ideas:
        state.project_idea = random.choice(ideas)
    else:
        state.project_idea = f"Innovative solution for {state.goal}"

    return state



def tool_evaluate(state: HackathonState) -> HackathonState:
    """
    Evaluate the current project idea using an LLM.
    Stores both decision (approved/not approved) and reasoning.
    """
    state.iterations += 1

    if state.iterations >= state.max_iterations:
        state.evaluation = "max_reached"
        state.evaluation_reason = "Iteration limit reached before approval."
        return state

    system_message = (
        "You are a professional hackathon evaluator and mentor. "
        "Analyze the project idea for innovation, feasibility, and global applicability. "
        "Return your evaluation in JSON with two fields: "
        "{ 'decision': 'approved' or 'not approved', 'reason': '<short explanation>' }."
    )

    user_prompt = f"""
    Hackathon Goal: {state.goal}
    Project Idea: {state.project_idea}
    """

    try:
        response = call_llm(f"{system_message}\n\n{user_prompt}")

        
        decision, reason = None, None
        if "approved" in response.lower():
            decision = "approved"
        elif "not approved" in response.lower():
            decision = "not approved"

        
        if "reason" in response.lower():
            try:
                parsed = json.loads(response)
                decision = parsed.get("decision", decision)
                reason = parsed.get("reason", None)
            except Exception:
                reason = response.strip()

        state.evaluation = decision or "not approved"
        state.evaluation_reason = reason or "No explanation provided by LLM."

    except Exception:
        if "health" in (state.project_idea or "").lower():
            state.evaluation = "approved"
            state.evaluation_reason = "Fallback rule: health-related projects are prioritized."
        else:
            state.evaluation = "not approved"
            state.evaluation_reason = "Fallback rule: idea not in priority domain."

    return state



def tool_optimize(state: HackathonState) -> HackathonState:
    """
    Refine the project idea using an LLM.
    Focus on addressing gaps and improving innovation, feasibility, and uniqueness.
    """
    if not state.project_idea:
        return state

    system_message = (
        "You are a professional hackathon mentor. "
        "Your task is to refine project ideas so they are more innovative, globally impactful, "
        "and technically feasible. Focus on what is missing or unclear in the idea. "
        "Output only the improved project idea as plain text."
    )

    user_prompt = f"""
    Hackathon Goal: {state.goal}
    Current Project Idea: {state.project_idea}

    Please refine this idea by adding missing strengths, addressing weaknesses,
    and making it stand out for a global hackathon.
    """

    try:
        refined = call_llm(f"{system_message}\n\n{user_prompt}")
        if refined and isinstance(refined, str):
            state.project_idea = refined.strip()
        else:
            
            state.project_idea = state.project_idea + " (optimized)"
    except Exception:
        
        state.project_idea = state.project_idea + " (optimized - fallback)"

    return state

def tool_strategy_plan(state: HackathonState) -> HackathonState:
    """
    Generate a strategy/workflow plan for the approved project idea
    based on the hackathon duration.
    """
    if state.evaluation != "approved" or not state.project_idea:
        return state  

    system_message = (
        "You are an expert hackathon project manager. "
        "Your task is to create a clear, step-by-step workflow strategy "
        "for building the given project idea within the hackathon duration. "
        "Focus on realistic milestones, task breakdown, and teamwork."
    )

    user_prompt = f"""
    Hackathon Duration: {state.duration} days
    Hackathon Goal: {state.goal}
    Approved Project Idea: {state.project_idea}

    Please provide a strategy plan in structured steps, such as:

    - Day 1–2: Research & brainstorming
    - Day 3–4: Build MVP backend & frontend
    - Day 5: Integration & testing
    - Day 6: Pitch deck preparation

    Ensure the plan fits within {state.duration} days.
    """

    try:
        plan = call_llm(f"{system_message}\n\n{user_prompt}")
        if plan and isinstance(plan, str):
            state.strategy_plan = plan.strip()
        else:
            state.strategy_plan = "Strategy plan could not be generated."
    except Exception:
        state.strategy_plan = "Error generating strategy plan."

    return state

# def tool_team_dynamics(state: HackathonState) -> HackathonState:
#     """
#     Divide the strategy plan among available team members.
#     Uses LLM if available; else does a simple round-robin distribution.
#     """
#     if not state.strategy_plan or not state.team_members:
#         state.team_dynamics = []
#         return state

#     tasks = [line.strip("-• \n") for line in state.strategy_plan.split("\n") if line.strip()]
#     members = state.team_members
#     dynamics = []

#     try:
#         # Try with LLM for smart assignment
#         member_names = [m["name"] for m in members]
#         prompt = f"""
#         You are a project manager in a hackathon.
#         The strategy plan is:
#         {state.strategy_plan}

#         The team members are:
#         {', '.join(member_names)}

#         Please divide the tasks among team members fairly, 
#         based on their skills if possible. 
#         Return JSON like:
#         [
#           {{"member": "Alice", "tasks": ["Task1", "Task2"]}},
#           {{"member": "Bob", "tasks": ["Task3"]}}
#         ]
#         """
#         response = call_llm(prompt)

#         # Try parsing JSON directly
#         parsed = json.loads(response)
#         if isinstance(parsed, list):
#             dynamics = parsed
#         else:
#             raise ValueError("Unexpected LLM response")
#     except Exception:
#         # Fallback: simple round-robin assignment
#         dynamics = []
#         for i, task in enumerate(tasks):
#             member = members[i % len(members)]["name"]
#             found = next((d for d in dynamics if d["member"] == member), None)
#             if not found:
#                 dynamics.append({"member": member, "tasks": []})
#             [d for d in dynamics if d["member"] == member][0]["tasks"].append(task)

#     state.team_dynamics = dynamics
#     return state

def tool_team_dynamics(state: HackathonState) -> dict:
    """
    Divide the strategy plan among team members concisely.
    """
    if not state.strategy_plan or not state.team_members:
        return {"team_dynamics": []}

    tasks = [line.strip("-• \n") for line in state.strategy_plan.split("\n") if line.strip()]
    members = state.team_members
    dynamics = []

    try:
        member_names = [m["name"] for m in members]
        prompt = f"""
        You are managing a hackathon project.

        Strategy plan:
        {state.strategy_plan}

        Team members:
        {', '.join(member_names)}

        Assign tasks concisely and fairly.
        Return JSON list with each member and short task summaries, e.g.:

        [
          {{"member": "Aarav", "tasks": ["Backend setup", "API integration"]}},
          {{"member": "Isha", "tasks": ["UI design"]}}
        ]
        """
        response = call_llm(prompt)
        parsed = json.loads(response)
        if isinstance(parsed, list):
            dynamics = parsed
    except Exception:
       
        dynamics = []
        for i, task in enumerate(tasks):
            member = members[i % len(members)]["name"]
            found = next((d for d in dynamics if d["member"] == member), None)
            if not found:
                dynamics.append({"member": member, "tasks": []})
            [d for d in dynamics if d["member"] == member][0]["tasks"].append(task)

    return {"team_dynamics": dynamics}

def tool_tech_stack(state: HackathonState) -> dict:
    """
    Suggest a concise tech stack for the project idea.
    Each entry includes a tool and a short reason.
    """
    if state.evaluation != "approved" or not state.project_idea:
        return {"tech_stack": []}

    stack: List[Dict[str, str]] = []
    prompt = f"""
    You are advising a hackathon team.
    Project idea: {state.project_idea}

    Suggest a concise recommended tech stack (5–7 items max).
    For each tool, include a very short reason why it is suitable.

    Return valid JSON list of objects, e.g.:
    [
      {{"tool": "Python", "reason": "Great for AI/ML and rapid prototyping"}},
      {{"tool": "FastAPI", "reason": "Lightweight backend for APIs"}},
      {{"tool": "React", "reason": "Scalable UI framework"}}
    ]
    """

    try:
        response = call_llm(prompt)

        
        parsed = json.loads(response)
        if isinstance(parsed, list) and all(isinstance(item, dict) for item in parsed):
            stack = parsed
        else:
            
            stack = []
            for line in response.split("\n"):
                if "-" in line:
                    parts = line.split("-", 1)
                    stack.append({"tool": parts[0].strip(), "reason": parts[1].strip()})
    except Exception:
        
        stack = [
            {"tool": "Python", "reason": "Popular for ML/AI and fast development"},
            {"tool": "FastAPI", "reason": "Simple and fast backend for APIs"},
            {"tool": "React", "reason": "Flexible and scalable frontend"},
            {"tool": "PostgreSQL", "reason": "Reliable relational database"},
            {"tool": "Docker", "reason": "Portable containerization"},
        ]

    return {"tech_stack": stack}
