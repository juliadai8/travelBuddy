// Navbar.tsx
"use client";
import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about">
            About Us
          </Link>
        </li>
        <li>
          <Link href="/contact">
            Your Trips
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
