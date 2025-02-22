import axios from "axios"

const API_URL = 'http://127.0.0.1:5000/api'

export const fetchStockData = async (symbol: string) => {
	try {
		const response = await axios.get(API_URL + "/stocks", { params: { symbol }})
		return response.data
	} catch (error) {
		console.error('Error fetching stock data: ', error)
		return null
	}
}
