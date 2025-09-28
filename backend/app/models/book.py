import uuid
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from ..extensions import db

class Book(db.Model):
    __tablename__ = "books"
    id = db.Column(db.String(36), primary_key=True,
                   default=lambda: str(uuid.uuid4()))
    titulo = db.Column(db.String(200), nullable=False)
    autores = db.Column(db.String(300), nullable=False)
    paginas = db.Column(db.Integer, nullable=False)
    ano_publicacao = db.Column(db.Integer, nullable=False)
    imagem_url = db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
