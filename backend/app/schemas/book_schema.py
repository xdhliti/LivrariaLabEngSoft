from marshmallow import Schema, fields, validate

class BookSchema(Schema):
    id = fields.UUID(dump_only=True)
    titulo = fields.Str(required=True, validate=validate.Length(min=1))
    autores = fields.Str(required=True)
    paginas = fields.Int(required=True)
    ano_publicacao = fields.Int(required=True)
    created_at = fields.DateTime(dump_only=True)

book_schema = BookSchema()
books_schema = BookSchema(many=True)
