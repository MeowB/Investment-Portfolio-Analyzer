from flask import Blueprint, request, jsonify
from back_end.models.portfolios import db, Portfolios

Portfolios_POST_bp = Blueprint('portfolios_post', __name__)

@Portfolios_POST_bp.route('/api/portfolios', methods=['POST'])
def create_portfolio():
	data = request.get_json()
	name = data.get('name')
	description = data.get('description')

	if not name: 
		return jsonify({"error": "Portfolio name is required"}), 400
	
	new_portfolio = Portfolios(name=name, description=description)
	db.session.add(new_portfolio)
	db.session.commit()

	return jsonify({"message": "Portfolio created successfully", "portfolio: ": {
		"id": new_portfolio.id,
		"name": new_portfolio.name
	}}), 201