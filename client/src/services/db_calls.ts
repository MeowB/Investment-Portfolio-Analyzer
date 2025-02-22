import axios from "axios"
const API_URL = 'http://127.0.0.1:5000/api'

export const fetchPortfoliosList = async () => {
	try {
		console.log("Fetching portfolios list from:", API_URL + "/portfolios")
		const response = await axios.get(API_URL + "/portfolios")
		return response.data
	} catch (error) {
		console.error('Error fetching portfolios list: ', error)
		return null
	}
}

export const fetchPortfolio = async (id: string | undefined) => {
	try {
		if (!id) {
			throw new Error("Portfolio ID is required")
		}
		const response = await axios.get(API_URL + `/portfolios/${id}`)
		return response.data
	} catch (error) {
		console.error('Error fetching portfolio: ', error)
		return null
	}
}

export const deletePortfolio = async (id: string | undefined) => {
	if (!id) {
		console.error("Portfolio ID is required");
		return;
	}

	try {
		const response = await axios.delete(`${API_URL}/portfolios/${id}`)
		if (response.status === 200) {
			console.log("Portfolio deleted:", response.data);
		} else {
			console.error("Failed to delete portfolio:", response.data);
		}
	} catch (error) {
		console.error("Error deleting portfolio:", error)
	}
}

export const fetchPortfolioData = async (id) => {
	try {
		const response = await axios.get(`${API_URL}/portfolios/${id}/stocks`)
		return response.data
	} catch (error) {
		console.error('Error fetching portfolio stock data:', error)
	}
}