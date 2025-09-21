# Biblioteca API (Flask + MVC)

## Requisitos
- Python 3.13 (ou 3.12)

## Instalação
```bash
python -m venv .venv
. .venv/Scripts/Activate.ps1
pip install -r requirements.txt
$env:FLASK_APP="run.py"; $env:FLASK_ENV="development"
flask db init
flask db migrate -m "create books"
flask db upgrade
flask run
