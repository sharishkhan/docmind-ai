"""DocMind AI backend entry point.

Backend APIs and document-processing logic will be added in a future milestone.
"""

from flask import Flask


app = Flask(__name__)


if __name__ == "__main__":
    app.run(debug=True)
