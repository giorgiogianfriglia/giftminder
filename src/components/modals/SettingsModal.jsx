import React from 'react';
import { X, LogOut } from 'lucide-react';
import { THEMES } from '../../utils/constants';

export const SettingsModal = ({ currentTheme, setCurrentTheme, onClose, handleLogout }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4 fade-in">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl">Opzioni</h3>
                <button onClick={onClose}><X /></button>
            </div>
            <div className="mb-6">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-3">Tema Colore</label>
                <div className="grid grid-cols-2 gap-3">
                    {Object.values(THEMES).map(theme => (
                        <button
                            key={theme.id}
                            onClick={() => setCurrentTheme(theme)}
                            className={`p-3 rounded-lg border-2 transition flex items-center gap-2 ${currentTheme.id === theme.id ? 'border-current' : 'border-transparent bg-gray-50'}`}
                            style={{ borderColor: currentTheme.id === theme.id ? theme.primary : 'transparent' }}
                        >
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                            <span className="text-sm font-bold">{theme.name}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="border-t pt-4">
                <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 font-bold flex items-center gap-3 transition"
                >
                    <LogOut size={18} />
                    <span>Esci</span>
                </button>
            </div>
        </div>
    </div>
);
