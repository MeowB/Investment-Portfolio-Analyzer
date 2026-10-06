import os
from back_end.models.models import db

def init_db(app):
    with app.app_context():
        app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('DATABASE_URL') or 'sqlite:///stocks_portfolios.db'

        db.init_app(app)
        
        db.create_all()
        print("Database schema synced successfully!")

if __name__ == "__main__":
    init_db()
