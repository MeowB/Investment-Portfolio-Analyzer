from flask import Blueprint, jsonify, request
from back_end.models.portfolios import Portfolios
from app import db

Portfolios_DELETE_by_id_bp = Blueprint('portfolios_delete_by_id', __name__)

@Portfolios_DELETE_by_id_bp.route('/api/portfolios/<int:id>', methods=['DELETE', 'OPTIONS'])
def delete_portfolio_by_id(id):	
	print('hitting route delete')

	if request.method == 'OPTIONS':
		return '', 200

	try:
		portfolio = Portfolios.query.get(id)
		if not portfolio:
			return jsonify({"error": "portfolio not found"}), 400
	
		db.session.delete(portfolio)
		db.session.commit()

		return jsonify({"message": "portfolio deleted successfully"}), 200
	except Exception as error:
		db.session.rollback()
		print(f"Error deleting the portfolio:", {error})
		return jsonify({"error:": str(error)}), 500