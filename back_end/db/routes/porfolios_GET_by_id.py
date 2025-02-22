from flask import Blueprint, jsonify
from back_end.models.portfolios import Portfolios
from app import db

Portfolios_GET_by_id_bp = Blueprint('portfolios_get_by_id', __name__)

@Portfolios_GET_by_id_bp.route('/api/portfolios/<int:id>', methods=['GET'])
def get_portfolio_by_id(id):
	try:
		portfolio = Portfolios.query.get(id)

		if not portfolio:
			return jsonify({"error": "Portfolio not found"}), 404
		return jsonify(portfolio.to_dict()), 200
	except Exception as error:
		return jsonify({"error:": str(error)}), 500
	