import React, { useEffect, useState } from 'react';
import { Article } from '../utils/interfaces';
import '../styles/NewsList.css'

interface NewsListProps {
	news: Article[];
}

const NewsList: React.FC<NewsListProps> = ({ news }) => {
	const [fadeIn, setFadeIn] = useState<boolean>(false);

	useEffect(() => {
		console.log(news.length)
		if (news.length > 0) {
			setFadeIn(false);
			const timer = setTimeout(() => setFadeIn(true), 50);
			return () => clearTimeout(timer);
		}
	}, [news]);

	return (
		<div className='articles'>
			{news.map((article, index) => (
				<div key={index} className={`article ${fadeIn ? 'fade-in' : ''}`}>
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
