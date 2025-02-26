from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
import time
import os
import requests
from datetime import datetime
from back_end.models.models import db, NewsHistory

load_dotenv()

NEWS_API_KEY = os.getenv('NEWS_API_KEY')
NEWS_ENDPOINT_URL = "https://newsapi.org/v2/top-headlines/"

news_GET_by_category_bp = Blueprint('news_get_by_category_bp', __name__)

@news_GET_by_category_bp.route('/api/news', methods=['GET'])
def get_news():
    category = request.args.get('category')
    if not category:
        return jsonify({"error": "Category is required but not provided."}), 400
    
    url = f"{NEWS_ENDPOINT_URL}?category={category}&apiKey={NEWS_API_KEY}"
    response = requests.get(url)
    print(response)
    
    if response.status_code != 200:
        news_history = NewsHistory.query.filter_by(category=category).all()
        if not news_history:
            return jsonify({"error": "Failed to fetch data from the news API and no data in the database"}), 500
        
        formatted_articles = []
        for news in news_history:
            formatted_articles.append({
                "author": news.author,
                "content": news.content,
                "description": news.description,
                "publishedAt": news.published_at,
                "source": news.source,
                "title": news.title,
                "url": news.url,
                "urlToImage": news.url_to_image
            })
        
        return jsonify(formatted_articles), 200
    
    data = response.json()
    articles = data.get('articles', [])

    formatted_articles = []
    for article in articles:
        formatted_articles.append({
            "author": article.get("author"),
            "content": article.get("content"),
            "description": article.get("description"),
            "publishedAt": article.get("publishedAt"),
            "source": article.get("source", {}).get("name"),
            "title": article.get("title"),
            "url": article.get("url"),
            "urlToImage": article.get("urlToImage")
        })

    return jsonify(formatted_articles), 200

def limit_sources(news, max_per_source=3):
    source_count = {}
    filtered_news = []
    for item in news:
        source = item.get('source')
        if source_count.get(source, 0) < max_per_source:
            filtered_news.append(item)
            source_count[source] = source_count.get(source, 0) + 1
    return filtered_news
