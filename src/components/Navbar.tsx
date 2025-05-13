'use client';  // This marks it as a client component

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  return (
    <div className='p-16 w-full'>
      <div>
        <h1 className="text-[64px]">Ye Olde Gamba Shack</h1>
      </div>
    </div>
  )
}