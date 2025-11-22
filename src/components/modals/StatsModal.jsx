import React from 'react';
import { Calculator } from 'lucide-react';

export const StatsModal = ({ onClose, activePerson, getStatsBreakdown, currentTheme }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-sm text-center overflow-hidden shadow-2xl">
            <div className="p-6 text-white" style={{ backgroundColor: currentTheme.primary }}>
                <Calculator size={40} className="mx-auto mb-2 opacity-80" />
                <h3 className="text-xl font-bold">Riepilogo Spese</h3>
                <p className="opacity-80">Per {activePerson.nome}</p>
            </div>
            <div className="p-6">
                <div className="space-y-3 mb-6 max-h-40 overflow-y-auto custom-scroll">
                    {getStatsBreakdown().breakdown.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm border-b pb-2 border-gray-100">
                            <span className="text-gray-600 font-medium">{item.type}</span>
                            <span className="font-bold text-gray-800">€{item.amount}</span>
                        </div>
                    ))}
                </div>
                <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Totale</p>
                    <div className="text-4xl font-bold tracking-tighter" style={{ color: currentTheme.primary }}>€{getStatsBreakdown().total}</div>
                </div>
                <button onClick={onClose} className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl">Chiudi</button>
            </div>
        </div>
    </div>
);
