import sqlite3
import pandas as pd
from config import DATABASE_PATH, HISTORICAL_DATA_PATH

def init_db():
    conn = sqlite3.connect(DATABASE_PATH)
    c = conn.cursor()
    
    # Create tables
    c.execute('''CREATE TABLE IF NOT EXISTS tickets
                 (ticket_id TEXT PRIMARY KEY,
                  issue_category TEXT,
                  sentiment TEXT,
                  priority TEXT,
                  solution TEXT,
                  resolution_status TEXT,
                  date TEXT)''')
                 
    c.execute('''CREATE TABLE IF NOT EXISTS embeddings
                 (ticket_id TEXT,
                  embedding BLOB)''')
    
    # Load historical data
    df = pd.read_csv(HISTORICAL_DATA_PATH)
    df.to_sql('tickets', conn, if_exists='append', index=False)
    
    conn.commit()
    conn.close()

def get_similar_tickets(issue_category, limit=5):
    conn = sqlite3.connect(DATABASE_PATH)
    query = f'''
    SELECT solution, COUNT(*) as count 
    FROM tickets 
    WHERE issue_category = '{issue_category}' 
    GROUP BY solution 
    ORDER BY count DESC 
    LIMIT {limit}
    '''
    result = pd.read_sql(query, conn)
    conn.close()
    return result

def update_ticket(ticket_data):
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT OR REPLACE INTO tickets 
        VALUES (:ticket_id, :issue_category, :sentiment, 
                :priority, :solution, :resolution_status, :date)
    ''', ticket_data)
    conn.commit()
    conn.close()