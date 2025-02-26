from flask import Blueprint, jsonify
from back_end.models.models import Portfolios
from dotenv import load_dotenv
import os
import requests

load_dotenv()

FINNHUB_BASE_URL = "https://finnhub.io/api/v1"
FINNHUB_API_KEY = os.getenv('FINNHUB_API_KEY')

from flask import Blueprint, jsonify
from back_end.models.models import Portfolios

Stocks_GET_values_by_portfolio_bp = Blueprint('stocks_GET_values_by_portfolio', __name__)

@Stocks_GET_values_by_portfolio_bp.route('/api/portfolios/<int:id>/stocks-values', methods=['GET'])
def get_portfolio_by_id(id):
	print('hitting stock values route')
	portfolio = Portfolios.query.get(id)
	if not portfolio:
		return jsonify({"error": "Portfolio not found"})
	
	symbols = [stock.stock_symbol for stock in portfolio.stocks]

	if not symbols:
		return jsonify({"portfolio_id:": id, "stock_values: ": []})
	
	stock_values = {}

	for symbol in symbols:
		try:
			response = requests.get(f"{FINNHUB_BASE_URL}/quote?symbol={symbol}&token={FINNHUB_API_KEY}")
			if response.status_code == 200:
				data = response.json()
				stock_values[symbol] = {
                    "current_price": data.get("c"),
                    "high": data.get("h"),
                    "low": data.get("l"),
                    "open": data.get("o"),
                    "previous_close": data.get("pc")
				}
			else:
				stock_values[symbol] = {"error": "Failed to fetch data"}
		except Exception as error:
			stock_values[symbol] = {"error": str(error)}

	return jsonify({"portfolio_id": id, "stock_values": stock_values})