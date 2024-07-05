import React, { useState } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

export default () => {
	const [email, setEmail] = useState('test@test.com');
	const [password, setPassword] = useState('password');
	const { errors, doRequest } = useRequest({
		url: '/api/v1/users/signin',
		method: 'post',
		body: { email, password },
		onSuccess: () => Router.push('/'),
	});

	const onSubmit = async (e) => {
		e.preventDefault();
		doRequest();
	};

	return (
		<form onSubmit={onSubmit}>
			<h1>Sign in</h1>
			<div className='form-group'>
				<label>Email address</label>
				<input
					className='form-control'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className='form-group'>
				<label>Password</label>
				<input
					type='password'
					className='form-control'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			{errors}
			<button className='btn btn-primary'>Sign in</button>
		</form>
	);
};
