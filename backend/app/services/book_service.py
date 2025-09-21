from . .repositories import book_repository as repo

def create_book(data):  return repo.create(data)
def list_books():       return repo.list_all()
def get_book(book_id):  return repo.get_or_404(book_id)
def update_book(book_id, data):
    b = repo.get_or_404(book_id); return repo.update(b, data)
def delete_book(book_id):
    b = repo.get_or_404(book_id); repo.delete(b); return None
