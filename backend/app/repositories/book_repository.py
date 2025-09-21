from ..extensions import db
from ..models.book import Book

def list_all():
    return Book.query.order_by(Book.id.desc()).all()

def get_or_404(book_id):
    return Book.query.get_or_404(book_id)

def create(data: dict) -> Book:
    book = Book(**data); db.session.add(book); db.session.commit(); return book

def update(book: Book, data: dict) -> Book:
    for k,v in data.items(): setattr(book, k, v)
    db.session.commit(); return book

def delete(book: Book) -> None:
    db.session.delete(book); db.session.commit()
