from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# Path to the CSV file
DATA_PATH = r"Historical_ticket_data.csv"
LAST_MODIFIED = None
DATA_CACHE = None

def load_and_cache_data():
    """
    Load and cache data from the CSV file if it has been modified or not loaded yet.
    """
    global DATA_CACHE, LAST_MODIFIED
    try:
        if not os.path.exists(DATA_PATH):
            raise FileNotFoundError(f"File not found: {DATA_PATH}")
        current_modified = os.path.getmtime(DATA_PATH)
        if current_modified != LAST_MODIFIED or DATA_CACHE is None:
            df = pd.read_csv(DATA_PATH)
            DATA_CACHE = df.to_dict(orient="records")
            LAST_MODIFIED = current_modified
            print("Data loaded and cached.")
        return DATA_CACHE
    except FileNotFoundError:
        print(f"Error: CSV file not found at {DATA_PATH}")
        return None
    except Exception as e:
        print(f"Error loading CSV: {e}")
        return None

@app.route("/api/conversations", methods=["GET"])
def get_conversations():
    """
    API endpoint to fetch conversation data from the CSV file.
    """
    data = load_and_cache_data()
    if data is not None:
        return jsonify(data)
    return jsonify({"error": "Failed to load conversation data."}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
