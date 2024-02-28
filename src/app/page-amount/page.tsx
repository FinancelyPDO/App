"use client";

import React, { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Image from 'next/image';
import { Card, CardHeader, CardBody } from "@nextui-org/react";

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
    <div className='bg-zinc-900'>
      <div className='backdrop-blur-3xl flex flex-col min-h-screen mx-auto' style={{ maxWidth: '1500px' }}>
        <Header />
        <main className="flex-grow">
          {/* Section 6 : Final Information */}
          <section className='flex flex-col relative my-40'>
            <div className="w-full md:w-1/2 px-4 mb-20 ml-32">
              <h2 className="text-7xl font-bold text-white mb-10">Elevate Trust with Verifiable Proofs</h2>
              <p className="text-xl text-gray-300">
                Unveil the truth with a suite of verifiable proofs. Our platform provides a range of proof generation services designed to meet diverse financial and personal verification needs.
              </p>
            </div>
            <div
              className="absolute left-1/2 transform -translate-x-1/2  translate-y-80"
              style={{
                background: 'linear-gradient(to bottom, rgba(201, 117, 156, 0.7) 40%, rgba(212, 137, 127, 0.5) 50%)',
                filter: 'blur(180px)',
                width: '550px',
                height: '550px',
              }}
            />
            <div
              className="absolute left-1/2 transform translate-x-60 -translate-y-30"
              style={{
                background: 'linear-gradient(to bottom, rgba(135,203,208,1) 20%, rgba(0,0,0,1) 90%)',
                filter: 'blur(80px)',
                width: '330px',
                height: '330px',
              }}
            />
            <div className="rounded-xl grid grid-cols-2 gap-8 px-8 pb-12">
              {/* Grid item 1 */}
              <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <p className="text-tiny uppercase font-bold">Daily Mix</p>
                  <small className="text-default-500">12 Tracks</small>
                  <h4 className="font-bold text-large">Frontend Radio</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  {/*<Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="/images/hero-card-complete.jpeg"
                    width={270}
            />*/}
                </CardBody>
              </Card>
              {/* Grid item 2 */}
              <a href="https://twitter.com/" className="cursor-pointer">
                <div className="p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center space-x-4">
                  <Image
                    src="/images/icon/twitter.svg" // Assuming you have a dedicated Twitter icon
                    alt="Follow Provence on Twitter"
                    width={64}
                    height={64}
                  />
                  <div>
                    <h3 className="text-3xl font-semibold mb-4 text-white">Twitter</h3>
                    <p className="text-xl text-gray-400">
                      Follow us to get the latest news and updates from across the ecosystem.
                    </p>
                  </div>
                </div>
              </a>
              {/* Grid item 3 */}
              <a href="https://discord.com" className="cursor-pointer">
                <div className="p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center space-x-4">
                  <Image
                    src="/images/icon/discord.svg" // Assuming you have a dedicated Discord icon
                    alt="Developer Chat on Discord"
                    width={64}
                    height={64}
                  />
                  <div>
                    <h3 className="text-3xl font-semibold mb-4 text-white">Developer Chat</h3>
                    <p className="text-xl text-gray-400">
                      Have technical questions about our tools? Ask a developer on the Community Discord.
                    </p>
                  </div>
                </div>
              </a>
              {/* Grid item 4 */}
              <a href="/github" className="cursor-pointer">
                <div className="p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center space-x-4">
                  <Image
                    src="/images/icon/github.svg"
                    alt="Github Organisation"
                    width={64}
                    height={64}
                    className="mr-4"
                  />
                  <div>
                    <h3 className="text-3xl mb-4 font-semibold text-white">Github Organisation</h3>
                    <p className="text-xl text-gray-400">
                      Curious about our code or eager to contribute? Explore our repositories and become part of our GitHub community.
                    </p>
                  </div>
                </div>
              </a>
            </div>

          </section>

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
        <Footer />
      </div >
    </div >
  );
}