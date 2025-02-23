from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Portfolios(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(100), nullable=False)
	description = db.Column(db.String(255), nullable=True)
	timestamp = db.Column(db.DateTime, default=datetime.now)

	stocks = db.relationship('PortfoliosStock', backref='portfolio', cascade='all, delete-orphan')
	def to_dict(self):
		return {
			'id': self.id,
			'name': self.name,
			'description': self.description,
			'timestamp': self.timestamp.isoformat(),
		}

class PortfoliosStock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    stock_symbol = db.Column(db.String(10), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    purchase_price = db.Column(db.Float, nullable=False)
    portfolio_id = db.Column(db.Integer, db.ForeignKey('portfolios.id'), nullable=False) 
