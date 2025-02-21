import requests
from dotenv import load_dotenv
import os

load_dotenv()

FINNHUB_BASE_URL = "https://finnhub.io/api/v1"
FINNHUB_API_KEY = os.getenv('FINNHUB_API_KEY')

def fetch_stock_data(symbol):
	url = f"{FINNHUB_BASE_URL}/quote"
	params = {
		'symbol': symbol,
		'token': FINNHUB_API_KEY
	}

	response = requests.get(url, params=params)
	
	if response.status_code == 200:
		data = response.json()
		return {
			'symbol': symbol,
			'current_price': data['c'],
			'high_price': data['h'],
			'low_price': data['l'],
			'open_price': data['o'],
			'previous_price': data['pc']
		}
	
	return None

