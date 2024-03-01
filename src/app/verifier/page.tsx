'use client'

import React, { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Image from 'next/image';
import { Card, CardHeader, CardBody, CardFooter, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Autocomplete, AutocompleteItem, Spinner } from "@nextui-org/react";

export default function Verifier() {
    const [hash, setHash] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<boolean | string>("");
    const [error, setError] = useState(null); // Variable d'état pour stocker l'erreur

    const handleCheck = () => {
        setLoading(true);

        fetch('URL_VOTRE_API')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setResult(data.message === "use client" ? "true" : "false");
                setLoading(false);
                setError(null);
            })
            .catch(error => {
                // Comment these lines to test
                console.error('Error:', error);
                setLoading(false);
                setError(error);

                // TEST TRUE
                /*setResult(true);
                setLoading(false);
                setError(null);*/

                // TEST FALSE
                /*setResult(false);
                setLoading(false);
                setError(null);*/
            });
    };

    return (
        <main className='backdrop-blur-3xl flex flex-col min-h-screen mx-auto'>
            <div className="flex items-center justify-center flex-grow">
                <div className="flex flex-col gap-4 w-1/3">
                    <Card className="w-full p-2">
                        <CardHeader className="flex gap-3">
                            <div className="flex flex-col mx-auto mt-2">
                                <p className="mx-auto">Verifier</p>
                            </div>
                        </CardHeader>

                        <CardBody>
                            <Input
                                type="email"
                                variant="bordered"
                                label="Hash"
                                className="my-2"
                                value={hash}
                                onChange={(e) => setHash(e.target.value)}
                                disabled={!!result}
                            />

                            {error && <p color="error" className="mx-auto mt-3">An error occurred. Please try again.</p>}

                            {typeof result === "boolean" && result && !loading && <p className="mx-auto mt-3 mb-2">This proof is valid 🥳</p>}
                            {typeof result === "boolean" && !result && !loading && <p className="mx-auto mt-3 mb-2">Warning! This proof isn't valid ⛔️</p>}
                        </CardBody>


                        <CardFooter className={`${!result ? '' : 'hidden'}`}>
                            {!loading && <Button className="mx-auto" onClick={handleCheck}>Check</Button>}
                            {loading && <Spinner color="default" className="mx-auto" />}
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </main>
    );
}
