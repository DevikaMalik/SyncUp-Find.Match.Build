
import streamlit as st
import json
import uuid
import graphviz
from graph import get_graph, build_hackathon_graph
from common import HackathonState


st.set_page_config(page_title="SyncUp Agent", layout="wide")
st.title(" SyncUp Agentic Assistant")

wf = get_graph()
users_path = "data/mock_users.json"
mentors_path = "data/mock_mentors.json"

if "thread_id" not in st.session_state:
    st.session_state["thread_id"] = "default"

st.markdown(f"###  Current Session: `{st.session_state['thread_id']}`")

col1, col2 = st.columns([1, 3])
with col1:
    if st.button("Start New Session"):
        st.session_state["thread_id"] = str(uuid.uuid4())
        st.success(f"Started new session: {st.session_state['thread_id']}")

with col2:
    new_id = st.text_input("Change Session ID", st.session_state["thread_id"])
    if new_id and new_id != st.session_state["thread_id"]:
        st.session_state["thread_id"] = new_id
        st.info(f"Switched to session: {new_id}")


# ---------------- Renderer ----------------
def render_output(payload: dict):
    """Nicely display workflow output in Streamlit."""
    if not payload:
        st.warning("No output.")
        return

    # Chat case
    if "reply" in payload:
        st.chat_message("assistant").write(payload["reply"])

    # Matchmaking case
    elif "matches" in payload or "teammates" in payload or "team_members" in payload:
        st.success("👥 Suggested teammates:")
        for t in payload.get("matches", payload.get("teammates", payload.get("team_members", []))):
            st.markdown(f"- **{t.get('name','?')}** — skills: {', '.join(t.get('skills', []))}")

    # Mentor recommender case
    elif "mentors" in payload:
        st.info("🎓 Recommended mentors:")
        for m in payload["mentors"]:
            st.markdown(f"- **{m.get('name','?')}** — expertise: {', '.join(m.get('expertise', []))}")

    # Fallback
    else:
        st.json(payload)


# ---------------- Tabs ----------------
tabs = st.tabs(["Chat", "Mentor Recommender"])

with tabs[0]:
    st.subheader("Chat")
    user_text = st.text_input("Ask anything:", "What is the use of Agentic AI in our life")
    if st.button("Send", key="chat_btn"):
        state = {
            "user_input": user_text,
            "context": {"users_path": users_path, "mentors_path": mentors_path}
        }
        out = wf.invoke(
            state,
            config={"configurable": {"thread_id": st.session_state["thread_id"]}}
        )
        render_output(out.get("output", {}))


with tabs[1]:
    st.subheader("Mentor Recommender")
    goal = st.text_input("Your project goal", "AI for healthcare project")
    if st.button("Find Mentors"):
        ctx = {
            "users_path": users_path,
            "mentors_path": mentors_path,
            "mentor_goal": goal
        }
        out = wf.invoke(
            {"user_input": "mentor for project", "context": ctx},
            config={"configurable": {"thread_id": st.session_state["thread_id"]}}
        )
        render_output(out.get("output", {}))


# ---------------- Hackathon Sidebar ----------------
with st.sidebar:
    st.header("Hackathon Setup")
    duration = st.text_input("Hackathon Duration", "48 hours")
    user_skills = st.text_area("Your Skills (comma-separated)", "python, ai").split(",")
    required_skills = st.text_area("Required Skills (comma-separated)", "ml, ui").split(",")
    goal = st.text_input("Hackathon Goal", "AI for healthcare")
    max_iter = st.number_input("Max Iterations", 1, 10, 5)

if st.button("Run Hackathon Agent", key="run_button"):
    state = HackathonState(
        duration=duration,
        user_skills=[s.strip() for s in user_skills if s.strip()],
        required_skills=[s.strip() for s in required_skills if s.strip()],
        goal=goal,
        max_iterations=max_iter,
    )
    graph = build_hackathon_graph()
    final_state = graph.invoke(state)

    fs = final_state.dict() if hasattr(final_state, "dict") else final_state

    st.success("Hackathon Agent Completed")

    # ---------------- Team Section ----------------
    st.subheader("-> Team Matchmaking")
    if fs.get("team_members"):
        st.table(fs["team_members"])  # render as table
    else:
        st.warning("No team members matched.")

    # ---------------- Project Idea ----------------
    st.subheader("-> Final Project Idea")
    st.info(fs.get("project_idea", "No idea generated"))

    # ---------------- Evaluation ----------------
    st.subheader("-> Evaluation Results")
    st.write(f"**Status:** {fs.get('evaluation', 'N/A')}")
    if fs.get("evaluation_reason"):
        st.caption(f"Reason: {fs['evaluation_reason']}")

    if fs.get("iterations") is not None and fs.get("max_iterations"):
        st.progress(min(fs["iterations"], fs["max_iterations"]) / fs["max_iterations"])

    # ---------------- Strategy Plan ----------------
    if fs.get("strategy_plan"):
        st.subheader("-> Strategy & Workflow Plan")
        with st.expander("View Detailed Strategy Plan"):
            st.markdown(f"```\n{fs['strategy_plan']}\n```")

        # Graphviz diagram visualization
        st.markdown("### Workflow Timeline")
        dot = graphviz.Digraph()
        dot.node("Start", " Start Hackathon", shape="oval", style="filled", color="lightgreen")
        dot.node("Idea", " Project Idea", shape="box", style="filled", color="khaki")
        dot.node("Eval", " Evaluation", shape="diamond", style="filled", color="lightblue")
        dot.node("Plan", " Strategy Plan", shape="box", style="filled", color="pink")
        dot.node("End", " Finish", shape="oval", style="filled", color="salmon")

        dot.edge("Start", "Idea")
        dot.edge("Idea", "Eval")
        dot.edge("Eval", "Plan", label=" Approved", color="green")
        dot.edge("Eval", "Idea", label=" Not Approved", color="red")
        dot.edge("Plan", "End")

        st.graphviz_chart(dot)

    # ---------------- Team Dynamics ----------------
    if fs.get("team_dynamics"):
        st.subheader("-> Team Dynamics & Task Allocation")
        for member in fs["team_dynamics"]:
            st.markdown(f"**{member['member']}**")
            st.write(member["tasks"])

    # ---------------- Tech Stack ----------------
    if fs.get("tech_stack"):
        st.subheader("-> Suggested Tech Stack")
        st.table(fs["tech_stack"])
    else:
        st.warning("No tech stack generated.")

    # ---------------- Debug JSON ----------------
    with st.expander(" Raw State JSON"):
        st.json(fs)
