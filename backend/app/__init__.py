import os
from flask import Flask, jsonify
from .extensions import db, migrate
from .api import register_api
from flask_cors import CORS
from marshmallow import ValidationError


def create_app():
    from .models import book 
    app = Flask(__name__)
    env = os.getenv("FLASK_ENV", "development")
    from .config import config_by_env
    app.config.from_object(config_by_env.get(env, config_by_env["development"]))

    db.init_app(app)
    migrate.init_app(app, db)

    from .models import book  # noqa: F401
    CORS(app)

    register_api(app)

    @app.errorhandler(404)
    def not_found(e):
        return jsonify(error="not found"), 404

    @app.errorhandler(400)
    def bad_req(e):
        return jsonify(error="bad request"), 400

    @app.errorhandler(ValidationError)
    def handle_marshmallow(err):
        return {"errors": err.messages}, 400

    return app
