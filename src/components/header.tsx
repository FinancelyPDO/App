"use client"
import React, { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-96 h-20 left-[92px] top-[30px] absolute">
            <div className="w-20 h-20 left-0 top-0 absolute">
                <div className="w-20 h-20 left-0 top-0 absolute bg-blue-800 rounded-full" />
                <div className="w-8 h-10 left-[24px] top-[19px] absolute">
                </div>
            </div>
            <div className="w-80 h-6 left-[230px] top-[28px] absolute">
                <button className="left-0 top-0 absolute text-black text-xl font-medium font-['DM Sans']">About</button>
                <button className="left-[113px] top-0 absolute text-black text-xl font-medium font-['DM Sans']">FAQs</button>
                <button className="left-[214px] w-40 top-0 absolute text-black text-xl font-medium font-['DM Sans']">Quick Support</button>
            </div>
            <div className="w-52 h-20 left-[1044px] top-[1px] absolute bg-blue-800 rounded-lg">
                <button className="w-52 h-20 left-0 top-0 absolute text-center text-white text-2xl font-bold font-['DM Sans']">Get Started</button>
            </div>
            <div className="left-[923px] top-[26px] absolute text-blue-800 text-2xl font-bold font-['DM Sans']">Login</div>
        </header>
    );
}

export default Header;