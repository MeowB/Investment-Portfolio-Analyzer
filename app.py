print('app is running')
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from back_end.api.routes.stocks_GET_data import getStocks_bp
from back_end.models.portfolios import db
from back_end.db.routes.portfolios_POST import Portfolios_POST_bp
from back_end.db.routes.portfolios_GET import Portfolios_GET_bp
from back_end.db.routes.porfolios_GET_by_id import Portfolios_GET_by_id_bp
from back_end.db.routes.portfolios_DELETE_by_id import Portfolios_DELETE_by_id_bp
from back_end.db.routes.stocks_GET_by_portfolio import PortfolioData_GET_bp
from back_end.db.routes.stocks_DELETE_by_specifics import Stocks_DELETE_by_specifics
from back_end.db.routes.portfolios_UPDATE_by_id import Portfolios_UPDATE_by_id_bp
from back_end.api.routes.stocks_GET_values_by_portfolio import Stocks_GET_values_by_portfolio_bp
from back_end.api.routes.stocks_POST_by_portfolio_id import stocks_POST_by_portfolio_id


from back_end.db.filldb import fill_db
import os

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = '/instance/stocks_portfolios.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

if not os.path.exists('instance/stocks_portfolios.db'):
	db.init_app(app)
	"""INITIALIZE DATABASE"""
	with app.app_context():
		db.create_all()
		print("Database created successfully!")
		print("Database initialized!")
else:
	db.init_app(app)
	print("Database initialized!")

CORS(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

app.register_blueprint(getStocks_bp, url_prefix='/api')
app.register_blueprint(Portfolios_GET_bp)
app.register_blueprint(Portfolios_POST_bp)
app.register_blueprint(Portfolios_GET_by_id_bp)
app.register_blueprint(Portfolios_DELETE_by_id_bp)
app.register_blueprint(PortfolioData_GET_bp)
app.register_blueprint(Stocks_GET_values_by_portfolio_bp)
app.register_blueprint(Portfolios_UPDATE_by_id_bp)
app.register_blueprint(stocks_POST_by_portfolio_id)
app.register_blueprint(Stocks_DELETE_by_specifics)

app.cli.add_command(fill_db)

if __name__ == '__main__':
	app.run(debug=True)