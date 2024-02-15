"use client";
import React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
    return (
        <header className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

            <Link href="/"> 
            <div className="navbar-start">LOGO</div>
            </Link>

            <div className="navbar-end" style={{ display: 'flex' }}>
                <div style={{ marginRight: '10px' }}>Login</div>

                <Link href="/about">
                    <div style={{ marginRight: '10px' }}>About</div>
                </Link>

                <div style={{ marginRight: '10px' }}>Trips</div>
                
            </div>
        </header>
    );
}

export default Header;
     