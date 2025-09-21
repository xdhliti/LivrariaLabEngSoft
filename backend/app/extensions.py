from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from marshmallow import ValidationError

db = SQLAlchemy()
migrate = Migrate()
