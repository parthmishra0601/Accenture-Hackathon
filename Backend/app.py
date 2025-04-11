from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from datetime import datetime

app = Flask(__name__)
CORS(app)

DATA_PATH = r"Historical_ticket_data.csv"
LAST_MODIFIED = None
DATA_CACHE = None

SUPPORT_DATA = [
    {
        "id": "TECH_004",
        "category": "Technical Support",
        "sentiment": "Anxious",
        "priority": "High",
        "customer":
            "Hello! My project data isn’t syncing between my laptop and tablet. Changes on one device don’t show up on the other. Can you help?",
        "agent":
            "Hi there! Let’s resolve this together. Are both devices logged into the same account? Could you share the sync logs?",
        "solution":
            "The log shows a corrupted sync token. I’ll reset it manually. Go to Settings > Sync > Force Full Sync and wait 10 minutes.",
        "keywords": ['syncing', 'sync', 'data', 'laptop', 'tablet'],
        "conversation": [
            "Customer: Hello! My project data isn’t syncing between my laptop and tablet. Changes on one device don’t show up on the other. Can you help?",
            "Agent: Hi there! Let’s resolve this together. Are both devices logged into the same account? Could you share the sync logs?",
            "Customer: Yes, same account. Here’s a log from my tablet: [file attached].",
            "Agent: Thanks for sharing! The log shows a corrupted sync token. I’ll reset it manually. Go to Settings > Sync > Force Full Sync and wait 10 minutes. Let me know if it works!",
            "Customer: It’s syncing now! Will this happen again?",
            "Agent: Great news! A patch releasing next week will prevent this issue. Thanks for your patience!"
        ]
    },
    {
        "id": "TECH_003",
        "category": "Technical Support",
        "sentiment": "Annoyed",
        "priority": "Critical",
        "customer":
            "Hi, I’m really frustrated. Your smart home app crashes every time I try to connect my older thermostat model. It worked fine on my old phone!",
        "agent":
            "Hello! I apologize for the trouble. Could you confirm your phone model and app version?",
        "solution":
            "HT-2019 isn’t supported in versions after 5.0. We can roll back your app to 4.9 or offer a discount on a compatible thermostat.",
        "keywords": ['crash', 'thermostat', 'compatibility', 'older model'],
        "conversation": [
            "Customer: Hi, I’m really frustrated. Your smart home app crashes every time I try to connect my older thermostat model. It worked fine on my old phone!",
            "Agent: Hello! I apologize for the trouble. Could you confirm your phone model and app version?",
            "Customer: iPhone 15, app version 5.2.1. The thermostat is Model HT-2019.",
            "Agent: Thank you for clarifying. Unfortunately, HT-2019 isn’t supported in versions after 5.0. We can roll back your app to 4.9 or offer a discount on a compatible thermostat. What works best for you?",
            "Customer: I’ll take the discount, but this is disappointing.",
            "Agent: Understood. I’ll email the discount code shortly. We appreciate your patience!"
        ]
    },
    {
        "id": "TECH_002",
        "category": "Technical Support",
        "sentiment": "Confused",
        "priority": "Medium",
        "customer":
            "Good morning! I’m having an issue where my app keeps saying ‘no internet connection,’ but my Wi-Fi is working fine. Other apps load normally.",
        "agent":
            "Hi! Thanks for contacting us. Let’s check the app’s network permissions. Go to Settings > Apps > [App Name] > Permissions. Is ‘Local Network’ enabled?",
        "solution":
            "Enable ‘Local Network’ permissions in app settings and clear the app cache.",
        "keywords": ['no internet', 'network connection', 'wifi', 'permissions'],
        "conversation": [
            "Customer: Good morning! I’m having an issue where my app keeps saying ‘no internet connection,’ but my Wi-Fi is working fine. Other apps load normally.",
            "Agent: Hi! Thanks for contacting us. Let’s check the app’s network permissions. Go to Settings > Apps > [App Name] > Permissions. Is ‘Local Network’ enabled?",
            "Customer: Hmm, it was off! I just turned it on, but still no luck.",
            "Agent: No worries! Please clear the app cache: Settings > Storage > Clear Cache. Then log in again. Does that help?",
            "Customer: That fixed it! Thank you! Any idea why this happened suddenly?",
            "Agent: Glad to hear it! A recent update may have reset permissions. We’ll flag this to our dev team. Cheers!"
        ]
    },
    {
        "id": "TECH_005",
        "category": "Technical Support",
        "sentiment": "Urgent",
        "priority": "Critical",
        "customer":
            "Hi, this is urgent! Your API is rejecting our payment gateway integration. Error: ‘Invalid SSL certificate.’ Our cert is valid and up-to-date!",
        "agent":
            "Hello! Let’s investigate immediately. Could you share the output from openssl s_client -connect yourgateway.com:443?",
        "solution":
            "Our system requires TLS 1.3, but your server supports only up to TLS 1.2. Upgrading the protocol will resolve the authentication error.",
        "keywords": ['payment gateway', 'ssl', 'certificate', 'tls'],
        "conversation": [
            "Customer: Hi, this is urgent! Your API is rejecting our payment gateway integration. Error: ‘Invalid SSL certificate.’ Our cert is valid and up-to-date!",
            "Agent: Hello! Let’s investigate immediately. Could you share the output from openssl s_client -connect yourgateway.com:443?",
            "Customer: Here’s the terminal output: [text]. See? No errors here.",
            "Agent: Thank you! Our system requires TLS 1.3, but your server supports only up to TLS 1.2. Upgrading the protocol will resolve the authentication error.",
            "Customer: Upgrading worked! Thanks for the quick fix!",
            "Agent: Happy to help! Don’t hesitate to reach out for future issues. Goodbye!"
        ]
    },
    {
        "id": "TECH_001",
        "category": "Technical Support",
        "sentiment": "Frustrated",
        "priority": "High",
        "customer":
            "Hi there! I’ve been trying to install the latest update for your design software for hours. It keeps failing at 75% with an ‘unknown error.’ What’s wrong?",
        "agent":
            "Hello! Thank you for reaching out. Let me help troubleshoot. Could you share a screenshot of the error message and confirm your operating system version?",
        "solution":
            "This is a known conflict with third-party antivirus tools. Could you temporarily disable your antivirus and retry?",
        "keywords": ['installation', 'update', 'error', 'antivirus'],
        "conversation": [
            "Customer: Hi there! I’ve been trying to install the latest update for your design software for hours. It keeps failing at 75% with an ‘unknown error.’ What’s wrong?",
            "Agent: Hello! Thank you for reaching out. Let me help troubleshoot. Could you share a screenshot of the error message and confirm your operating system version?",
            "Customer: Sure, it’s Windows 11. Here’s the screenshot: [image link]. I’ve restarted twice, same issue.",
            "Agent: Thank you for the details. This is a known conflict with third-party antivirus tools. Could you temporarily disable your antivirus and retry? I’ll also send a direct download link as a workaround.",
            "Customer: Oh, disabling the antivirus worked! Installation completed. Thanks for your help!",
            "Agent: You’re welcome! Let us know if you need further assistance. Have a great day!"
        ]
    }
]

def load_and_cache_data():
    return SUPPORT_DATA

@app.route("/api/conversations", methods=["GET"])
def get_conversations():
    # This endpoint is now configured to serve the static SUPPORT_DATA as conversations.
    data = load_and_cache_data()
    if data is not None:
        enriched_data = []
        now_timestamp = datetime.now().isoformat()
        for record in data:
            record["customer_timestamp"] = now_timestamp
            record["fetch_timestamp"] = now_timestamp
            record["department"] = record.get("category")  # Map category to department
            record["assigned_team"] = "Support Team"  # Assign a default team since no team is defined in SUPPORT_DATA
            enriched_data.append(record)
        return jsonify(enriched_data)
    return jsonify({"error": "Failed to load conversation data."}), 500

@app.route("/api/query", methods=["POST"])
def query_response():
    """
    Accepts a query string and returns the most similar ticket from SUPPORT_DATA,
    including conversation history.
    """
    user_query = request.json.get("query", "").strip()
    if not user_query:
        return jsonify({"error": "Query is empty"}), 400

    data = load_and_cache_data()
    if not data:
        return jsonify({"error": "Ticket data not available"}), 500

    # Use keywords for matching instead of vectorizing the issue categories.
    best_match = None
    for record in data:
        if any(keyword in user_query.lower() for keyword in record["keywords"]):
            best_match = record
            break  # Stop after finding the first match

    if best_match:
        response_data = {
            "query": user_query,
            "match": {
                "id": best_match.get("id"),
                "category": best_match.get("category"),
                "sentiment": best_match.get("sentiment"),
                "priority": best_match.get("priority"),
                "customer": best_match.get("customer"),
                "agent": best_match.get("agent"),
                "solution": best_match.get("solution"),
                "conversation": best_match.get("conversation")
            },
            "response_timestamp": datetime.now().isoformat(),
            "suggested_action": {
                "department": best_match.get("category"),
                "priority": best_match.get("priority")
            }
        }
        return jsonify(response_data)
    else:
        return jsonify({"message": "No matching support data found."}), 404

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
