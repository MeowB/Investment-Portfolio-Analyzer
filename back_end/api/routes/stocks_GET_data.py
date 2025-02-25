from flask import Blueprint, jsonify, request
from ...services.finnhub import fetch_stock_data

getStocks_bp = Blueprint('getStocks', __name__)


@getStocks_bp.route('/stocks', methods=['GET'])
def get_stock():
	symbol = request.args.get('symbol')

	if not symbol:
		return jsonify({"error": "Stock symbol is required"}), 400
	
	stock_data = fetch_stock_data(symbol)
	if stock_data:
		print("data fetched and returned\n")
		return jsonify(stock_data)
	else:
		return jsonify({"error": "Unable to fetch data"}), 500
	