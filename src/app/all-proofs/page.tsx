"use client";

import React, { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import ConnectButton from '../../components/ConnectButton/ConnectButton';
import { EthereumProvider } from '@/contexts/EthereumContext';
import { NetworkProvider } from '@/contexts/NetworkContext';
import { ProfileProvider } from '@/contexts/ProfileContext';
import { Switch } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import Image from 'next/image';
import { Select, SelectItem } from "@nextui-org/react";
import { ListProofs } from "../../components/constants/listProofs";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { getAddressBalance } from '../../components/web3address';

export default function AllProofs() {
  const [selectedValuesCard1, setSelectedValuesCard1] = useState<string[]>([]);
  const [selectedValuesCard2, setSelectedValuesCard2] = useState<string[]>([]);
  const [account, setAccount] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  
  const handleAmountChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value); // Update the amount state with the new input value
  };

  const handleAccountChange = (newAccount: string | null) => {
    setAccount(newAccount);
    console.log('Account:', newAccount);
  };

  // Handle value change for Card 1
  const handleValueChangeCard1 = (value: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedValuesCard1((prevValues) => [...prevValues, value]);
    } else {
      setSelectedValuesCard1((prevValues) => prevValues.filter((item) => item !== value));
    }
  };

  // Handle value change for Card 2
  const handleValueChangeCard2 = (value: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedValuesCard2([value]);
    } else {
      setSelectedValuesCard2([]);
    }
  };

  const handleGenerateProof = async (selectedValues: string[]) => {
    localStorage.setItem('amount', amount); // Save the amount to local storage

    if (selectedValues.includes('web2') && !selectedValues.includes('web3')) {
      console.log('Redirecting to auth URL for web2...');
      window.location.href = authUrl;
    } else if (!selectedValues.includes('web2') && selectedValues.includes('web3')) {
      console.log('Handling web3 option...');
      const balanceWeb3 = await getAddressBalance(account);
      localStorage.setItem('Web3Balance', balanceWeb3);
      window.location.href = '/proof-of-reserve';  
    } else if (selectedValues.includes('web2') && selectedValues.includes('web3')) {
      console.log('Handling both web2 and web3 options...');
    }
  };

  const authUrl = 'https://buildhathon-sandbox.biapi.pro/2.0/auth/webview/connect?client_id=61176337&redirect_uri=http://localhost:3000/proof-of-reserve';

  return (
    <div className='bg-zinc-900'>
      <div className='backdrop-blur-3xl flex flex-col min-h-screen mx-auto' style={{ maxWidth: '1500px' }}>
        <Header />
        <main className="flex-grow">
          {/* Section 1 : List Proof */}
          <section className='flex flex-col relative my-40'>
            <div className="flex flex-row items-start ml-20 space-x-4">
              <div className="flex-1 px-4 mb-20">
                <h2 className="text-7xl font-bold text-white mb-10">Elevate Trust with Verifiable Proofs</h2>
                <p className="text-xl text-gray-300">
                  Unveil the truth with a suite of verifiable proofs. Our platform provides a range of proof generation services designed to meet diverse financial and personal verification needs.
                </p>
              </div>
              <div className="flex-1 flex justify-center items-center z-10">
                <EthereumProvider>
                  <NetworkProvider>
                    <ProfileProvider>
                      <ConnectButton onAccountChange={handleAccountChange} />
                    </ProfileProvider>
                  </NetworkProvider>
                </EthereumProvider>
              </div>
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
            <div className="rounded-xl grid grid-cols-2 gap-8 px-16 pb-12">
              {/* NEED TO FACTORIZE THE CODE !}
              {/* Grid Proof of Reserve */}
              <Card isBlurred className="py-4 bg-opacity-75 bg-thulian_pink-700">
                <CardHeader className="pb-5 pt-2 px-4 flex-col items-center">
                  <Select
                    label="Select your Proof"
                    color={'warning'}
                    placeholder="Reserve"
                    disabledKeys={["insurance", "fidelities"]}
                    className="max-w-xs font-bold pb-5"
                    size='lg'
                  >
                    {ListProofs.map((proof) => (
                      <SelectItem key={proof.value} value={proof.value}>
                        {proof.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <small className="text-gray-900 text-sm">Connect your bank account to the app to prove you have a certain amount on it.</small>
                </CardHeader>
                <CardBody className="overflow-visible py-2 px-10">
                  <div key={'bordered'} className="flex flex-col w-full mb-6 gap-4">
                    <Input type="number" variant={'bordered'} label="Amount" placeholder="$100.000" value={amount} onChange={handleAmountChange}/>
                    <Input type="text" variant={'bordered'} label="Condition" placeholder="greater" className="mb-4" />
                  </div>
                  <Switch className='mb-3' color='warning'
                    isSelected={selectedValuesCard1.includes('web2')} onValueChange={(isSelected) => handleValueChangeCard1('web2', isSelected)}>
                    Web2 Data
                  </Switch>
                  <Switch color='danger' isSelected={selectedValuesCard1.includes('web3')} onValueChange={(isSelected) => handleValueChangeCard1('web3', isSelected)}>
                    Web3 Data
                  </Switch>
                </CardBody>
                <CardFooter className="flex flex-col justify-center items-center space-y-2">
                  <Button onClick={() => handleGenerateProof(selectedValuesCard1)} className='bg-tiffany_blue' size="lg"
                    isDisabled={!account} // This disables the button when `account` is null or an empty string
                  >
                    Start
                  </Button>
                  {!account && <p className="text-small text-default-800">You must connect your wallet</p>}
                </CardFooter>
              </Card>
              {/* Grid Transactions */}
              <Card isBlurred className="py-4 bg-tiffany_blue bg-opacity-75">
                <CardHeader className="pb-5 pt-2 px-4 flex-col items-center">
                  <p className="text-3xl font-bold pb-2">Transactions</p>
                  <small className="text-gray-900 text-sm">Connect your bank account to the app to prove you have a certain amount on it.</small>
                </CardHeader>
                <CardBody className="overflow-visible py-2 px-10">
                  <div key={'bordered'} className="flex flex-col w-full mb-6 gap-4">
                    <Autocomplete
                      placeholder='Type to search...'
                      className="mb-4"
                      variant={'bordered'}
                      startContent={
                        <Image
                          src="/images/icon/search.svg"
                          alt="Logo"
                          width={24}
                          height={24}
                          className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"
                        />}
                    >
                      {ListProofs.map((listProof) => (
                        <AutocompleteItem key={listProof.value} value={listProof.value}>
                          {listProof.label}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                  </div>
                  <Switch className='mb-3'
                    isSelected={selectedValuesCard2.includes('web2')} onValueChange={(isSelected) => handleValueChangeCard2('web2', isSelected)}>
                    Web2 Data
                  </Switch>
                  <Switch color='secondary' isSelected={selectedValuesCard2.includes('web3')} onValueChange={(isSelected) => handleValueChangeCard2('web3', isSelected)}>
                    Web3 Data
                  </Switch>
                </CardBody>
                <CardFooter className="flex flex-col justify-center items-center space-y-2">
                  <Button onClick={() => handleGenerateProof(selectedValuesCard2)} className='bg-tiffany_blue' size="lg" isDisabled={!account} >
                    Start
                  </Button>
                  {!account && <p className="text-small text-default-800">Connect your wallet</p>}
                </CardFooter>
              </Card>
              {/* Grid Proof of Insurance claims */}
              <Card isBlurred className="py-4 bg-thulian_pink-700 bg-opacity-75">
                <CardHeader className="pb-5 pt-2 px-4 flex-col items-center">
                  <p className="text-3xl font-bold pb-2">Insurance claims</p>
                  <small className="text-gray-900 text-sm">Connect your bank account to the app to prove you have a certain amount on it.</small>
                </CardHeader>
                <CardBody className="overflow-visible py-2 px-10">
                </CardBody>
                <CardFooter className="flex justify-center items-center">
                  <Button className='bg-dark_purple text-white' size="lg">
                    Comming soon
                  </Button>
                </CardFooter>
              </Card>
              {/* Grid Funds */}
              <Card isBlurred className="py-4 bg-tiffany_blue bg-opacity-75">
                <CardHeader className="pb-5 pt-2 px-4 flex-col items-center">
                  <p className="text-3xl font-bold pb-2">Funds</p>
                  <small className="text-gray-900 text-sm">Connect your bank account to the app to prove you have a certain amount on it.</small>
                </CardHeader>
                <CardBody className="overflow-visible py-2 px-10">
                </CardBody>
                <CardFooter className="flex justify-center items-center">
                  <Button className='bg-dark_purple text-white' size="lg">
                    Comming soon
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>
        </main >
        <Footer />
      </div >
    </div >
  );
}