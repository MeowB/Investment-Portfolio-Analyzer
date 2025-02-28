import { useEffect, useState } from "react"
import { fetchPortfoliosList } from "../services/db_calls"
import "../styles/PortfolioList.css"
import { Link } from "react-router-dom"

const PortfolioListPage = () => {
	let [portfolioList, setPortfolioList] = useState([])
	let [loading, setLoading] = useState(true)
	const [fadeIn, setFadeIn] = useState(false);

	const fetchData = async () => {
		try {
			const response = await fetchPortfoliosList()
			setPortfolioList(response)
		} catch (error) {
			console.error("Error fetching portfolios:", error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
		const timer = setTimeout(() => setFadeIn(true), 500);
		return () => clearTimeout(timer);

	}, [])

	const formatTimestamp = (timestamp: string) => {
		return new Date(timestamp).toISOString().slice(0, 19).replace('T', '')
	}

	return (
		<div className="portfolio-list">
			{loading ? (
				<p>Loading...</p>
			) : (
				portfolioList && portfolioList.map((portfolio: any, index) => (
					<Link
						key={index}
						className={`portfolio-card ${fadeIn ? "fade-in" : ""}`}
						style={{ animationDelay: `${index * 0.2}s` }}
						to={`/portfolios/${portfolio.id}`}
					>
						<div>
							<h3>{portfolio.name}</h3>
							<p>Description: <br /> {portfolio.description}</p>
							<p>Created on {formatTimestamp(portfolio.timestamp).slice(0, 10)}</p>
						</div>
					</Link>
				))
			)}
		</div>
	)
}

export default PortfolioListPage
