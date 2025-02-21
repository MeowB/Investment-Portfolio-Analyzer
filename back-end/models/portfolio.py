from datetime import datetime
from app.app import db

class Portfolio(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(100), nullable=False)
	description = db.Column(db.String(255))
	created_at = db.Column(db.DateTime, default=datetime.now)

	stocks = db.relationship('PortfolioStock', backref='portfolio', lazy=True)

	def __repr__(self):
		return f"<Portfolio {self.name}"
	
class PortfolioStock(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	portfolio_id = db.Column(db.Integer, db.ForeignKey('portfolio.id', nullable=False))
	symbol = db.Column(db.String(10), nullable=False)
	quantity = db.Column(db.Integer, nullable=False)
	purchase_price = db.Column(db.Float, nullable=False)

	def __repr__(self):
		return f"PortfolioStock {self.symbol}"