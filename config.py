#project/config.pyt
import os
from pathlib import Path

# Path configurations
BASE_DIR = Path(__file__).parent.resolve()
CONVERSATIONS_DIR = BASE_DIR / 'data' / 'conversations'

# Database Configuration
# DATABASE_PATH = BASE_DIR / 'data' / 'support.db'
# HISTORICAL_DATA_PATH = BASE_DIR / 'data' / 'Historical_ticket_data.csv'
# CONVERSATIONS_DIR = BASE_DIR / 'data' / 'conversations'

# Model Configuration
OLLAMA_MODEL = 'mistral'
EMBEDDING_MODEL = 'nomic-embed-text'
TIME_ESTIMATOR_MODEL_PATH = os.path.join(BASE_DIR, 'models/time_estimator.pkl')

# API Configuration
SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/YOUR/WEBHOOK'
FRESHDESK_API_KEY = 'your-freshdesk-key'