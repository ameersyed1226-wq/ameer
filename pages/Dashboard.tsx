
import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { getQuickInsights } from '../services/geminiService';
import { Lead, Deal, Task } from '../types';

interface DashboardProps {
  leads: Lead[];
  deals: Deal[];
  tasks: Task[];
}

const Dashboard: React.FC<DashboardProps> = ({ leads, deals, tasks }) => {
  const [insights, setInsights] = useState<string>('');
  const [loadingInsights, setLoadingInsights] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const data = await getQuickInsights(leads, deals);
        setInsights(data || 'No insights available yet.');
      } catch (err) {
        setInsights('Unable to load AI insights.');
      } finally {
        setLoadingInsights(false);
      }
    };
    fetchInsights();
  }, [leads, deals]);

  const barData = [
    { name: 'Jul', income: 45, expense: 30 },
    { name: 'Aug', income: 82, expense: 45 },
    { name: 'Sep', income: 58, expense: 25 },
    { name: 'Oct', income: 72, expense: 35 },
    { name: 'Nov', income: 60, expense: 40 },
    { name: 'Dec', income: 75, expense: 50 },
  ];

  const profitChannels = [
    { name: 'Direct', value: 40, color: '#06b6d4' },
    { name: 'Sponsored', value: 24, color: '#f97316' },
    { name: 'Affiliate', value: 16, color: '#8b5cf6' },
    { name: 'Organic', value: 20, color: '#ec4899' },
  ];

  const totalPipelineValue = deals.reduce((acc, d) => acc + d.value, 0);

  return (
    <div className="space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Pipeline Value', value: `$${(totalPipelineValue/1000).toFixed(2)}k`, trend: '+12%', color: 'bg-green-100 text-green-600', icon: '💰' },
          { label: 'Total Leads', value: leads.length.toString(), trend: `+${leads.length}`, color: 'bg-orange-100 text-orange-600', icon: '👤' },
          { label: 'Deals Count', value: deals.length.toString(), trend: '+37%', color: 'bg-purple-100 text-purple-600', icon: '💼' },
          { label: 'Tasks Pending', value: tasks.filter(t => !t.completed).length.toString(), trend: '+2%', color: 'bg-indigo-100 text-indigo-600', icon: '✅' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-white/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
            <div className="text-sm font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Financial Performance</h3>
            </div>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                  />
                  <Bar dataKey="income" fill="#7c3aed" radius={[4, 4, 0, 0]} barSize={12} />
                  <Bar dataKey="expense" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-[3rem] shadow-xl text-white relative overflow-hidden group">
             <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-sm font-black mb-6 uppercase tracking-[0.2em] flex items-center gap-3">
                  <span className="text-2xl">✨</span> AI Intelligence Insights
                </h3>
                <div className="flex-1 space-y-6">
                  <div className="p-5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                     <p className="text-[10px] uppercase font-black text-purple-200 mb-2 tracking-widest">Operational Health</p>
                     <div className="flex items-center justify-between">
                        <span className="text-3xl font-black">88.5%</span>
                        <span className="text-xs bg-green-500 text-white px-3 py-1 rounded-full font-black uppercase tracking-tighter">Optimized</span>
                     </div>
                  </div>
                  <div className="text-sm leading-relaxed text-indigo-50 font-medium italic bg-black/5 p-4 rounded-2xl border border-white/5">
                    {loadingInsights ? "Analyzing pipeline..." : insights}
                  </div>
                </div>
             </div>
             <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                <span className="text-[200px]">🌌</span>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#120c4e] p-8 rounded-[3rem] shadow-2xl text-white relative overflow-hidden">
             <h3 className="text-lg font-black uppercase tracking-widest text-[10px] text-purple-400 mb-6">Channel Distribution</h3>
             <div className="relative h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={profitChannels}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={90}
                      paddingAngle={10}
                      dataKey="value"
                    >
                      {profitChannels.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Efficiency</p>
                   <p className="text-3xl font-black">+42%</p>
                </div>
             </div>
             <div className="space-y-4 mt-8">
                {profitChannels.map((c, i) => (
                   <div key={i} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                         <div className="w-2.5 h-2.5 rounded-full shadow-lg" style={{ backgroundColor: c.color }}></div>
                         <span className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors uppercase tracking-widest">{c.name}</span>
                      </div>
                      <span className="text-xs font-black text-white">{c.value}%</span>
                   </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
