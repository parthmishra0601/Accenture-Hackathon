#agents/analyzer_agent.pyt

import json
from utils.ollama_utils import generate_summary, get_embeddings
from utils.db_utils import update_ticket
# FROM:

# CHANGE TO:
from ..utils.ollama_utils import generate_summary, get_embeddings

# agents/analyzer_agent.py

class ConversationAnalyzer:
    def __init__(self, conversation_id, conversation_text):
        self.conversation_id = conversation_id
        self.conversation_text = conversation_text
        self.analysis = {}

    def process(self):
        # Generate structured summary (replace this with actual code)
        raw_summary = "Some summary generation logic here"
        self.analysis = raw_summary

        return self.analysis

        
        # Store in database
        ticket_data = {
            'ticket_id': self.conversation_id,
            'issue_category': self.analysis.get('issue_category'),
            'sentiment': self.analysis.get('sentiment'),
            'priority': self.analysis.get('priority'),
            'solution': '',
            'resolution_status': 'pending',
            'date': ''
        }
        update_ticket(ticket_data)
        
        return self.analysis