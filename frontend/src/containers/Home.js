import React, { useState } from 'react';
import { useMutation, useQuery, queryCache } from 'react-query';
import { Typography } from 'antd';
import { CreateOrder, GetOrders } from '../Queries'
import { Layout, Space } from 'antd';
const { Header, Footer, Content, Form, Input, Button, Select } = Layout;
// const { Option } = Select;
const { Title } = Typography;

const Order = () => {
	const [state, setState] = useState({ name: "", ingredient: [] })

	const [mutate, info] = useMutation(CreateOrder, {
		onSuccess: (data) => {
			console.log(info)
			state.name = ""
			queryCache.invalidateQueries('orders')
		}
	})
	const { isLoading, isFetching, data, isError } = useQuery("orders", GetOrders, { retry: 1 })

	const onChangeHandler = (e) => {
		e.persist()
		setState(prev => (
			{
				...prev,
				[e.target.name]: e.target.value

			}
		))
	}

	const createOrder = async () => {
		try {
			await mutate({
				body: state
			})
		} catch (error) {

		}

	}


	return (

		<Layout>
			<Space direction="vertical" size="large">
				<Header className="header">MY PIZZA SHOP</Header>
				<Content>
					<input type='text' value={state.name} name="name" onChange={onChangeHandler} />

					<button onClick={createOrder}>Create</button>

					<div>
						{isLoading && <p>Loading....</p>}
						{isFetching && <p>updating list...</p>}
						{data && data.map(el => {
							return (
								<div>
									<p>Orders</p>
									<p>{el.id}</p>
									<p>{el.name}</p>
									<p>{el.status}</p>
								</div>
							)
						})}
					</div>

				</Content>
				<Footer>

				</Footer>
			</Space>
		</Layout>
	)

};

export default Order;