import { FaTrash } from "react-icons/fa"
import '../styles/SymbolList.css'
import { fetchPortfolioData } from "../services/db_calls"
import { fetchPortfolioStockValues } from "../services/api"
import { useEffect, useState } from "react"

interface StockValue {
	current_price: number;
	high: number;
	low: number;
	open: number;
	previous_close: number;
}

const SymbolList = ({ portfolioId }: any) => {
	const [symbols, setSymbols] = useState<any[]>([])
	const [stockValue, setStockValue] = useState<{ [key: string]: StockValue }>({})

	useEffect(() => {
		const fetchDbData = async () => {
			const data = await fetchPortfolioData(portfolioId)
			setSymbols(data.stocks)
		}

		const fetchApiData = async () => {
			const data = await fetchPortfolioStockValues(portfolioId)
			setStockValue(data)
		}

		fetchApiData()
		fetchDbData()
	}, [portfolioId])

	return (
		<div className="symbols-list">
			<h2>Symbols List</h2>
			<ul>
				{symbols.map((stock: any, index) => (
					<li key={index} className="symbol-item">
						<div className="primary-content">
							<h3>{stock.stock_symbols}</h3>
							<span>Purchased price: {stock.purchase_price + '$'}</span>
							<span>Quantity: {stock.quantity}</span>	
						</div>

						<div className="secondary-content">
							{stockValue[stock.stock_symbols] && (
								<span>Total Value: {(stockValue[stock.stock_symbols].current_price * stock.quantity).toFixed(2) + '$'}</span>
							)}
						</div>

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
