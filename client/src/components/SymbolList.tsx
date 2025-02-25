import { FaTrash } from "react-icons/fa"
import '../styles/SymbolList.css'
import { fetchPortfolioData } from "../services/db_calls"
import { fetchPortfolioStockValues } from "../services/api"
import { useEffect, useState } from "react"
import { Stocks, StockValue } from '../utils/interfaces'
import SymbolForm from "./SymbolForm"
import { deleteSymbolFromPortfolio } from "../services/db_calls"
import { toast } from "react-toastify"

const SymbolList = ({ portfolioId, chartDataCallback }: { portfolioId: string, chartDataCallback: (stocks: Stocks[], stocksValue: { [key: string]: StockValue }) => void }) => {
	const [symbols, setSymbols] = useState<Stocks[]>([])
	const [stockValue, setStockValue] = useState<{ [key: string]: StockValue }>({})
	const [refresh, setRefresh] = useState<boolean>(true)

	const fetchDbData = async () => {
		const data = await fetchPortfolioData(portfolioId)
		setSymbols(data.stocks)
	}

	const fetchApiData = async () => {
		const data = await fetchPortfolioStockValues(portfolioId)
		setStockValue(data)
	}

	const displayProfitLoss = (stock: Stocks) => {
		let currentPrice = stockValue[stock.stock_symbols].current_price
		let purchasedPrice = stock.purchase_price
		let quantity = stock.quantity
		let value = ((currentPrice - purchasedPrice) * quantity).toFixed(2)
		if (+value > 0) {
			return <span className="profit"><strong>{String(value)}$</strong></span>
		} else {
			return <span className="loss"><strong>{String(value)}$</strong></span>
		}
	}

	const calculateCurrentValue = (stock: Stocks) => {
		return (stockValue[stock.stock_symbols].current_price * stock.quantity).toFixed(2)
	}

	const handleDeleteSymbol = async (id: string, symbol: string, purchasedPrice: number) => {
		let alert = window.confirm(`Are you sure you want to delete ${symbol} ?`)

		if (alert === true) {
			const result = await deleteSymbolFromPortfolio(id, symbol, purchasedPrice)
			if (result) {
				toast.success(`Symbol ${symbol} with purchased price ${purchasedPrice} deleted successfully`)
				setRefresh(true)
			} else {
				toast.error('Error deleting the symbol')
			}
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			await fetchApiData()
			await fetchDbData()
			setRefresh(false)
			if (symbols.length > 0 && Object.entries(stockValue).length > 0) {
				chartDataCallback(symbols, stockValue)
			}
		}
		fetchData()
	}, [portfolioId, refresh])

	return (
		<div className="symbols-list">
			<h2>Symbols List</h2>
			<ul>
				{symbols.map((stock: Stocks, index) => (
					<li key={index} className="symbol-item">
						<div className="primary-content">
							<h3>{stock.stock_symbols}</h3>
							<span>Purchased price: {stock.purchase_price + '$'}</span>
							<span>Quantity: {stock.quantity}</span>
						</div>

						<div className="secondary-content">
							{
								stockValue[stock.stock_symbols] && (
									<>
										<p>Current Value: {calculateCurrentValue(stock) + '$'}</p>
										<p>Profit/Loss: {displayProfitLoss(stock)}</p>
									</>
								)
							}
						</div>

						<button className="delete-button">
							<FaTrash className="Xmark" onClick={() => handleDeleteSymbol(portfolioId, stock.stock_symbols, stock.purchase_price)} />
						</button>
					</li>
				))}
			</ul>
			<SymbolForm setRefresh={setRefresh} portfolioId={portfolioId} />

		</div>
	)
}

export default SymbolList
