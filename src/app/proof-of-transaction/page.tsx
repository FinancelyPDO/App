"use client";

import React, { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Image from 'next/image';
import { Card, CardHeader, CardBody, CardFooter, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function ProofOfTransaction() {

    return (
        <main className='backdrop-blur-3xl flex flex-col min-h-screen mx-auto'>
            <div className="flex items-center justify-center">
                <div className="flex flex-col gap-4 w-1/3">
                    <Card className="w-full p-3">
                        <CardHeader className="flex gap-3">
                            <div className="flex flex-col mx-auto mt-2">
                                <p className="mx-auto">Open-Banking Proof Issuer</p>
                            </div>
                        </CardHeader>

                        <CardBody>
                            {/* Name of the proof */}
                            <Input type="email" variant="bordered" label="Name" className="my-3" />

                            {/* Choose anteriority */}
                            <Input type="date" variant="bordered" label="Anterority" className="my-3" defaultValue="2024-03-02" />

                            {/* Choose a data type */}
                            <Autocomplete label="Choose a data type" className="max-w-xs my-2 w-full">
                                <AutocompleteItem key="category" value="category">
                                    <div className="flex flex-col">
                                        <span className="text-small">Category</span>
                                        <span className="text-tiny text-default-400">Ex: Restaurant, Health, Insurance...</span>
                                    </div>
                                </AutocompleteItem>

                                <AutocompleteItem key="recipient" value="recipient">
                                    <div className="flex flex-col">
                                        <span className="text-small">Recipient</span>
                                        <span className="text-tiny text-default-400">Ex: McDonalds, Alice Bob, Apple, Nike...</span>
                                    </div>
                                </AutocompleteItem>

                                <AutocompleteItem key="type" value="type">
                                    <div className="flex flex-col">
                                        <span className="text-small">Type</span>
                                        <span className="text-tiny text-default-400">Ex: Credit card, Bank transfer, Subscription...</span>
                                    </div>
                                </AutocompleteItem>
                            </Autocomplete>

                            {/* Choose a condition type */}
                            <Autocomplete label="Choose a condition type" className="max-w-xs my-3">
                                <AutocompleteItem key="higher" value="higher">Greater</AutocompleteItem>
                                <AutocompleteItem key="below" value="below">Lower</AutocompleteItem>
                                <AutocompleteItem key="equal" value="equal">Equal</AutocompleteItem>
                            </Autocomplete>

                            {/* Condition value */}
                            <Input type="value" variant="bordered" label="Conditional value" className="my-3" />
                        </CardBody>

                        <CardFooter className="mb-2">
                            <Button className="mx-auto">Next</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </main>
    );
}