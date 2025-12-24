
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/leads', label: 'Leads', icon: '👤' },
  { path: '/deals', label: 'Deals', icon: '💼' },
  { path: '/contacts', label: 'Contacts', icon: '📇' },
  { path: '/tasks', label: 'Tasks', icon: '✅' },
  { path: '/insights', label: 'AI Insights', icon: '✨' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r h-screen sticky top-0 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <span>🚀</span> SmartCRM
        </h1>
      </div>
      <nav className="flex-1 px-4 py-2 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">John Developer</p>
            <p className="text-xs text-gray-500 truncate">Freelancer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
