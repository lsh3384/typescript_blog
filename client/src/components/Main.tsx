import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
	return (
		<>
			<h3>안녕하세요. Tools 입니다.</h3>
			<ul>
				<Link to="/converter/"><li>Pdf To Jpeg Converter</li></Link>
			</ul>
		</>
	);
};

export default Main;