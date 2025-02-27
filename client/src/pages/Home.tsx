import { useEffect, useState } from "react";
import "../styles/Home.css";
import NewsList from "../components/NewsList";
import { fetchNews } from "../services/api";
import { Article } from '../utils/interfaces';
import FilterBar from "../components/FilterBar";

const Home = () => {
	const [news, setNews] = useState<Article[]>([]);
	const [category, setCategory] = useState('general');

	const getData = async (category: string) => {
		try {
			const data = await fetchNews(category);
			setNews(data);
		} catch (error) {
			console.error('error fetching news', error);
		}
	}

	useEffect(() => {
		getData(category);
	}, [category]);

	return (
		<div className="home-container">
			<section className="hero-section">
				<h1>Take Control of Your Financial Future</h1>
				<p>Analyze. Optimize. Grow. Make informed investment decisions with real-time insights.</p>
				<div className="cta-div">
					<h2>Start Managing Your Portfolio Today</h2>
					<p>Maximize your returns and minimize risks with our powerful analytics tools.</p>
					<a className="cta-link" href="/create">Create Your Portfolio</a>
				</div>
			</section>
			<section className="news-feed">
				<div className="text">
					<h2>Stay Ahead with the Latest Market Insights</h2>
					<p>Get day to day updates to make informed investment decisions.</p>
				</div>
				<FilterBar setCategory={setCategory} />
				<NewsList news={news} />

			</section>
		</div>
	);
};

export default Home;
