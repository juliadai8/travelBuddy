"use client";
import React from 'react';
import Link from 'next/link';
import '../styles/Header.css';  
import '../components/LoginComponent'
import '../app/page'
import HomePage from '../pages/HomePage';
import '../app/page';

export const Header: React.FC = (props:any) => {
    return (props.Trigger) ?(
        <header className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#3498db', color: '#ffffff', padding: '10px' }}>

            <Link href="/" className="link"> 
            <div className="navbar-start" style={{ fontFamily: 'Arial', fontSize: '18px' }}>Home</div>
            </Link>

            <div className="navbar-end" style={{ display: 'flex' }}>
                <button style={{ marginRight: '10px',fontFamily: 'Arial', fontSize: '18px' }}>Login</button>

                
                    <div style={{ marginRight: '10px', fontFamily: 'Arial', fontSize: '18px' }}>About</div>
               

                <div style={{ marginRight: '10px', fontFamily: 'Arial', fontSize: '18px'}}>Profile</div>
                
            </div>
           {props.children}
        </header>
    ):<header className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#3498db', color: '#ffffff', padding: '10px' }}>

    <Link href="/" className="link"> 
    <div className="navbar-start" style={{ fontFamily: 'Arial', fontSize: '18px' }}>Home</div>
    </Link>

    <div className="navbar-end" style={{ display: 'flex' }}>
        <button onClick={() => props.setTrigger(true)} style={{ marginRight: '10px',fontFamily: 'Arial', fontSize: '18px' }}>Login</button>

        
            <div style={{ marginRight: '10px', fontFamily: 'Arial', fontSize: '18px' }}>About</div>
       

        <div style={{ marginRight: '10px', fontFamily: 'Arial', fontSize: '18px'}}>Profile</div>
        
    </div>
   {props.children}
</header>;
}

export default Header;
     

