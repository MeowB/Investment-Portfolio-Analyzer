import axios from "axios"
import { FormEvent, useEffect, useState } from "react"
import '../styles/forms.css'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

interface CreatePortfolioFormProps {
	portfolioName?: string;
	portfolioDescription?: string;
	edit?: boolean;
	id?: string;
	setEditPortfolio?: any;
	setPortfolio?: any;
}

const CreatePortfolioForm = ({ portfolioName = "", portfolioDescription = "", edit = false, id, setEditPortfolio, setPortfolio }: CreatePortfolioFormProps) => {
	const [name, setName] = useState(portfolioName)
	const [description, setDescription] = useState(portfolioDescription)
	let navigate = useNavigate()

	useEffect(() => {
		if (edit) {
			setName(portfolioName)
			setDescription(portfolioDescription)
		} else {
			setName("")
			setDescription("")
		}
	}, [edit, portfolioName, portfolioDescription])

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		try {
			if (edit) {
				const response = await axios.put(`/api/portfolios/${id}`, {
					id,
					new_name: name,
					new_description: description
				})

				toast.success(response.data.message)
				setPortfolio(response.data.portfolio)
				setEditPortfolio(false)
			} else {
				const response = await axios.post(`/api/portfolios`, {
					name,
					description
				})
	
				toast.success(response.data.message)
				navigate('/portfolios')
			}
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
			<button type="submit">{edit ? 'Update Portfolio' : 'Create Portfolio'}</button>
		</form>
	)
}

export default CreatePortfolioForm
