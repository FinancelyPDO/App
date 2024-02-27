'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PageProof() {
  const searchParams = useSearchParams();
  const [accessToken, setAccessToken] = useState();

  const code = searchParams.get('code');
  const connection_id = searchParams.get('connection_id');

  console.log("code:" + code);
  console.log("connection_id: " + connection_id);

  useEffect(() => {
    if (code && connection_id) {
      const data = {
        code: code,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET
      };

      fetch(`https://myfreetest-sandbox.biapi.pro/2.0/auth/token/access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log('Access Token:', data.access_token);
        setAccessToken(data.access_token);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }, [code, connection_id]);

  function getAccountData() {
    if (code && connection_id) {
      const data = {
        code: code,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET
      };

      fetch(`https://myfreetest-sandbox.biapi.pro/2.0/users/me/transactions?limit=1000`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }

  return (
<div className="flex justify-center items-center w-screen h-screen bg-indigo-500 bg-opacity-5">
      <main className="w-[450px] h-[616px] relative">
        <div className="w-[450px] h-[523px] relative top-[53px] bg-white rounded-[20px] border border-indigo-500">
          <div className="flex justify-center">
            <button className="flex justify-center text-[28px] font-bold">
              <span style={{ textDecoration: 'underline', color: 'blue' }}>Hash</span>
            </button>
          </div>
          <div className='flex justify-center mt-10'>
            <Image 
              src="/images/proof.png"
              alt="proof"
              width={200}
              height={200}
            />
          </div>
          <div className="left-20 top-[320px] absolute text-center text-slate-800 text-3xl font-bold font-['DM Sans']">Your proof has been <br />generated !</div>
          <button onClick={getAccountData} className="w-[380px] h-[60px] mt-[150px] mx-[35px] bg-indigo-500 rounded-[10px] text-white text-xl font-medium flex justify-center items-center">
          Get data
          </button>
        </div>
      </main>
    </div>
  );
}
