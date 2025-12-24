
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const items = [
  { path: '/', label: 'Dashboard', icon: '🏠' },
  { path: '/leads', label: 'Leads List', icon: '👥' },
  { path: '/deals', label: 'Sales Pipeline', icon: '💼' },
  { path: '/contacts', label: 'Contact Details', icon: '📇' },
  { path: '/tasks', label: 'Work Orders', icon: '✅' },
  { path: '/expenses', label: 'Expenses', icon: '💰' },
  { path: '/apps', label: 'Apps', icon: '🧩' },
  { path: '/more', label: 'MORE', icon: '⋯' },
];

const SubNav: React.FC = () => {
  const location = useLocation();

  return (
    <div className="bg-gray-50/50 border-b overflow-x-auto custom-scrollbar sticky top-16 z-30">
      <div className="flex items-center px-4 py-2 gap-2">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                isActive 
                ? 'bg-purple-600 text-white shadow-md shadow-purple-200' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SubNav;
