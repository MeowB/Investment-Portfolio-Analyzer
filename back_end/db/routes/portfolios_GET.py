from flask import Blueprint, jsonify
from back_end.models.models import Portfolios

Portfolios_GET_bp = Blueprint('portfolios_get', __name__)

@Portfolios_GET_bp.route('/api/portfolios', methods=['GET'])
def get_portfolio():	
	try:
		portfolios = Portfolios.query.all()
		portfolios_list = [portfolio.to_dict() for portfolio in portfolios]
		return jsonify(portfolios_list), 200

	except Exception as error:
		return jsonify({"error:": str(error)}), 500