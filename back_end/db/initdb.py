import os
from flask import current_app
from back_end.models.models import db

def init_db(app):
    with current_app.app_context():
        db_path = os.path.join(current_app.instance_path, 'stocks_portfolios.db')
        db.init_app(app)
		
        # Ensure the database exists, if not create it
        if not os.path.exists(db_path):
            db.create_all()
            print("Database created successfully!")
            print("Database initialized!")
        else:
            print("Database already exists!")

if __name__ == "__main__":
    init_db()