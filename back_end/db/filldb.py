import random
from faker import Faker
from ..models.models import db, Portfolios, PortfoliosStock
from flask.cli import with_appcontext
import click

# Create an instance of the Faker class
fake = Faker()

# List of LOTR characters
characters = [
    "Frodo Baggins", "Samwise Gamgee", "Gandalf", "Aragorn", "Legolas",
    "Gimli", "Boromir", "Meriadoc Brandybuck", "Peregrin Took", "Galadriel",
    "Elrond", "Saruman", "Gollum", "Faramir", "Eowyn", "Eomer", "Theoden",
    "Denethor", "Treebeard", "Bilbo Baggins"
]

# List of stock symbols
stock_symbols = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA", "FB", "NFLX", "NVDA", "BABA", "V"]

def create_portfolio(character):
    portfolio = Portfolios(
        name=character,
        description=fake.text(max_nb_chars=200),  # Generate a fake description
        timestamp=fake.date_time_this_decade()  # Generate a fake timestamp
    )
    db.session.add(portfolio)
    db.session.commit()
    return portfolio

def create_stock(portfolio):
    stock = PortfoliosStock(
        stock_symbol=random.choice(stock_symbols),
        quantity=random.randint(1, 100),
        purchase_price=round(random.uniform(10, 1000), 2),
        portfolio_id=portfolio.id
    )
    db.session.add(stock)
    db.session.commit()

@click.command('fill-db')
@with_appcontext
def fill_db():
    db.drop_all()
    db.create_all()
    for character in characters:
        portfolio = create_portfolio(character)
        for _ in range(random.randint(1, 5)):  # Each character gets 1 to 5 stocks
            create_stock(portfolio)
    print("Database filled with LOTR characters and random stocks.")

