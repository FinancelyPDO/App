"use client";

import React, { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Image from 'next/image';
import { Card, CardHeader, CardBody, CardFooter, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function ProofOfPayment() {

    return (
        <main>
            <div className="flex flex-col gap-4">
                <Card className="max-w-[600px] ">
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p>Open-Banking Proof Issuer</p>
                        </div>
                    </CardHeader>

                    <CardBody>
                        {/* Name of the proof */}
                        <Input type="email" variant="bordered" label="Name" className="my-3" />

                        {/* Choose a data type */}
                        <Autocomplete label="Choose a data type" className="max-w-xs my-2">
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
                            <AutocompleteItem key="higher" value="higher">Higher</AutocompleteItem>
                            <AutocompleteItem key="below" value="below">Below</AutocompleteItem>
                            <AutocompleteItem key="equal" value="equal">Equal</AutocompleteItem>
                        </Autocomplete>

                        {/* Choose anteriority */}
                        <Input type="date" variant="bordered" label="Anterority" className="my-3"/>

                        {/* Condition value */}
                        <Input type="value" variant="bordered" label="Conditional value" className="my-3"/>
                    </CardBody>

                    <CardFooter>
                        <Button>Next</Button>
                    </CardFooter>
                </Card>
            </div>

        </main>
    );
}