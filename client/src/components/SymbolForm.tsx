import { FormEvent, useState } from "react";
import "../styles/SymbolForm.css";
import { toast } from "react-toastify"
import axios from "axios"
import { FaXmark } from "react-icons/fa6";

interface SymbolField {
	symbol: string;
	price: number;
	quantity: number;
}

const SymbolForm = ({ portfolioId, setRefresh }: { portfolioId: string, setRefresh: any }) => {
	const [fields, setFields] = useState<SymbolField[]>([]);

	const handleAddField = () => {
		setFields([...fields, { symbol: "", price: 0, quantity: 0 }]);
	};

	const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const newFields = fields.slice();
		newFields[index] = { ...newFields[index], [name]: value };
		setFields(newFields);
	};

	const handleRemoveField = (index: number) => {
		const newFields = fields.slice();
		newFields.splice(index, 1);
		setFields(newFields);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		let data: any = []

		fields.forEach((field) => {
			data.push({
				symbol: field.symbol.toUpperCase(),
				purchased_price: +field.price,
				quantity: +field.quantity
			})
		});

		try {
			const response = await axios.post(`/api/portfolios/${portfolioId}/add-stocks`, {
				symbols_data: data
			})

			console.log(response)
			setFields([])
			setRefresh(true) // Ensure this is called after successful addition
		} catch (error) {
			console.error("Error adding symbols:", error)
			toast.error("Error adding symbols")
			return null
		}
	}

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			{fields.map((field, index) => (
				<div key={index} className="symbol-field">
					<label>
						Symbol:
						<input
							type="text"
							name="symbol"
							value={field.symbol}
							onChange={(event) => handleChange(index, event)}
							placeholder={`Symbol ${index + 1}`}
						/>
					</label>
					<label>
						Purchased Price:
						<input
							type="number"
							name="price"
							value={field.price}
							onChange={(event) => handleChange(index, event)}
							placeholder={`Purchased Price ${index + 1}`}
						/>
					</label>
					<label>
						Quantity:
						<input
							type="number"
							name="quantity"
							value={field.quantity}
							onChange={(event) => handleChange(index, event)}
							placeholder={`Quantity ${index + 1}`}
						/>
					</label>

					<FaXmark onClick={() => handleRemoveField(index)} />
				</div>
			))}
			<button type="button" onClick={handleAddField}>Add a Symbol</button>
			{fields.length > 0
				? (<button type="submit">Validate</button>)
				: (<></>)
			}
		</form>
	);
};

export default SymbolForm;
