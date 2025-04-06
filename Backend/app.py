from flask import Flask, jsonify
from flask_cors import CORS  # ✅ Import CORS
import os
from pathlib import Path

app = Flask(__name__)
CORS(app)  # ✅ Enable CORS for all routes

# ✅ Define CONVERSATIONS_DIR first
BASE_DIR = Path('.').resolve()
CONVERSATIONS_DIR = BASE_DIR / 'data' / 'conversations'

# ✅ Create the directory if it doesn't exist
os.makedirs(CONVERSATIONS_DIR, exist_ok=True)

# 🔍 Conversation Analyzer
class ConversationAnalyzer:
    def __init__(self, conversation_id, text):
        self.conversation_id = conversation_id
        self.text = text

    def process(self):
        if "internet" in self.text.lower() or "router" in self.text.lower():
            return {"issue_category": "Internet Issue"}
        elif "payment" in self.text.lower():
            return {"issue_category": "Billing Issue"}
        elif "login" in self.text.lower():
            return {"issue_category": "Login Issue"}
        else:
            return {"issue_category": "General Issue"}

# 💡 Solution Recommender
class SolutionRecommender:
    def __init__(self, issue_category):
        self.issue_category = issue_category

    def recommend(self):
        solutions = {
            "Internet Issue": "Restart the router and check cables.",
            "Billing Issue": "Please check your billing history or contact accounts.",
            "Login Issue": "Reset your password using the 'Forgot Password' option.",
            "General Issue": "Forward to Level 2 Support.",
        }
        return solutions.get(self.issue_category, "Contact Support.")

# 🧑‍💻 Team Assigner
class TeamAssigner:
    def __init__(self, issue_category):
        self.issue_category = issue_category

    def assign_team(self):
        team_map = {
            "Internet Issue": "Network Support Team",
            "Billing Issue": "Accounts & Billing Team",
            "Login Issue": "Authentication Team",
            "General Issue": "General Support Team",
        }
        return team_map.get(self.issue_category, "Support Team")

# 📄 API to get processed conversation results
@app.route('/api/conversations', methods=['GET'])
def get_conversations():
    results = []

    for filename in os.listdir(CONVERSATIONS_DIR):
        if filename.endswith('.txt'):
            convo_id = filename.split('.')[0]
            with open(CONVERSATIONS_DIR / filename, 'r') as f:
                text = f.read()
                analyzer = ConversationAnalyzer(convo_id, text)
                analysis = analyzer.process()
                recommender = SolutionRecommender(analysis["issue_category"])
                assigner = TeamAssigner(analysis["issue_category"])

                results.append({
                    "conversation_id": convo_id,
                    "issue_category": analysis["issue_category"],
                    "recommended_solution": recommender.recommend(),
                    "assigned_team": assigner.assign_team()
                })

    return jsonify(results)

# 🚀 Start server
if __name__ == '__main__':
    app.run(debug=True)
