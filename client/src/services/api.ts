import axios from "axios"

export const fetchStockData = async (symbol: string) => {
	try {
		const response = await axios.get("/api/stocks", { params: { symbol }})
		return response.data
	} catch (error) {
		console.error('Error fetching stock data: ', error)
		return null
	}
}

export const fetchPortfolioStockValues = async (id: string) => {
	try {
		const response = await axios.get(`/api/portfolios/${id}/stocks-values`)
		return response.data.stock_values
	} catch (error) {
		console.error('Error fetching stock values:', error)
		return {}
	}
}