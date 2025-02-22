from flask import Blueprint, request, jsonify
from back_end.models.portfolios import db, Portfolios

Portfolios_bp = Blueprint('portfolios', __name__)

@Portfolios_bp.route('/api/portfolios', methods=['POST'])
def create_portfolio():
	data = request.get_json()
	name = data.get('name')

	if not name: 
		return jsonify({"error": "Portfolio name is required"}), 400
	
	new_portfolio = Portfolios(name=name)
	db.session.add(new_portfolio)
	db.session.commit()

	return jsonify({"message": "Portfolio created successfully", "portfolio: ": {
		"id": new_portfolio.id,
		"name": new_portfolio.name
	}}), 201