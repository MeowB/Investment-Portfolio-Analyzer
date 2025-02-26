from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
import requests
import os

load_dotenv()

FINNHUB_QUOTE_URL = "https://finnhub.io/api/v1/quote?symbol={}"
FINNHUB_API_KEY = os.getenv('FINNHUB_API_KEY')

from flask import Blueprint, jsonify
from back_end.models.models import PortfoliosStock
from app import db

stocks_POST_by_portfolio_id = Blueprint('stocks_post_by_portfolio_id', __name__)

@stocks_POST_by_portfolio_id.route('/api/portfolios/<int:id>/add-stocks', methods=['POST'])
def add_symbols(id):
	request_data = request.get_json()
	symbols_data = request_data['symbols_data']

	if not symbols_data or not isinstance(symbols_data, list):
		return jsonify({"error": "Symbols data is required and should be a list"}), 400
	
	if not id:
		return jsonify({"error": "Portfolio ID is required"}), 400
	
	results = []

	for symbol_data in symbols_data:

		if not isinstance(symbol_data, dict):
			results.append({
				"status": "error",
				"message": "Each symbol data should be a dictionnary"
			})
			continue

		symbol = symbol_data.get('symbol')
		quantity = symbol_data.get('quantity')
		purchased_price = symbol_data.get('purchased_price')

		if not symbol or quantity <= 0 or purchased_price <=0:
			results.append({
				"symbol": symbol,
				"status": "error",
				"message": "Invalid symbol, quantity ir price"
			})

		response = requests.get(FINNHUB_QUOTE_URL.format(symbol), params={'token': FINNHUB_API_KEY})

		if response.status_code != 200:
			results.append({
				"symbol": symbol,
				"status": "error",
				"message": "Error querying Finnhub API"
			})
			continue

		data = response.json()

		if not data or 'c' not in data or data['c'] == 0: # 'c' is the current price in the finnhub response
			results.append({
                "symbol": symbol,
                "status": "error",
                "message": "Symbol not found or invalid symbol"
			})
			continue

		try:
			new_portfolio_stock = PortfoliosStock(
				stock_symbol=symbol,
				quantity=quantity,
				purchase_price=purchased_price,
				portfolio_id=id
			)

			db.session.add(new_portfolio_stock)
			db.session.commit()

			results.append({
                "symbol": symbol,
                "status": "success",
                "message": "Symbol added to portfolio"
			})


		except Exception as error:
			results.append({
                "symbol": symbol,
                "status": "error",
                "message": f"Failed to add symbol to portfolio: {str(error)}"
			})

	return jsonify({"results": results}), 200