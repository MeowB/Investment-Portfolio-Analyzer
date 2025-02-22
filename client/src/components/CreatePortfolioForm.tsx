import axios from "axios"
import { FormEvent, useState } from "react"
import '../styles/forms.css'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const CreatePortfolioForm = () => {
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	let navigate = useNavigate()

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		try {
			const response = await axios.post("/api/portfolios", {
				name,
				description
			})

			toast.success(response.data.message)
			navigate('/portfolios')
		} catch (error) {
			console.error("Error creating portfolio:", error)
			toast.error("Error creating portfolio")
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
			<textarea
				placeholder="Portfolio description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button type="submit">Create Portfolio</button>
		</form>
	)
}

export default CreatePortfolioForm
