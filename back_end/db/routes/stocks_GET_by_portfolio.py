from flask import Blueprint, jsonify
from back_end.models.models import Portfolios, PortfoliosStock

PortfolioData_GET_bp = Blueprint('portfolio_data_get', __name__)

@PortfolioData_GET_bp.route('/api/portfolios/<int:id>/stocks', methods=['GET'])
def get_stock_by_portfolio(id):
	portfolio = Portfolios.query.get(id)
	if not portfolio:
		return jsonify({"error": "Portfolio not found"})
	
	stock_data = [
		{
		"stock_symbols": stock.stock_symbol,
		"quantity": stock.quantity,
		"purchase_price": stock.purchase_price
		}
		for stock in portfolio.stocks
	]

	return jsonify({"portfolio_id:": id, "stocks": stock_data}), 200