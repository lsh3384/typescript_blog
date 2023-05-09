import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
	return (
		<>
			<h3>안녕하세요. Tools Blog 입니다.</h3>
			<ul>
				<Link to="/converter/"><li>Pdf → Jpeg 변환</li></Link>
				<Link to="/counter/"><li>Counter</li></Link>
			</ul>
		</>
	);
};

export default Main;