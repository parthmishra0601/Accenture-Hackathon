# #project/main.pyt

# import os
# import json
# from config import CONVERSATIONS_DIR
# from agents.analyzer_agent import ConversationAnalyzer
# from agents.recommender_agent import SolutionRecommender
# from utils.ollama_utils import generate_summary

# def process_conversations():
#     # Initialize database
#     from utils.db_utils import init_db
#     init_db()
    
#     # Process all conversation files
#     for filename in os.listdir(CONVERSATIONS_DIR):
#         if filename.endswith('.txt'):
#             with open(os.path.join(CONVERSATIONS_DIR, filename), 'r') as f:
#                 conversation_id = filename.split('.')[0]
#                 analyzer = ConversationAnalyzer(conversation_id, f.read())
#                 analysis = analyzer.process()
                
#                 recommender = SolutionRecommender(analysis['issue_category'])
#                 solution = recommender.recommend()
                
#                 print(f"Processed {conversation_id}")
#                 print(f"Issue: {analysis['issue_category']}")
#                 print(f"Recommended Solution: {solution}\n")
#     pass
# if __name__ == "__main__":
#     process_conversations()

import os
import json
from config import CONVERSATIONS_DIR
from agents.analyzer_agent import ConversationAnalyzer
#import agents.analyzer_agent.ConversationAnalyzer
from agents.recommender_agent import SolutionRecommender
from utils.ollama_utils import generate_summary

def process_conversations():
    # Initialize database
    from utils.db_utils import init_db
    print("Initializing the database...")
    init_db()
    
    # Process all conversation files
    for filename in os.listdir(CONVERSATIONS_DIR):
        if filename.endswith('.txt'):
            print(f"Processing file: {filename}")  # Debugging line
            with open(os.path.join(CONVERSATIONS_DIR, filename), 'r') as f:
                conversation_id = filename.split('.')[0]
                print(f"Conversation ID: {conversation_id}")  # Debugging line
                
                # Process the conversation
                analyzer = ConversationAnalyzer(conversation_id, f.read())
                analysis = analyzer.process()
                print(f"Analysis: {analysis}")  # Debugging line
                
                recommender = SolutionRecommender(analysis['issue_category'])
                solution = recommender.recommend()
                print(f"Recommended Solution: {solution}")  # Debugging line
                
                # Output the processed results
                print(f"Processed {conversation_id}")
                print(f"Issue: {analysis['issue_category']}")
                print(f"Recommended Solution: {solution}\n")

if __name__ == "__main__":
    print("Starting conversation processing...")  # Debugging line
    process_conversations()
