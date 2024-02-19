"use client";
import React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
    return (
        <header className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#3498db', color: '#ffffff', padding: '10px' }}>

            <Link href="/"> 
            <div className="navbar-start" style={{ fontFamily: 'Arial', fontSize: '18px' }}>
                LOGO</div>
            </Link>

            <div className="navbar-end" style={{ display: 'flex' }}>
                <div style={{ marginRight: '10px',fontFamily: 'Arial', fontSize: '18px' }}>Login</div>

                <Link href="/about">
                    <div style={{ marginRight: '10px', fontFamily: 'Arial', fontSize: '18px' }}>About</div>
                </Link>

                <div style={{ marginRight: '10px', fontFamily: 'Arial', fontSize: '18px'}}>Trips</div>
                
            </div>
        </header>
    );
}

export default Header;
     

