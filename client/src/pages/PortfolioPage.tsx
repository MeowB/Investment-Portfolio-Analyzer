import { useEffect, useState } from "react"
import { fetchPortfolio, deletePortfolio } from "../services/db_calls"
import { useParams, useNavigate } from "react-router-dom"
import "../styles/PortfolioPage.css"
import { FaPenSquare, FaTrash } from "react-icons/fa"
import SymbolList from "../components/SymbolList"
import CreatePortfolioForm from "../components/CreatePortfolioForm"

const PortfolioPage = () => {
	const navigate = useNavigate()
	let { id } = useParams()
	const [portfolio, setPortfolio] = useState<any>(null)
	const [editPortfolio, setEditPortfolio] = useState<boolean>(false)

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
		setEditPortfolio(!editPortfolio)
		console.log("Edit portfolio:", id)
	}

	const handleDelete = async () => {
		await deletePortfolio(id)
		navigate('/portfolios')
		console.log("Delete portfolio:", id)
	}

	return (
		<div>
			{portfolio ? (
				<div className="single-portfolio">
					<div className="portfolio-actions">
						<FaPenSquare onClick={handleEdit} />
						<FaTrash onClick={handleDelete} />
					</div>
					{editPortfolio
						? (
							<CreatePortfolioForm
								portfolioName={portfolio.name}
								portfolioDescription={portfolio.description}
								edit={true}
								id={id}
								setEditPortfolio={setEditPortfolio}
								setPortfolio={setPortfolio}
							/>
						)
						: (
							<div className="portfolio-detaile">
								<h1>{portfolio.name}</h1>
								<p>{portfolio.description}</p>
							</div>
						)}
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
