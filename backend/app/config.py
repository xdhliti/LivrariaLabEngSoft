import os
class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///dev.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
class Dev(Config): DEBUG = True
class Prod(Config): DEBUG = False
config_by_env = {"development": Dev, "production": Prod}
