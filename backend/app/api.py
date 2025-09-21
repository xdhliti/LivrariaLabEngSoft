from .controllers.books_controller import bp as books_bp
def register_api(app):
    app.register_blueprint(books_bp)
