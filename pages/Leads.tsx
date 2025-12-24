
import React, { useState } from 'react';
import { LeadStatus, Lead } from '../types';
import { getLeadScoreExplanation, generateEmailDraft } from '../services/geminiService';

interface LeadsProps {
  leads: Lead[];
  onAddLead: (lead: Lead) => void;
}

const Leads: React.FC<LeadsProps> = ({ leads, onAddLead }) => {
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [emailDraft, setEmailDraft] = useState<string>('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Lead Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    value: '',
    status: LeadStatus.WARM,
    notes: ''
  });

  const selectedLead = leads.find(l => l.id === selectedLeadId);

  const handleLeadAction = async (leadId: string, action: 'analyze' | 'email') => {
    setSelectedLeadId(leadId);
    setLoadingAI(true);
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    try {
      if (action === 'analyze') {
        const res = await getLeadScoreExplanation(lead);
        setAiAnalysis(res || '');
        setEmailDraft('');
      } else {
        const res = await generateEmailDraft(lead.name, lead.notes);
        setEmailDraft(res || '');
        setAiAnalysis('');
      }
    } catch (err) {
      console.error(err);
      setAiAnalysis('AI service unavailable at the moment.');
    } finally {
      setLoadingAI(false);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: Lead = {
      id: `l${Date.now()}`,
      name: formData.name,
      company: formData.company,
      email: formData.email,
      value: Number(formData.value) || 0,
      status: formData.status,
      lastContacted: new Date().toISOString().split('T')[0],
      notes: formData.notes
    };
    onAddLead(newLead);
    setIsModalOpen(false);
    setFormData({ name: '', company: '', email: '', value: '', status: LeadStatus.WARM, notes: '' });
  };

  const exportLeadsToCSV = () => {
    if (leads.length === 0) {
      alert("No leads available to export.");
      return;
    }

    const headers = ["ID", "Name", "Email", "Company", "Status", "Value ($)", "Last Contacted", "Notes"];
    const rows = leads.map(l => [
      l.id,
      l.name,
      l.email,
      l.company,
      l.status,
      l.value,
      l.lastContacted,
      l.notes.replace(/,/g, ' ') // Simple escape for commas in notes
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `ameerapp_leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Active Opportunities</h1>
          <p className="text-gray-500 font-medium">Smart scoring identifies your highest potential leads.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={exportLeadsToCSV}
            className="flex-1 md:flex-none bg-white border border-gray-200 text-gray-600 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-50 shadow-sm transition-all active:scale-95"
          >
            Export Report
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none bg-purple-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-purple-700 shadow-xl shadow-purple-200 transition-all active:scale-95"
          >
            Add New Lead
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 space-y-4">
          {leads.map((lead) => (
            <div 
              key={lead.id} 
              className={`bg-white p-6 rounded-[2rem] border-2 transition-all cursor-pointer ${
                selectedLeadId === lead.id 
                ? 'border-purple-500 shadow-xl shadow-purple-500/5 ring-4 ring-purple-50' 
                : 'border-white shadow-sm hover:border-purple-200'
              }`}
              onClick={() => setSelectedLeadId(lead.id)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black ${
                    lead.status === LeadStatus.HOT ? 'bg-pink-100 text-pink-600' : 
                    lead.status === LeadStatus.WARM ? 'bg-orange-100 text-orange-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900">{lead.name}</h3>
                    <p className="text-sm font-semibold text-gray-400">{lead.company} • {lead.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                       <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter ${
                        lead.status === LeadStatus.HOT ? 'bg-pink-100 text-pink-600' : 
                        lead.status === LeadStatus.WARM ? 'bg-orange-100 text-orange-600' : 'bg-purple-100 text-purple-600'
                      }`}>
                        {lead.status} SCORE
                      </span>
                      <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Last contact {lead.lastContacted}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 md:text-right">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Potential Value</p>
                    <p className="text-2xl font-black text-gray-900">${lead.value.toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleLeadAction(lead.id, 'analyze'); }}
                      className="text-[10px] font-black uppercase tracking-tighter px-3 py-2 rounded-lg bg-gray-50 text-gray-500 hover:bg-purple-600 hover:text-white transition-all shadow-sm"
                    >
                      Analyze
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleLeadAction(lead.id, 'email'); }}
                      className="text-[10px] font-black uppercase tracking-tighter px-3 py-2 rounded-lg bg-gray-50 text-gray-500 hover:bg-purple-600 hover:text-white transition-all shadow-sm"
                    >
                      Email AI
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {leads.length === 0 && (
            <div className="bg-white p-20 text-center rounded-[3rem] border-2 border-dashed border-gray-100">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📁</div>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Your lead pipeline is currently empty.</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-6 text-purple-600 font-black uppercase tracking-widest text-[10px] hover:underline"
              >
                + Add First Lead
              </button>
            </div>
          )}
        </div>

        {/* AI Insight Side Panel */}
        <div className="xl:col-span-4">
          <div className="bg-[#120c4e] rounded-[3rem] p-8 sticky top-48 text-white shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
            <h2 className="text-xl font-black flex items-center gap-3 mb-8">
              <span className="text-2xl">✨</span> AI Workspace
            </h2>
            
            {!selectedLeadId ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 px-6">
                 <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-4xl mb-6">🎯</div>
                 <h4 className="font-bold text-lg mb-2">Ready to Boost Sales?</h4>
                 <p className="text-sm font-medium text-purple-200/60 leading-relaxed">Select a lead from the list to trigger smart analysis and automated email drafting.</p>
              </div>
            ) : (
              <div className="flex-1 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                {loadingAI ? (
                  <div className="flex flex-col items-center justify-center py-20">
                     <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
                     <p className="mt-6 text-sm font-bold text-purple-200 animate-pulse">Consulting Gemini Engines...</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                      <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold">{selectedLead?.name.charAt(0)}</div>
                      <div>
                        <p className="font-bold text-sm leading-none">{selectedLead?.name}</p>
                        <p className="text-[10px] text-purple-400 font-bold uppercase mt-1 tracking-widest">{selectedLead?.company}</p>
                      </div>
                    </div>
                    {aiAnalysis && (
                      <div className="space-y-4">
                        <h3 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em]">Priority Audit</h3>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-3xl text-sm leading-relaxed text-purple-100 italic">
                          "{aiAnalysis}"
                        </div>
                      </div>
                    )}
                    {emailDraft && (
                      <div className="space-y-4">
                        <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">AI Outreach Template</h3>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-3xl text-xs leading-loose font-mono text-blue-100 whitespace-pre-line max-h-64 overflow-y-auto custom-scrollbar">
                          {emailDraft}
                        </div>
                        <button 
                          onClick={() => {
                             navigator.clipboard.writeText(emailDraft);
                             alert('Copied to clipboard!');
                          }}
                          className="w-full bg-white text-[#120c4e] py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-purple-50 transition-all shadow-xl active:scale-95"
                        >
                          Copy Draft
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
            
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Add Lead Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#120c4e]/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-lg p-10 shadow-2xl animate-in zoom-in-95 duration-200 border border-white relative overflow-hidden">
            <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">Generate New Lead</h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <input required type="text" placeholder="Contact Name" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-500/10" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <input required type="text" placeholder="Company Name" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-500/10" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
              <input required type="email" placeholder="Email Address" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-500/10" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input required type="number" placeholder="Potential Value ($)" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-500/10" value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} />
                <select className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-500/10 font-bold" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as LeadStatus})}>
                  <option value={LeadStatus.HOT}>HOT</option>
                  <option value={LeadStatus.WARM}>WARM</option>
                  <option value={LeadStatus.COLD}>COLD</option>
                </select>
              </div>
              <textarea rows={3} placeholder="Strategic Notes..." className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-500/10" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-colors uppercase tracking-widest text-xs">Cancel</button>
                <button type="submit" className="flex-1 py-4 bg-purple-600 text-white rounded-2xl font-black hover:bg-purple-700 shadow-2xl shadow-purple-200 transition-all uppercase tracking-widest text-xs">Create Lead</button>
              </div>
            </form>
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
