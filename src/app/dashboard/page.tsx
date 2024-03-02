"use client";

import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Image from 'next/image';
import { Card, CardHeader, CardBody, CardFooter, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Autocomplete, AutocompleteItem, Progress, Accordion, AccordionItem, Table, TableColumn, TableHeader, TableRow, TableBody, TableCell, Avatar, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, CircularProgress, Chip } from "@nextui-org/react";
import { useSearchParams } from 'next/navigation';
import { ethers } from 'ethers';
import { abiLukso, contractAddressLukso } from '../../components/constants/luksoABI.js';
import { abiXDC, contractAddressXDC } from '../../components/constants/xdcABI.js';
import lukso from '@lukso/web3-onboard-config';

export default function Dashboard() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const handleOpen = () => {
		onOpen();
	}
	const [amount, setAmount] = useState(0); // From all-proofs (Proof of Reserve) IF EXISTS this mean it's a proof of reserve!
	const [balance, setBalance] = useState(0);
	const [successPercentage, setSuccessPercentage] = useState(0);
	const [account, setAccount] = useState<string | null>(null);
	const handleAccountChange = (newAccount: string | null) => {
		setAccount(newAccount);
		console.log('Account:', newAccount);
	};

	// CALL POWENS FOR KEY ECHANGES
	const searchParams = useSearchParams()
	const [accessToken, setAccessToken] = useState("");
	const [web3balance, setWeb3Balance] = useState(0);

	useEffect(() => {
		const code = searchParams.get('code')
		const data = {
			code: code,
			client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
			client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
		};
		console.log('Code:', code);
		console.log('Client ID:', data.client_id);
		console.log('Secret:', data.client_secret);

		fetch(`https://${process.env.NEXT_PUBLIC_DOMAINE}-sandbox.biapi.pro/2.0/auth/token/access`, {
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
				if (localStorage.getItem('accessToken') == null || localStorage.getItem('accessToken') == "null" || localStorage.getItem('accessToken') == "undefined") {
					setAccessToken(data.access_token);
					localStorage.setItem('accessToken', data.access_token);
				} else {
					setAccessToken(localStorage.getItem('accessToken'));
				}
			})
			.catch((error: any) => {
				console.error('Error:', error);
			});
	}, []);

	// Call Powens for the Balance in the account
	function getBalance() {
		const data = {
			"access_token": accessToken
		}

		if (accessToken) {
			fetch(`https://${process.env.NEXT_PUBLIC_DOMAINE}-sandbox.biapi.pro/2.0/users/me/accounts`, {
				method: 'GET',
				headers: {
					'Authorization': 'Bearer ' + accessToken,
					'Content-Type': 'application/json'
				},
			})
				.then(response => response.json())
				.then(data => {
					const balance = data.balance;
					console.log("Balance is: " + balance);
					const currentAmount = parseFloat(localStorage.getItem('amount') || '0');
					console.log("Current amount is: " + currentAmount);
					setAmount(currentAmount);
					console.log("amount is: " + amount);
					let successPercent = (balance / currentAmount) * 100;
					console.log("Success percentage is: " + successPercent);
					successPercent = Math.min(Math.max(successPercent, 0), 100);
					console.log("Success percentage is: " + successPercent);
					setBalance(balance);
					setSuccessPercentage(isNaN(successPercent) ? 0 : successPercent);
				})
				.catch(error => {
					console.error('Error:', error);
				});
		} else {
			console.log("Impossible to call balance function: access token is undefined.")
		}
	}
	useEffect(() => {
		if (accessToken) {
			getBalance();
		}
	}, [accessToken]);

	useEffect(() => { // Dynamicly update amount
		const storedAmount = parseFloat(localStorage.getItem('amount') || '0');
		setAmount(storedAmount);
	}, []);

	useEffect(() => { // Dynamicly update amount
		const web3balance = parseFloat(localStorage.getItem('Web3Balance') || '0');
		setWeb3Balance(web3balance);
		console.log("Web3 balance is: " + web3balance);
	}, []);

	//////////MINT LUKSO AND XDC////////////

	async function mintSBT(mintSBTCondition: number, mintSBTValue: number, targetContractType: string) {
		try {
			if (typeof window.ethereum !== "undefined") {
				const provider = new ethers.BrowserProvider(window.ethereum);

				const signer = await provider.getSigner();

				let targetContract;
				if (targetContractType === 'Lukso') {
					targetContract = new ethers.Contract(contractAddressLukso, abiLukso, signer);
				} else if (targetContractType === 'XDC') {
					targetContract = new ethers.Contract(contractAddressXDC, abiXDC, signer);
				}

				const targetCalldata = await targetContract.claimSBT(mintSBTCondition, mintSBTValue);
				console.log('hash', targetCalldata);
			}
		} catch (error) {
			console.error(error);
		}
	}
	async function handleButtonClickLukso() { // To call onClose and mintSBT when generate proof
		console.log('balance', balance);
		console.log('amount', amount);
		const balanceInt = Math.trunc(balance);
		const amountInt = Math.trunc(amount);

		// Now pass these integer values to the mintSBT function
		await mintSBT(amountInt, balanceInt, 'Lukso')
		onClose();
	}
	async function handleButtonClickXDC() {
		console.log('balance', balance);
		console.log('amount', amount);
		const balanceInt = Math.trunc(balance);
		const amountInt = Math.trunc(amount);

		// Now pass these integer values to the mintSBT function
		await mintSBT(amountInt, balanceInt, 'XDC')
		onClose();
	}

	return (
		<main className='bg-zinc-900'>
			<div className='backdrop-blur-3xl flex flex-col min-h-screen mx-auto' style={{ maxWidth: '1500px' }}>
				<Header />
				<div className='relative'>
					<div
						className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
						style={{
							background: 'linear-gradient(to bottom, rgba(201, 117, 156, 0.7) 40%, rgba(212, 137, 127, 0.5) 50%)',
							filter: 'blur(180px)',
							width: '550px',
							height: '550px',
						}}
					/>
					<div
						className="absolute left-1/2 transform translate-x-40 -translate-y-10"
						style={{
							background: 'linear-gradient(to bottom, rgba(135,203,208,1) 20%, rgba(0,0,0,1) 90%)',
							filter: 'blur(80px)',
							width: '330px',
							height: '330px',
						}}
					/>
					<div
						className="absolute transform -translate-x-10 -translate-y-80 "
						style={{
							background: 'linear-gradient(to bottom, rgba(83,32,73,1) 30%, rgba(82,55,149,1) 93%)',
							filter: 'blur(80px)',
							width: '330px',
							height: '330px',
						}}
					/>
					{accessToken || web3balance ? (
						<>
							{(amount > 0 || web3balance) && (
								<>
									{/*Proof of reserve*/}
									<section className="flex items-center justify-center my-6">
										<div className="flex flex-col gap-4 w-1/2">
											<Card className="w-full p-3 flex-col">
												<CardHeader className="flex flex-col items-center gap-3">
													<div className="flex flex-row mt-2">
														<p className="mx-auto text-3xl font-bold pr-2">{successPercentage.toFixed(2)}%</p>
														<p className="text-3xl font-bold">Filled</p>
													</div>
													<div className="w-full">
														<Progress color={successPercentage === 100 ? "success" : "warning"} aria-label="Loading..." value={successPercentage} />
													</div>
												</CardHeader>
												<CardBody>
													{/* Name of the proof */}
													<p className="mx-auto text-xl mb-4">
														{successPercentage === 100 ? "You fit the requirement!" : "You don't fit the requirement."}
													</p>
													<div>
														<p className="text-xl font-semibold mb-4">Details:</p>
														<Accordion selectionMode="multiple">
															<AccordionItem key="1" aria-label="web2" title="web2">
																<Table aria-label="Example static collection table" className="m-2 w-9/10">
																	<TableHeader>
																		<TableColumn>BANK ACCOUNTS</TableColumn>
																		<TableColumn>ID NUMBER</TableColumn>
																		<TableColumn>AMOUNT</TableColumn>
																	</TableHeader>
																	<TableBody>
																		<TableRow key="1">
																			<TableCell>Checking Account</TableCell>
																			<TableCell>CEO</TableCell>
																			<TableCell>Active</TableCell>
																		</TableRow>
																		<TableRow key="2">
																			<TableCell>Savings Account</TableCell>
																			<TableCell>Technical Lead</TableCell>
																			<TableCell>Paused</TableCell>
																		</TableRow>
																		<TableRow key="3">
																			<TableCell>Home Savings Account</TableCell>
																			<TableCell>Senior Developer</TableCell>
																			<TableCell>Active</TableCell>
																		</TableRow>
																		<TableRow key="4">
																			<TableCell>Brokerage Account</TableCell>
																			<TableCell>Community Manager</TableCell>
																			<TableCell>Vacation</TableCell>
																		</TableRow>
																	</TableBody>
																</Table>
															</AccordionItem>
															<AccordionItem key="2" aria-label="web3" title="web3">
																<Table aria-label="Example static collection table" className="m-2 w-9/10">
																	<TableHeader>
																		<TableColumn>TOKEN</TableColumn>
																		<TableColumn>NETWORK</TableColumn>
																		<TableColumn>AMOUNT</TableColumn>
																	</TableHeader>
																	<TableBody>
																		<TableRow key="1">
																			<TableCell style={{ display: "flex", alignItems: "center" }}>
																				<Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="w-5 h-5 text-tiny mr-2" />
																				<p>USDC</p>
																			</TableCell>
																			<TableCell>XDC Network</TableCell>
																			<TableCell>1382.28</TableCell>
																		</TableRow>
																		<TableRow key="2">
																			<TableCell style={{ display: "flex", alignItems: "center" }}>
																				<Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" className="w-5 h-5 text-tiny mr-2" />
																				<p>USDT</p>
																			</TableCell>
																			<TableCell>Technical Lead</TableCell>
																			<TableCell>Paused</TableCell>
																		</TableRow>
																		<TableRow key="3">
																			<TableCell>ETH</TableCell>
																			<TableCell>Senior Developer</TableCell>
																			<TableCell>Active</TableCell>
																		</TableRow>
																		<TableRow key="4">
																			<TableCell>LUKSO</TableCell>
																			<TableCell>Community Manager</TableCell>
																			<TableCell>Vacation</TableCell>
																		</TableRow>
																		<TableRow key="5">
																			<TableCell>LUKSO</TableCell>
																			<TableCell>Community Manager</TableCell>
																			<TableCell>Vacation</TableCell>
																		</TableRow>
																	</TableBody>
																</Table>
															</AccordionItem>
														</Accordion>
													</div>
												</CardBody>

												<CardFooter className="mb-2">
													<Button className="mx-auto" size='lg' onPress={() => handleOpen()} isDisabled={successPercentage < 100}>Generate a proof</Button>
													{/* <div className="flex-1 flex justify-center items-center z-10">
														<EthereumProvider>
															<NetworkProvider>
																<ProfileProvider>
																	<ConnectButton onAccountChange={handleAccountChange} />
																</ProfileProvider>
															</NetworkProvider>
														</EthereumProvider>
													</div> */}
													<Modal
														size="md"
														isOpen={isOpen}
														onClose={onClose}
													>
														<ModalContent>
															{(onClose) => (
																<>
																	<ModalHeader className="flex flex-col gap-1">Choose a network</ModalHeader>
																	<ModalBody>
																		<Button color="default" variant="bordered" onPress={handleButtonClickLukso} size="lg" className="flex items-left justify-between p-4">
																			<div className="flex items-center">
																				<Image
																					src="/images/Lukso-logo.jpeg"
																					alt="Logo"
																					width={48}
																					height={48}
																					className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"
																				/>
																				<div className="ml-3">
																					<h2 className="mb-1">Lukso Network</h2>
																					<p className="text-sm">Super user-friendly</p>
																				</div>
																			</div>
																		</Button>
																		<Button color="default" variant="bordered" onPress={handleButtonClickXDC} size="lg" className="flex items-left justify-between p-4">
																			<div className="flex items-center">
																				<Image
																					src="/images/XDC-Logo.svg"
																					alt="Logo"
																					width={48}
																					height={48}
																					className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"
																				/>
																				<div className="ml-3">
																					<h2 className="mb-1">XDC Network</h2>
																					<p className="text-sm">Super powerful</p>
																				</div>
																			</div>
																		</Button>

																	</ModalBody>
																	<ModalFooter>
																	</ModalFooter>
																</>
															)}
														</ModalContent>
													</Modal>
												</CardFooter>
											</Card>
										</div>
									</section>
								</>
							)}

							{/*Proof of Payment*/}
							<section className="flex items-center justify-center my-6">
								<div className="flex flex-col gap-4 w-1/2">
									<Card className="w-full p-3 flex-col">
										<CardHeader className="flex flex-col items-center gap-3">
											<div className="flex flex-col mx-auto mt-2">
												<p className="mx-auto text-3xl font-bold">83%</p>
											</div>
											<div className="w-full">
												<Progress color="danger" aria-label="Loading..." value={70} />
											</div>
										</CardHeader>

										<CardBody>
											<p className="mx-auto">You don&apos;t fit the requirement.</p>
											<p className="text-xl font-semibold mb-4">Details:</p>
											<Accordion selectionMode="multiple">
												<AccordionItem key="1" aria-label="Transactions" title="Transactions">
													<Table aria-label="Example static collection table" className="m-2 w-9/10">
														<TableHeader>
															<TableColumn>NAME</TableColumn>
															<TableColumn>ROLE</TableColumn>
															<TableColumn>STATUS</TableColumn>
														</TableHeader>
														<TableBody>
															<TableRow key="1">
																<TableCell>Tony Reichert</TableCell>
																<TableCell>CEO</TableCell>
																<TableCell>Active</TableCell>
															</TableRow>
															<TableRow key="2">
																<TableCell>Zoey Lang</TableCell>
																<TableCell>Technical Lead</TableCell>
																<TableCell>Paused</TableCell>
															</TableRow>
															<TableRow key="3">
																<TableCell>Jane Fisher</TableCell>
																<TableCell>Senior Developer</TableCell>
																<TableCell>Active</TableCell>
															</TableRow>
															<TableRow key="4">
																<TableCell>William Howard</TableCell>
																<TableCell>Community Manager</TableCell>
																<TableCell>Vacation</TableCell>
															</TableRow>
														</TableBody>
													</Table>
												</AccordionItem>
											</Accordion>
										</CardBody>
										<CardFooter className="mb-2">
											<Button className="mx-auto" disabled  size='lg'>Generate a proof</Button>
										</CardFooter>
									</Card>
								</div>
							</section>

							{/*Credit score*/}
							<section className="flex items-center justify-center my-6">
								<div className="flex flex-col gap-4 w-1/2">
									<Card className="w-full p-3 flex-col">
										<CardHeader className="flex flex-col items-center gap-3">
											<Card className="w-[240px] h-[240px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
												<CardHeader className="justify-center items-center pb-0">
													<Chip
														classNames={{
															base: "border-1 border-white/30",
															content: "text-white/90 text-small font-semibold",
														}}
														variant="bordered"
													>
														WEB5 CREDIT SCORE
													</Chip>
												</CardHeader>
												<CardBody className="justify-center items-center pt-0">
													<CircularProgress
														classNames={{
															svg: "w-36 h-36 drop-shadow-md",
															indicator: "stroke-white",
															track: "stroke-white/10",
															value: "text-3xl font-semibold text-white",
														}}
														value={70}
														strokeWidth={4}
														showValueLabel={true}
													/>
												</CardBody>
											</Card>
										</CardHeader>

										<CardBody>
											<p className="mx-auto">You don&apos;t fit the requirement.</p>
										</CardBody>
										<CardFooter className="mb-2">
											<Button className="mx-auto" disabled>Generate a proof</Button>
										</CardFooter>
									</Card>
								</div>
							</section>
						</>
					) : (
						<>
							<div className="flex justify-center items-center h-screen">
								<Button color="danger" size='lg' isLoading className="flex justify-center items-center">
									Loading
								</Button>
							</div>
						</>
					)}
				</div>

			</div>
		</main>
	);
}