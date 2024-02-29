'use client'

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PageProof() {
  const searchParams = useSearchParams()

  const [accessToken, setAccessToken] = useState("");
  const [clientConnected, setClientConnected] = useState(false);

  useEffect(() => {
    const access_token = searchParams.get('access_token');

    console.log("Access token: " + access_token);

    if (access_token) {
      setAccessToken(access_token);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      setClientConnected(true);
    } else {
      setClientConnected(false);
    }
  }, [accessToken]);

  function startConnection() {
    window.open('http://localhost:8000/api/web2/connection');
  };

  function getBalance() {
    const data =  {
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
      {clientConnected ? (
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
          <p>How did you landed there? 🤨</p>
        </>
      )}
    </div>
  );
}
