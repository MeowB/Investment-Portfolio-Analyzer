from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Portfolios(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=True)
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

class NewsHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(100), nullable=True)
    content = db.Column(db.Text, nullable=True)
    description = db.Column(db.Text, nullable=True)
    publishedAt = db.Column(db.DateTime, nullable=False)
    source = db.Column(db.String(100), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    url = db.Column(db.String(200), nullable=False)
    urlToImage = db.Column(db.String(200), nullable=True)
    category = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'author': self.author,
            'content': self.content,
            'description': self.description,
            'publishedAt': self.publishedAt.isoformat() if isinstance(self.publishedAt, datetime) else self.publishedAt,
            'source': self.source,
            'title': self.title,
            'url': self.url,
            'urlToImage': self.urlToImage,
            'category': self.category,
        }