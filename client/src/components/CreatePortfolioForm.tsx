import axios from "axios"
import { FormEvent, useState } from "react"
import '../styles/CreatePortfolioForm.css'

const CreatePortfolioForm = () => {
	const [name, setName] = useState("")

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		try {
			const response = await axios.post("/api/portfolios", {
				name
			})

			alert(response.data.message)
			setName("")
		} catch (error) {
			console.error("Error creating portfolio:", error)
			return null
		}
	}


	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<input
				type="text"
				placeholder="Portfolio name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<button type="submit">Create Portfolio</button>
		</form>
	)
}

export default CreatePortfolioForm
