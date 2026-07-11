from flask import Flask
from flask_cors import CORS
from werkzeug.exceptions import RequestEntityTooLarge

from routes.summary import summary_bp
from routes.upload import upload_bp
from utils.config import Config


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    Config.ensure_directories()
    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": Config.CORS_ORIGINS,
                "methods": ["POST", "OPTIONS"],
                "allow_headers": ["Content-Type"],
            }
        },
    )

    app.register_blueprint(upload_bp, url_prefix="/api")
    app.register_blueprint(summary_bp, url_prefix="/api")

    @app.errorhandler(RequestEntityTooLarge)
    def handle_large_file(_error):
        return {
            "success": False,
            "message": "File size exceeds the 50 MB limit.",
        }, 413

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)
