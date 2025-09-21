import uuid
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from ..extensions import db

class Book(db.Model):
    __tablename__ = "books"
    #id = db.Column(db.Integer, primary_key=True)
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    titulo = db.Column(db.String(200), nullable=False)
    autores = db.Column(db.String(300), nullable=False)
    paginas = db.Column(db.Integer, nullable=False)
    ano_publicacao = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
