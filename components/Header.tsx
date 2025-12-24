
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">ameerapp</span>
        </div>
        
        <div className="relative hidden md:block">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-64 bg-gray-50 border border-gray-200 rounded-full py-2 px-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
          />
          <span className="absolute left-4 top-2.5 text-gray-400">🔍</span>
          <span className="absolute right-4 top-2.5 text-gray-400 text-xs">⌘K</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 pr-4 border-r">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
            🔔 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">📊</button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">📁</button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">🛒</button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">💬</button>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden lg:block text-right">
            <p className="text-sm font-semibold text-gray-900 leading-none">John Dev</p>
            <p className="text-xs text-gray-500 mt-1">Admin Account</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-100 border-2 border-white shadow-sm flex items-center justify-center text-purple-600 font-bold overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="avatar" />
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/20">
            Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
