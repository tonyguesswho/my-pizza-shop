
import React, { useState } from 'react';
import { Alert } from 'antd';


const ShowAlert = (props) => {
	const [visible, setVisible] = useState(true);
	const { message, type, placeholder } = props;

	const handleClose = () => {
		setVisible(false);
	};

	return (
		<div>
			{visible ? (
				<Alert message={message} type={type} closable afterClose={handleClose} />
			) : null}
			<p>{placeholder}</p>
		</div>
	);
};
export default ShowAlert;


