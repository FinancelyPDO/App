"use client";

import React, { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Image from 'next/image';
import { Card, CardHeader, CardBody, CardFooter, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Autocomplete, AutocompleteItem, Progress, Accordion, AccordionItem, Table, TableColumn, TableHeader, TableRow, TableBody, TableCell, Avatar, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, CircularProgress, Chip } from "@nextui-org/react";

export default function Dashboard() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOpen = () => {
        onOpen();
    }

    return (
        <main className='backdrop-blur-3xl flex flex-col min-h-screen mx-auto'>

            {/*Proof of reserve*/}
            <div className="flex items-center justify-center my-6">
                <div className="flex flex-col gap-4 w-1/2">
                    <Card className="w-full p-3 flex-col">
                        <CardHeader className="flex flex-col items-center gap-3">
                            <div className="flex flex-col mx-auto mt-2">
                                <p className="mx-auto text-3xl font-bold">73%</p>
                            </div>
                            <div className="w-full">
                                <Progress color="danger" aria-label="Loading..." value={70} />
                            </div>
                        </CardHeader>

                        <CardBody>
                            {/* Name of the proof */}
                            <p className="mx-auto">You don't fit the requirement.</p>
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
                        </CardBody>

                        <CardFooter className="mb-2">
                            <Button className="mx-auto" onPress={() => handleOpen()} disabled>Generate a proof</Button>

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
                                                <Button color="default" variant="bordered" onPress={onClose} size="lg" className="flex items-left justify-between p-4">
                                                    <div className="flex items-center">
                                                        <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                                        <div className="ml-3">
                                                            <h2 className="mb-1">Lukso Network</h2>
                                                            <p className="text-sm">Super user-friendly</p>
                                                        </div>
                                                    </div>
                                                </Button>
                                                <Button color="default" variant="bordered" onPress={onClose} size="lg" className="flex items-left justify-between p-4">
                                                    <div className="flex items-center">
                                                        <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
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
            </div>

            {/*Proof of Payment*/}
            <div className="flex items-center justify-center my-6">
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
                            <p className="mx-auto">You don't fit the requirement.</p>

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
                            <Button className="mx-auto" disabled>Generate a proof</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            {/*Credit score*/}
            <div className="flex items-center justify-center my-6">
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
                            <p className="mx-auto">You don't fit the requirement.</p>
                        </CardBody>

                        <CardFooter className="mb-2">
                            <Button className="mx-auto" disabled>Generate a proof</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>

        </main>
    );
}