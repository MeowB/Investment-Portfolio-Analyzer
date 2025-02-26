import React from 'react';
import { Article } from '../utils/interfaces';
import '../styles/NewsList.css'

interface NewsListProps {
    news: Article[];
}

const NewsList: React.FC<NewsListProps> = ({ news }) => {
	console.log()
    return (
        <div className='articles'>
            {news.map((article, index) => (
                <div key={index} className="article">
                    <img src={article.urlToImage  ? article.urlToImage : 'https://placehold.co/600x400?text=Hello+World'} alt={article.title} className="article-image" />
                    <div className="article-content">
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                        <p className="article-source">Source: {article.source}</p>
                        <p className="article-author">Author: {article.author ? article.author : 'Anonymous'}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more-button">Read More</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsList;
