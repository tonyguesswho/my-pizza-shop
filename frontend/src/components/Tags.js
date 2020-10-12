import React from 'react';
import { Tag } from 'antd';

const Tags = (props) => {
	const { label, closable, onClose } = props;
	return (
		<Tag color='green' closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
			{label}
		</Tag>
	);
};

export default Tags;