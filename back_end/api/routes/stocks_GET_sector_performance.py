from flask import Blueprint, jsonify
from dotenv import load_dotenv
import os
import requests

load_dotenv()

FINNHUB_API_KEY = os.getenv('POLYGON_API_KEY')
FINNHUB_ENDPOINT_URL = f"https://finnhub.io/api/v1/stock/sector-performance?token={FINNHUB_API_KEY}"

Sector_performance_bp = Blueprint('sector_performance', __name__)

@Sector_performance_bp.route('/api/stocks/sector-performance', methods=['GET'])
def get_daily_performance():
	try:
		response = requests.get(FINNHUB_ENDPOINT_URL)
		print(response.text)
		data = response.json()

		return jsonify(data), 200

	except Exception as error:
		return jsonify({"error": str(error)}), 500