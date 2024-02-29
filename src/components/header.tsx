'use client';

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="flex justify-center items-center z-10 py-10">
            <div className="flex justify-between items-center w-full pl-4">
                <Link href="/" legacyBehavior>
                    <a className="flex items-center">
                        <div className="mr-5 relative">
                            <Image
                                src="/images/icon/menu.svg"
                                alt="Logo"
                                width={48}
                                height={48}
                            />
                        </div>
                        <span className="text-2xl font-bold text-gray-800 hidden sm:block">
                            <span className="font-normal text-2xl text-white">Prove</span>
                            <span className="font-normal text-2xl text-white">hance</span>
                        </span>
                    </a>
                </Link>
                <div className="flex flex-col items-center sm:items-start">
                    <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
                        <Image
                            src="/images/icon/menu.svg"
                            alt="Menu"
                            width={25}
                            height={25}
                        />
                    </button>
                    <nav className={`${isOpen ? 'block' : 'hidden'} sm:block flex flex-col`}>
                        <Link href="/" className="text-white hover:text-tiffany_blue ml-4 px-6 py-2 text-xl transition duration-300">
                            Products
                        </Link>
                        <Link href="/" className="text-white hover:text-tiffany_blue ml-4 px-6 py-2 text-xl transition duration-300">
                            Ressources
                        </Link>
                        <Link href="/" className="text-white hover:text-tiffany_blue ml-4 px-6 py-2 text-xl transition duration-300">
                            Contact
                        </Link>
                        <Link href="/" className={`${isOpen ? 'block' : 'hidden'} sm:hidden flex flex-col  text-tiffany_blue text-2xl mr-4 hover:text-white ml-4 px-6 py-2 rounded transition duration-300 border-tiffany_blue hover:bg-tiffany_blue box-border`} style={{ boxShadow: 'inset 0 0 0 2px currentColor' }}>
                            Enroll Now
                        </Link>
                    </nav>
                </div>
                <Link href="/" className={`hidden sm:block flex flex-col  text-tiffany_blue text-2xl mr-4 hover:text-white ml-4 px-6 py-2 rounded transition duration-300 border-tiffany_blue hover:bg-tiffany_blue box-border`} style={{ boxShadow: 'inset 0 0 0 2px currentColor' }}>
                    Enroll Now
                </Link>
            </div>
        </header>
    );
}


export default Header;