
import React from 'react';
import { DealStage, Deal, Lead } from '../types';

interface DealsProps {
  deals: Deal[];
  leads: Lead[];
  onUpdateDeal: (id: string, stage: DealStage) => void;
}

const STAGES = [
  { id: DealStage.PROSPECTING, label: 'Prospecting' },
  { id: DealStage.QUALIFICATION, label: 'Qualification' },
  { id: DealStage.PROPOSAL, label: 'Proposal' },
  { id: DealStage.NEGOTIATION, label: 'Negotiation' },
  { id: DealStage.CLOSED_WON, label: 'Closed Won' },
];

const Deals: React.FC<DealsProps> = ({ deals, leads, onUpdateDeal }) => {
  
  const moveDeal = (id: string, currentStage: DealStage) => {
    const currentIndex = STAGES.findIndex(s => s.id === currentStage);
    const nextIndex = (currentIndex + 1) % STAGES.length;
    onUpdateDeal(id, STAGES[nextIndex].id);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Sales Pipeline</h1>
          <p className="text-gray-500 font-medium">Click on a deal card to advance its stage.</p>
        </div>
        <div className="flex gap-2 text-sm font-semibold text-gray-500">
           <span className="flex items-center gap-2">Total Pipeline: <span className="text-gray-900 font-bold">${deals.reduce((a, b) => a + b.value, 0).toLocaleString()}</span></span>
        </div>
      </header>

      <div className="flex-1 overflow-x-auto pb-6">
        <div className="flex gap-6 min-w-max h-full">
          {STAGES.map((stage) => {
            const stageDeals = deals.filter(d => d.stage === stage.id);
            const stageValue = stageDeals.reduce((a, b) => a + b.value, 0);

            return (
              <div key={stage.id} className="w-80 bg-gray-100/50 rounded-[2rem] p-5 flex flex-col border border-gray-200/50">
                <div className="flex justify-between items-center mb-6 px-1">
                  <h3 className="font-black text-gray-700 flex items-center gap-2 uppercase tracking-widest text-[10px]">
                    {stage.label}
                    <span className="bg-white border border-gray-200 text-gray-400 text-[10px] px-2 py-0.5 rounded-full">
                      {stageDeals.length}
                    </span>
                  </h3>
                  <p className="text-xs font-black text-purple-600">${stageValue.toLocaleString()}</p>
                </div>

                <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-1">
                  {stageDeals.map((deal) => {
                    const lead = leads.find(l => l.id === deal.leadId);
                    return (
                      <div 
                        key={deal.id} 
                        onClick={() => moveDeal(deal.id, deal.stage)}
                        className="bg-white p-5 rounded-3xl border border-white shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer group relative overflow-hidden"
                      >
                        <h4 className="font-black text-gray-900 group-hover:text-purple-600 transition-colors">{deal.title}</h4>
                        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{lead?.company}</p>
                        <div className="mt-6 flex justify-between items-end">
                          <div>
                            <span className="text-lg font-black text-gray-900">${deal.value.toLocaleString()}</span>
                            <p className="text-[9px] text-gray-300 font-black uppercase mt-1">Due {deal.expectedCloseDate}</p>
                          </div>
                          <div className="w-8 h-8 rounded-xl border-2 border-white bg-purple-100 flex items-center justify-center text-[10px] font-black text-purple-600 shadow-sm">
                             {lead?.name.charAt(0)}
                          </div>
                        </div>
                        <div className="absolute top-0 right-0 h-1 w-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    );
                  })}
                  {stageDeals.length === 0 && (
                    <div className="h-32 border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center text-[10px] text-gray-300 font-black uppercase tracking-widest">
                      Empty Segment
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Deals;
