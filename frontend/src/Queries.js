import axios from 'axios'

export const CreateOrder = async (input_data) => {
	const { data } = await axios.post("http://localhost:8000/api/orders/", input_data.body)
	return data
}


export const GetOrders = async () => {
	const { data } = await axios.get("http://localhost:8000/api/orders/")
	return data
}