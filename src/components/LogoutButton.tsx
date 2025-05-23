'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      const supabase = createClient();
      await supabase.auth.signOut();
      router.refresh();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className="bg-amber-700 hover:bg-amber-800 text-white cursor-pointer font-semibold py-2 px-4 rounded transition-colors duration-200 disabled:opacity-70"
    >
      {isLoading ? 'Signing out...' : 'Sign Out'}
    </button>
  );
}