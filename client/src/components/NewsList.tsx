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
					<img src={article.urlToImage ? article.urlToImage : 'https://placehold.co/600x400?text=Hello+World'} alt={article.title} className="article-image" />
					<div className="article-content">
						<div className="text-content">

							<h3>{article.title}</h3>
							<p>{article.description}</p>
							<a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more-button">Read More...</a>
						</div>
						<div className="credits">
							<p className="article-source">Source: {article.source}</p>
							<p className="article-author">Author: {article.author ? article.author : 'Anonymous'}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default NewsList;
