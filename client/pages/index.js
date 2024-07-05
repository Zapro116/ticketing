import React from 'react';
import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
	console.log(currentUser);

	return currentUser ? <h1>Signed In </h1> : <h1>Not Signed In</h1>;
};

LandingPage.getInitialProps = async (context) => {
	const { data } = await buildClient(context).get('/api/v1/users/currentuser');
	return data;
};

export default LandingPage;
