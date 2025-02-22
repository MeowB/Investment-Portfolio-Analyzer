import { useEffect, useState } from "react"
import { fetchPortfolio, deletePortfolio } from "../services/db_calls"
import { useParams, useNavigate } from "react-router-dom"
import "../styles/PortfolioPage.css"
import { FaPenSquare, FaTrash } from "react-icons/fa"
import { toast } from "react-toastify"
import SymbolList from "../components/SymbolList"


const PortfolioPage = () => {
	const navigate = useNavigate()
	let { id } = useParams()
	const [portfolio, setPortfolio] = useState<any>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				let response = await fetchPortfolio(id)
				setPortfolio(response)
			} catch (error) {
				console.error("Error fetching portfolio:", error)
			}
		}

		fetchData()
	}, [id])

	const handleEdit = () => {
		// Handle edit action
		console.log("Edit portfolio:", id)
	}

	const handleDelete = () => {
		deletePortfolio(id)
		toast.success(`${portfolio.name} deleted successfully`)
		navigate('/portfolios')
		console.log("Delete portfolio:", id)
	}

	return (
		<div>
			{portfolio ? (
				<div className="single-portfolio">
					<div className="portfolio-actions">
						<FaPenSquare />
						<FaTrash onClick={handleDelete}/>
					</div>
					<h1>{portfolio.name}</h1>
					<p>{portfolio.description}</p>
					<p>Created on: {new Date(portfolio.timestamp).toLocaleString()}</p>
					<div className="chart-container">
						<h2>Pie Chart</h2>
						{/* Placeholder for the pie chart */}
						<div></div>
					</div>
					<SymbolList portfolioId={id} />
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	)
}

export default PortfolioPage
