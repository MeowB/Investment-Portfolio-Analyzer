import os
from back_end.models.models import db

def init_db(app):
    with app.app_context():
        local_db_path = os.path.join(app.instance_path, 'stocks_portfolios.db')
        db_path = os.getenv('DATABASE_URL') or local_db_path
        
        app.config["SQLALCHEMY_DATABASE_URI"] = db_path or local_db_path

        db.init_app(app)
        
        db.create_all()
        print(f"Connected to: supabase database")
        print("Database schema synced successfully!")

if __name__ == "__main__":
    init_db()