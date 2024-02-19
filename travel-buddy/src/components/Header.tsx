"use client";
import React from 'react';
import Link from 'next/link';
import '../styles/Header.css';  

export const Header: React.FC = () => {
    return (
        <header className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#3498db', color: '#ffffff', padding: '10px' }}>

            <Link href="/" className="link"> 
            <div className="navbar-start" style={{ fontFamily: 'Arial', fontSize: '18px' }}>Home</div>
            </Link>

            <div className="navbar-end" style={{ display: 'flex' }}>
                <div style={{ marginRight: '10px',fontFamily: 'Arial', fontSize: '18px' }}>Login</div>

                
                    <div style={{ marginRight: '10px', fontFamily: 'Arial', fontSize: '18px' }}>About</div>
               

                <div style={{ marginRight: '10px', fontFamily: 'Arial', fontSize: '18px'}}>Profile</div>
                
            </div>
        </header>
    );
}

export default Header;
     

