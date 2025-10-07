
from typing import Dict, Any, TypedDict, Optional
from pydantic import BaseModel
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from langchain_community.chat_message_histories import ChatMessageHistory
from langgraph.checkpoint.sqlite import SqliteSaver
import sqlite3
from langsmith import Client
import os


client = Client(api_key=os.getenv("LANGCHAIN_API_KEY"))

from common import (
    ChatResponse, MatchResult, MentorRecommendation, AgentTrace,
    simple_route, call_llm, tool_matchmake, tool_mentor
)

class AgentState(TypedDict, total=False):
    user_input: str
    context: Dict[str, Any]
    output: Dict[str, Any]
    route: str
    trace: list
    chat_history: ChatMessageHistory

def node_router(state: AgentState) -> AgentState:
    text = state.get("user_input", "")
    route = simple_route(text)
    (state.setdefault("trace", [])).append(f"Router → {route}")
    state["route"] = route
    return state

# def node_chat(state: AgentState) -> AgentState:
#     user_text = state.get("user_input", "")
#     reply = call_llm(f"You are SyncUp assistant. Be concise and helpful. User: {user_text}")
#     state["output"] = ChatResponse(reply=reply, trace=AgentTrace(steps=state.get("trace", []))).model_dump()
#     return state

def node_chat(state: AgentState) -> AgentState:
    user_text = state.get("user_input", "")
    chat_history: ChatMessageHistory = state.get("chat_history", ChatMessageHistory())

    chat_history.add_user_message(user_text)

    reply = call_llm(
        f"You are SyncUp assistant. Keep track of what the user tells you. provide descriptive answers based on the question. \n\n"
        # f"Conversation so far: {chat_history.messages}\n\n"
        f"User: {user_text}"
    )

    chat_history.add_ai_message(reply)

    state["chat_history"] = chat_history
    state["output"] = {"reply": reply}
    return state


def node_matchmake(state: AgentState) -> AgentState:
    ctx = state.get("context", {})
    payload = ctx.get("matchmake_payload") or {"skills": [], "desired": []}
    result = tool_matchmake(payload, users_path=ctx["users_path"])
    state["output"] = result.model_dump()
    return state

def node_mentor(state: AgentState) -> AgentState:
    ctx = state.get("context", {})
    goal = ctx.get("mentor_goal") or state.get("user_input","")
    result = tool_mentor(goal, mentors_path=ctx["mentors_path"])
    state["output"] = result.model_dump()
    return state

def route_decider(state: AgentState) -> str:
    return state.get("route", "chat")

def build_workflow() -> StateGraph:
    builder = StateGraph(AgentState)
    builder.add_node("router", node_router)
    builder.add_node("chat", node_chat)
    # builder.add_node("matchmake", node_matchmake)
    builder.add_node("mentor", node_mentor)

    builder.set_entry_point("router")
    builder.add_conditional_edges(
        "router",
        route_decider,
        {
            "chat": "chat",
            # "matchmake": "matchmake",
            "mentor": "mentor"
        }
    )
    builder.add_edge("chat", END)
    # builder.add_edge("matchmake", END)
    builder.add_edge("mentor", END)

    return builder

def get_graph():
    # memory = MemorySaver()
    # workflow = build_workflow().compile(checkpointer=memory)
    # return workflow
    conn = sqlite3.connect("checkpoints.sqlite", check_same_thread=False)
    checkpointer = SqliteSaver(conn)
    workflow = build_workflow().compile(checkpointer=checkpointer)
    return workflow




from langgraph.graph import StateGraph, END
from common import (
    HackathonState,
    node_matchmake,
    tool_project_ideas,
    tool_evaluate,
    tool_optimize,
    tool_strategy_plan,
    tool_team_dynamics, 
    tool_tech_stack
)
def resolve_evaluation(state: HackathonState) -> str:
    """Return edge key based on evaluation result."""
    return state.evaluation or "not approved"

def build_hackathon_graph():
    graph = StateGraph(HackathonState)

   
    graph.add_node("matchmake", node_matchmake)
    graph.add_node("ideas", tool_project_ideas)
    graph.add_node("evaluate", tool_evaluate)
    graph.add_node("optimize", tool_optimize)
    graph.add_node("strategy_plan", tool_strategy_plan) 
    graph.add_node("team_dynamics", tool_team_dynamics)
    graph.add_node("tech_stack", tool_tech_stack)
    graph.add_edge("matchmake", "ideas")
    graph.add_edge("ideas", "evaluate")

   
    graph.add_conditional_edges(
        "evaluate",
        resolve_evaluation,
        {
            "approved": "strategy_plan",   
            "not approved": "optimize",
            "max_reached": END,
        },
    )

    graph.add_edge("optimize", "evaluate")
    graph.add_edge("strategy_plan", "team_dynamics")  
    graph.add_edge("strategy_plan", "tech_stack")
    graph.add_edge("team_dynamics", END)
    graph.add_edge("tech_stack", END)
    
    graph.set_entry_point("matchmake")
    compiled = graph.compile()

    return compiled
