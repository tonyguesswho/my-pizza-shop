import React, { useState } from 'react';
import { useMutation, useQuery, queryCache } from 'react-query';
import { CreateOrder, GetOrders } from '../Queries'
import { Layout, Space, Select, Divider, Input, Form, Button, Col, Row } from 'antd';
import tagRender from '../components/Tags'
import OrderTable from '../components/OrderTable'
import Alert from '../components/Alert'
import { ingredients } from '../data'
const { Header, Content } = Layout;

const Order = () => {
	const [form] = Form.useForm();
	const [message, setMessage] = useState('')
	const [mutate, { isLoading, isSuccess, error }] = useMutation(CreateOrder, {
		onSuccess: () => {
			form.resetFields()
			setMessage('Order successful')
			queryCache.invalidateQueries('orders')
		}
	})
	const { isFetching, data, } = useQuery("orders", GetOrders, { retry: 1 })


	const createOrder = async (data) => {
		try {
			const { name, ingredients } = data
			let formatted_ingredients = []
			if (ingredients) {
				formatted_ingredients = ingredients.map((item) => ({ name: item }))
			}
			await mutate({
				body: {
					name,
					ingredients: formatted_ingredients
				}
			})
		} catch (error) {
			setMessage('An error Occured')
		}

	}


	return (

		<Layout>
			<Space direction="vertical" size="large">
				<Header className="header">MY PIZZA SHOP</Header>
				<Content className="body">
					{error && <Alert message={message} type="error" placeholder="" />}
					{isSuccess && <Alert message={message} type="success" placeholder="" />}
					<Row justify="space-around">
						<Col xs={22} sm={18} md={16} lg={8}>
							<Form name="basic" onFinish={createOrder} form={form}>
								<Form.Item
									label="Name"
									name="name"
									rules={[{ required: true, message: 'Please input your pizza name!' }]}
								>
									<Input placeholder="Input Pizza Name" name="name" />
								</Form.Item>
								<Divider />
								<Form.Item label="Ingredients" name="ingredients">
									<Select mode="multiple" showArrow tagRender={tagRender} options={ingredients} />
								</Form.Item>
								<Form.Item>
									<Button type="primary" htmlType="submit" disabled={isLoading}>
										Place Order
        						</Button>
								</Form.Item>
							</Form>
						</Col>
					</Row>
					<Row justify="space-around">
						<Col xs={22} sm={18} md={16} lg={8}>
							<div>
								{isFetching && <p>updating order list...</p>}
								{data && <p>List Of Orders</p>}
								{data && <OrderTable data={data} />}
							</div>
						</Col>
					</Row>
				</Content>
			</Space>
		</Layout >
	)

};

export default Order;