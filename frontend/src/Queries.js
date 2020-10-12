import axios from 'axios'
const API_URL='http://localhost:8000/api/orders/'

export const CreateOrder = async (input_data) => {
	const { data } = await axios.post(API_URL, input_data.body)
	return data
}


export const GetOrders = async () => {
	const { data } = await axios.get(API_URL)
	return data
}