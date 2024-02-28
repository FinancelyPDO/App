"use client"

import React, { useState } from 'react';
import Header from '../../components/header'; // Assuming this is used somewhere or planning to be used

export default function ProofOfReserve() {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleGenerateProof = () => {
    if (isNaN(Number(amount)) || amount.trim() === '') {
      setError('Please enter a valid number');
      return;
    } else {
      setError('');
      console.log('Generating proof for amount:', amount);
      window.location.href = authUrl;
    }
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
    if (error) setError('');
  };

  const authUrl = 'https://myfreetest-sandbox.biapi.pro/2.0/auth/webview/connect?client_id=10916951&redirect_uri=http://localhost:3000/PageProof';

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-indigo-500 bg-opacity-5">
      <main className="w-[450px] h-[616px] relative">
        <div className="w-[450px] h-[523px] relative top-[93px] bg-white rounded-[20px] border border-indigo-500">
          <h1 className="pt-[50px] text-center text-black text-[28px] font-bold">Proof of Reserve</h1>
          <p className="mt-[49px] mx-[78px] text-center text-violet-950 text-sm font-light">Connect your bank account to the app to prove you have a certain amount on it.</p>
          <div className="mt-[83px] mx-[35px]">
            <label className="block text-indigo-500 text-xs font-bold mb-[40px]">Amount to prove</label>
            <input
              type="text"
              value={amount}
              onChange={handleChange}
              placeholder="10,000$"
              className="w-full h-[60px] bg-indigo-500 bg-opacity-10 rounded-[10px] pl-[18px] text-indigo-400 text-base font-medium"
            />
            {error && <p className="text-red-500 text-xs mt-[20px]">{error}</p>}
          </div>
          <div className="absolute bottom-[20px] left-1/2 transform translate-x-[-50%]">
            <button
              onClick={handleGenerateProof}
              className="w-[380px] h-[60px] bg-indigo-500 rounded-[10px] text-white text-xl font-medium flex justify-center items-center"
            >
              Generate Proof
            </button>
          </div>
        </div>

    
      </main >
    </div >
  );
}