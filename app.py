from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from back_end.api.routes import api
from back_end.models.portfolio import db
from back_end.models.portfolio import Portfolio, PortfolioStock

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///stocks_portfolio.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
CORS(app)


@app.cli.command('init-db')
def init_db():
	"""INITIALIZE DATABASE"""
	db.create_all()
	print("Database created successfully!")


app.register_blueprint(api, url_prefix='/api')

if __name__ == '__main__':
	app.run(debug=True)