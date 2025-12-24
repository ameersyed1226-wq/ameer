
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SubNav from './components/SubNav';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Deals from './pages/Deals';
import Contacts from './pages/Contacts';
import AIChatAssistant from './components/AIChatAssistant';
import { mockLeads as initialLeads, mockDeals as initialDeals, mockTasks as initialTasks, mockContacts as initialContacts } from './data/mockData';
import { Lead, Deal, Task, Contact, DealStage } from './types';

const App: React.FC = () => {
  const [isAuthenticated] = useState(true);
  
  // App State - This is the "Source of Truth"
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Global Actions
  const addLead = (lead: Lead) => {
    setLeads(prev => [lead, ...prev]);
  };

  const addContact = (contact: Contact) => {
    setContacts(prev => [contact, ...prev]);
  };

  const deleteContact = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const updateDealStage = (id: string, stage: DealStage) => {
    setDeals(prev => prev.map(d => d.id === id ? { ...d, stage } : d));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-12 rounded-3xl shadow-2xl border border-white max-w-md w-full text-center">
          <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6">A</div>
          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">ameerapp Dashboard</h1>
          <p className="text-gray-500 mb-10 font-medium">Elevate your sales productivity with AI.</p>
          <button className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold hover:bg-purple-700 transition-all shadow-xl shadow-purple-200">
            Secure Member Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <SubNav />
        <main className="flex-1 p-6 lg:p-10 max-w-[1600px] mx-auto w-full">
          <Routes>
            <Route path="/" element={<Dashboard leads={leads} deals={deals} tasks={tasks} />} />
            <Route path="/leads" element={<Leads leads={leads} onAddLead={addLead} />} />
            <Route path="/deals" element={<Deals deals={deals} leads={leads} onUpdateDeal={updateDealStage} />} />
            <Route 
              path="/contacts" 
              element={
                <Contacts 
                  contacts={contacts} 
                  onAddContact={addContact} 
                  onDeleteContact={deleteContact} 
                />
              } 
            />
            <Route path="/tasks" element={<div className="p-20 text-center"><h1 className="text-3xl font-bold text-gray-900 mb-2">Work Orders</h1><p className="text-gray-500">Automation scripts are running tasks in background.</p></div>} />
            <Route path="/expenses" element={<div className="p-20 text-center"><h1 className="text-3xl font-bold text-gray-900 mb-2">Finance</h1><p className="text-gray-500">Revenue reconciliation in progress.</p></div>} />
          </Routes>
        </main>
        
        {/* Universal AI Assistant */}
        <AIChatAssistant context={{ leads, deals, tasks }} />
      </div>
    </Router>
  );
};

export default App;
