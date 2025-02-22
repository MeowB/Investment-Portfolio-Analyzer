from flask import Blueprint, jsonify
from back_end.models.portfolios import Portfolios
from app import db

Portfolios_EDIT_by_id_bp = Blueprint('portfolios_edit_by_id', __name__)

@Portfolios_EDIT_by_id_bp.route('/api/portfolios/<int:id>', methods=['PUT'])
def edit_portfolio_by_id(id, new_name, new_description):	
	try:
		portfolio = Portfolios.query.get(id)
		if not portfolio:
			return jsonify({"error": "portfolio not found"}), 400
		portfolio.name = new_name
		portfolio.description = new_description
		db.session.commit()
		return jsonify(portfolio.to_dict()), 200
	except Exception as error:
		return jsonify({"error:": str(error)}), 500
	
