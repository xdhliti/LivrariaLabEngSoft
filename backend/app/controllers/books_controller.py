from flask import Blueprint, request, jsonify
from ..schemas.book_schema import book_schema, books_schema
from ..services import book_service

bp = Blueprint("books", __name__, url_prefix="/api/v1/books")

@bp.get("/")
def list_books():
    return jsonify(books_schema.dump(book_service.list_books()))

@bp.post("/")
def create_book():
    data = book_schema.load(request.get_json())
    book = book_service.create_book(data)
    return book_schema.dump(book), 201

@bp.get("/<uuid:book_id>")
def get_book(book_id):
    return book_schema.dump(book_service.get_book(book_id))

@bp.put("/<uuid:book_id>")
def update_book(book_id):
    data = book_schema.load(request.get_json())
    return book_schema.dump(book_service.update_book(book_id, data))

@bp.delete("/<uuid:book_id>")
def delete_book(book_id):
    book_service.delete_book(book_id)
    return "", 204
