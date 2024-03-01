'use client'

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PageProof() {
	const searchParams = useSearchParams()
	const [accessToken, setAccessToken] = useState("");

	useEffect(() => {
		const code = searchParams.get('code')

		const data = {
			code: code,
			client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
			client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET
		};

		console.log('Code:', code);
		console.log('Client ID:', data.client_id);
		console.log('Secret:', data.client_secret);

		fetch(`https://buildhathon-sandbox.biapi.pro/2.0/auth/token/access`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((response: any) => response.json())
			.then((data: any) => {
				console.log(data);
				console.log('Access Token:', data.access_token);
				setAccessToken(data.access_token);
			})
			.catch((error: any) => {
				console.error('Error:', error);
			});
	}, []);

	function getBalance() {
		const data = {
			"access_token": accessToken
		}

		if (accessToken) {
			fetch(`http://localhost:8000/api/web2/balance`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
				.then(response => response.json())
				.then(data => {
					alert("Balance is: " + data.balance);
				})
				.catch(error => {
					console.error('Error:', error);
				});
		} else {
			console.log("Impossible to call balance function: access token is undefined.")
		}
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			{accessToken ? (
				<>
					<h1 className="text-4xl font-bold mb-8">Proof of Funds</h1>
					<div className="max-w-md p-8 bg-white rounded-lg shadow-md">
						<div className="mb-4">
							<label htmlFor="hash" className="block text-lg font-semibold mb-2">Hash</label>
							<p id="hash" className="bg-gray-100 p-2 rounded-md">0xez65f1s3d5f1a3e5f13w5d1f3q51qd3s1da</p>
						</div>
						<div className="mb-4">
							<label htmlFor="pdf" className="block text-lg font-semibold mb-2">PDF</label>
							<a href="/path/to/pdf-file.pdf" download className="block bg-indigo-500 text-white px-6 py-3 rounded-md text-center hover:bg-indigo-600 text-lg font-semibold">Download</a>
						</div>
						<button onClick={getBalance}>Get balance</button>
					</div>
				</>
			) : (
				<>
					<p>Loading...</p>
				</>
			)}
		</div>
	);
}
