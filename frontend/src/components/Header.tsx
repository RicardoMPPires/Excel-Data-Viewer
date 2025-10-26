'use client';

import { Leaf } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-green-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Leaf className="w-8 h-8 text-white" />
          <h1 className="text-2xl font-bold">Excel Data Viewer</h1>
        </div>
        <nav>{/* You can add future nav links here */}</nav>
      </div>
    </header>
  );
};
