from flask import Flask, Response
import json
from dotenv import load_dotenv
import os

# Take the environment variables from .env file
load_dotenv()
FLASK_HOST = os.environ.get("FLASK_HOST")
FLASK_PORT = os.environ.get("FLASK_PORT")

# Create Flask app
app = Flask(__name__)

# API endpoint to serve up users
@app.route("/api/users")
def users():
  users = [
    {"username": "WittCode", "id": 1}, 
    {"username": "Greg", "id": 2}, 
    {"username": "Sabin", "id": 3}, 
    {"username": "Mike", "id": 4}, 
    {"username": "Spencer", "id": 5},
    {"username": "Alex", "id": 6},
    {"username": "Sam", "id": 7},
    {"username": "John", "id": 8},
    {"username": "Bob", "id": 9},
    {"username": "Steve", "id": 10}
  ]
  # Return a JSON response
  return Response(json.dumps(users), mimetype="application/json")

# Run the application at the provided host and port
if __name__ == "__main__":
  app.run(host=FLASK_HOST, port=FLASK_PORT)