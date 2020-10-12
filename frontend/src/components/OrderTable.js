import React from 'react';
import { Table, Tag } from 'antd';

const columns = [
	{
	  title: 'Name',
	  dataIndex: 'name',
	  key: 'name',
	},
	{
	  title: 'Status',
	  dataIndex: 'status',
	  key: 'status',
	  render: text => <Tag color={'yellow'}>{text.toUpperCase()}</Tag>
	},
	{
	  title: 'Ingredients',
	  key: 'ingredients',
	  dataIndex: 'ingredients',
	  render: ingredients => (
		<>
		  {ingredients.map(ingredient => {
			return (
			  <Tag color={'pink'} key={ingredient.id}>
				{ingredient.name.toUpperCase()}
			  </Tag>
			);
		  })}
		</>
	  ),
	}
  ];


const Orders = (props) => {
	const { data } = props;
	return (
		<Table columns={columns} dataSource={data} rowKey={(record)=>(record.id)}  />
	);
};

export default Orders;