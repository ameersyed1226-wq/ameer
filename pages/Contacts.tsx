
import React, { useState } from 'react';
import { Contact } from '../types';

interface ContactsProps {
  contacts: Contact[];
  onAddContact: (contact: Contact) => void;
  onDeleteContact: (id: string) => void;
}

const Contacts: React.FC<ContactsProps> = ({ contacts, onAddContact, onDeleteContact }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Contact Form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    jobTitle: '',
    company: '',
    companyDescription: '',
    recentInteraction: ''
  });

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newContact: Contact = {
      ...formData,
      id: `c${Date.now()}`,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`
    };
    onAddContact(newContact);
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '', role: '', jobTitle: '', company: '', companyDescription: '', recentInteraction: '' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 h-full">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Intelligence Directory</h1>
          <p className="text-gray-500 font-medium">Detailed profiles and interaction history for all connections.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search people, job titles..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl py-2.5 px-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm w-full md:w-64"
            />
            <span className="absolute left-3.5 top-3 text-gray-400">🔍</span>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-purple-700 shadow-xl shadow-purple-200 transition-all flex items-center gap-2"
          >
            <span>+</span> Add Member
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Contact List */}
        <div className={`xl:col-span-7 bg-white rounded-[2.5rem] shadow-sm border border-white overflow-hidden transition-all duration-300`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Individual</th>
                  <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Job Title / Context</th>
                  <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Role</th>
                  <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredContacts.map((contact) => (
                  <tr 
                    key={contact.id} 
                    onClick={() => setSelectedContact(contact)}
                    className={`hover:bg-gray-50 transition-colors group cursor-pointer ${selectedContact?.id === contact.id ? 'bg-purple-50/50' : ''}`}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-purple-100 border-2 border-white shadow-sm overflow-hidden flex-shrink-0">
                          <img src={contact.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${contact.name}`} alt="" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{contact.name}</p>
                          <p className="text-xs text-gray-400">{contact.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold text-gray-800 leading-tight">{contact.jobTitle}</p>
                      <p className="text-[10px] text-purple-600 font-black uppercase tracking-tighter">{contact.company}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-[9px] font-black uppercase tracking-widest">
                        {contact.role}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-purple-600 transition-colors">✉️</button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onDeleteContact(contact.id); if(selectedContact?.id === contact.id) setSelectedContact(null); }}
                          className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredContacts.length === 0 && (
            <div className="py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
              No contacts discovered
            </div>
          )}
        </div>

        {/* Detailed Info Panel */}
        <div className="xl:col-span-5 h-full">
          <div className="bg-[#120c4e] rounded-[3rem] p-8 text-white shadow-2xl overflow-hidden sticky top-48 min-h-[600px] flex flex-col">
            {!selectedContact ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40 px-10">
                <div className="text-5xl mb-6">🔍</div>
                <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Profile View</h3>
                <p className="text-sm font-medium leading-relaxed">Select a connection to view comprehensive interaction logs and company diagnostics.</p>
              </div>
            ) : (
              <div className="animate-in slide-in-from-right-4 duration-300 flex-1 flex flex-col">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-24 h-24 rounded-[2rem] bg-white/10 border-2 border-white/20 p-1 flex-shrink-0 overflow-hidden">
                    <img src={selectedContact.avatarUrl} className="w-full h-full object-cover rounded-[1.8rem]" alt="" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black leading-tight">{selectedContact.name}</h2>
                    <p className="text-purple-400 font-bold uppercase tracking-[0.2em] text-xs mt-1">{selectedContact.jobTitle} @ {selectedContact.company}</p>
                    <div className="flex gap-4 mt-4">
                      <a href={`tel:${selectedContact.phone}`} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-xl">📞</a>
                      <a href={`mailto:${selectedContact.email}`} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-xl">✉️</a>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 flex-1">
                  <div>
                    <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">Enterprise Diagnostics</h4>
                    <p className="text-sm leading-relaxed text-indigo-100 font-medium">
                      {selectedContact.companyDescription || 'No company description available for this profile.'}
                    </p>
                  </div>

                  <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] relative overflow-hidden group">
                    <h4 className="text-[10px] font-black text-pink-400 uppercase tracking-widest mb-3">Recent Interaction Summary</h4>
                    <p className="text-xs leading-loose text-pink-50/80 italic relative z-10">
                      "{selectedContact.recentInteraction || 'System waiting for initial contact logging.'}"
                    </p>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl">
                      <p className="text-[10px] font-black text-gray-500 uppercase">Strategic Role</p>
                      <p className="text-sm font-bold mt-1">{selectedContact.role}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl">
                      <p className="text-[10px] font-black text-gray-500 uppercase">Phone Link</p>
                      <p className="text-sm font-bold mt-1">{selectedContact.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex gap-4">
                  <button className="flex-1 bg-white text-[#120c4e] py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-purple-50 transition-all shadow-xl">
                    Log Activity
                  </button>
                  <button className="px-6 bg-white/10 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
                    ...
                  </button>
                </div>
              </div>
            )}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#120c4e]/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl p-10 shadow-2xl animate-in zoom-in-95 duration-200 border border-white overflow-hidden relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">Onboard New Connection</h2>
            <form onSubmit={handleAddSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Full Identity</label>
                  <input required type="text" placeholder="e.g. Elena Fisher" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-500/10" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Digital Mail</label>
                  <input required type="email" placeholder="email@provider.com" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-500/10" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Organization</label>
                  <input required type="text" placeholder="Entity Name" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-500/10" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Job Title</label>
                  <input required type="text" placeholder="e.g. Chief Financial Officer" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-500/10" value={formData.jobTitle} onChange={e => setFormData({...formData, jobTitle: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Strategic Role (Internal)</label>
                  <input required type="text" placeholder="e.g. Stakeholder" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-500/10" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Phone Link</label>
                  <input type="text" placeholder="+1 555-000-0000" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-500/10" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Enterprise Diagnostic (Description)</label>
                <textarea rows={2} placeholder="Describe the company's core mission..." className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-500/10" value={formData.companyDescription} onChange={e => setFormData({...formData, companyDescription: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Initial Interaction Log</label>
                <textarea rows={2} placeholder="Summary of your first discovery call..." className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-500/10" value={formData.recentInteraction} onChange={e => setFormData({...formData, recentInteraction: e.target.value})} />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-colors uppercase tracking-widest text-xs">Abort</button>
                <button type="submit" className="flex-1 py-4 bg-purple-600 text-white rounded-2xl font-black hover:bg-purple-700 shadow-2xl shadow-purple-200 transition-all uppercase tracking-widest text-xs">Execute Onboarding</button>
              </div>
            </form>
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
