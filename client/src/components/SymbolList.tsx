import { FaTrash } from "react-icons/fa"
import '../styles/SymbolList.css'
import { fetchPortfolioData } from "../services/db_calls"
import { useEffect, useState } from "react"

const SymbolList = ({ portfolioId }) => {
	const [symbols, setSymbols] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchPortfolioData(portfolioId)
			setSymbols(data.stocks)
			console.log(data.stocks)
		}

		fetchData()
	}, [portfolioId])

	return (
		<div className="symbols-list">
			<h2>Symbols List</h2>
			<ul>
				{symbols.map((stock, index) => (
					<li key={index} className="symbol-item">
						<span>{stock.stock_symbols}</span>
						<button className="delete-button">
							<FaTrash />
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default SymbolList
