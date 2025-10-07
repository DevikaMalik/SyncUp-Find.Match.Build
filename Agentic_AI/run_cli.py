
import argparse, json, os
from graph import get_graph

def main():
    parser = argparse.ArgumentParser(description="SyncUp Agentic CLI")
    parser.add_argument("--users", default="data/mock_users.json", help="Path to users JSON")
    parser.add_argument("--mentors", default="data/mock_mentors.json", help="Path to mentors JSON")
    parser.add_argument("--mode", choices=["chat","matchmake","mentor","auto"], default="auto")
    parser.add_argument("--text", default="Find me a team for AI + Healthcare")
    parser.add_argument("--skills", nargs="*", default=["python","ml"])
    parser.add_argument("--desired", nargs="*", default=["react","node","mongodb"])
    args = parser.parse_args()

    wf = get_graph()
    ctx = {"users_path": args.users, "mentors_path": args.mentors}

    if args.mode == "matchmake":
        ctx["matchmake_payload"] = {"skills": args.skills, "desired": args.desired}
    elif args.mode == "mentor":
        ctx["mentor_goal"] = args.text

    input_state = {"user_input": args.text, "context": ctx}
    # out = wf.invoke(input_state)
    out = wf.invoke(
    input_state,
    config={"configurable": {"thread_id": "cli-session-1"}}
)
    print(json.dumps(out.get("output", {}), indent=2))

if __name__ == "__main__":
    main()
