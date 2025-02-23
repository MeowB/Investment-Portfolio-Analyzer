from flask import Blueprint, jsonify, request
from back_end.models.portfolios import PortfoliosStock
from app import db

Stocks_DELETE_by_specifics = Blueprint('stocks_delete_by_specifics', __name__)

@Stocks_DELETE_by_specifics.route('/api/portfolios/<int:id>/delete-stock', methods=['DELETE', 'OPTIONS'])
def delete_stock_from_portfolio(id):

	if request.method == 'OPTIONS':
		return '', 200
	
	request_data = request.get_json()
	print(request_data)
	symbol = request_data.get('symbol')
	puchased_price = request_data.get('purchased_price')
	print(symbol, puchased_price)

	if not id or not symbol or not puchased_price:
		return jsonify({
			"error": "portfolio_id, symbol, and purchase_price are required"
			}), 400
	
	try:
		portfolio_stock = PortfoliosStock.query.filter_by(
			portfolio_id=id, 
			stock_symbol=symbol, 
			purchase_price=puchased_price).first()

		if not portfolio_stock:
			return jsonify({
				"error": f"Symbol {symbol} whith purchase price {puchased_price} not found in portfolio {id}"
				})
		
		db.session.delete(portfolio_stock)
		db.session.commit()

		return jsonify({
			"message": f"Symbol {symbol} with purchase price {puchased_price} successfully deleted from portfolio {id}"
		})
	except Exception as error:
		return jsonify({
			"error": f"Failed to delete symbol {str(error)}"
		})