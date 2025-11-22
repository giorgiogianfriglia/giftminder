import React from 'react';
import { Plus, Settings, Archive, Home } from 'lucide-react';
import { AdUnit } from '../ui/Shared';

const Sidebar = ({
    themeStyles,
    openNewPersonModal,
    sidebarList,
    handleSidebarClick,
    handleHomeClick,
    selectedUid,
    currentTheme,
    setShowSettings,
    setShowArchive
}) => {
    return (
        <aside className="w-full md:w-80 bg-slate-50 border-r border-gray-200 flex flex-col h-1/3 md:h-full shadow-xl z-10">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-slate-50">
                <div className="flex items-center gap-2 font-bold text-lg" style={themeStyles.textPrimary}>
                    <img src="/logo.png" className="w-6 h-6 object-contain" alt="logo" /> GiftMinder
                </div>
                <div>
                    <button onClick={handleHomeClick} className="p-1.5 rounded shadow hover:opacity-90 transition mr-2" style={themeStyles.primary}>
                        <Home size={20} />
                    </button>
                    <button onClick={openNewPersonModal} style={themeStyles.primary} className="p-1.5 rounded shadow hover:opacity-90 transition">
                        <Plus size={20} />
                    </button>
                </div>
            </div>
            <div className="flex justify-between px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200 bg-gray-100">
                <span>Persona</span>
                <span>Prossimo Evento</span>
            </div>
            <div className="overflow-y-auto flex-1 p-3 space-y-2">
                {sidebarList.map((item, idx) => (
                    <React.Fragment key={item.id}>
                        {idx === 3 && <AdUnit />}
                        <div
                            onClick={() => handleSidebarClick(item)}
                            className={`p-3 rounded-xl cursor-pointer border transition relative group ${selectedUid === item.uidToSelect ? 'bg-white shadow-md' : 'border-transparent hover:bg-white hover:shadow-sm'}`}
                            style={selectedUid === item.uidToSelect ? { borderColor: currentTheme.primary } : {}}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    {item.foto ? (
                                        <img 
                                            src={item.foto} 
                                            alt={item.nome} 
                                            className="w-10 h-10 rounded-full object-cover border-2"
                                            style={{ borderColor: selectedUid === item.uidToSelect ? currentTheme.primary : 'transparent' }}
                                        />
                                    ) : (
                                        <div 
                                            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border-2"
                                            style={{ borderColor: selectedUid === item.uidToSelect ? currentTheme.primary : 'transparent' }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-bold text-sm" style={selectedUid === item.uidToSelect ? themeStyles.textPrimary : {}}>{item.nome}</p>
                                        <p className="text-[11px] text-gray-500 uppercase mt-0.5">{item.relazione}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-lg block w-fit ml-auto ${item.nextEvent.days < 14 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                        {item.nextEvent.days === 0 ? 'OGGI!' : `-${item.nextEvent.days}gg`}
                                    </span>
                                    <span className="text-[10px] text-gray-400 block mt-1">{item.nextEvent.tipo} {item.occorrenza && `• ${item.occorrenza}`}</span>
                                </div>
                            </div>
                            {selectedUid === item.uidToSelect && <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r" style={{ backgroundColor: currentTheme.primary }}></div>}
                        </div>
                    </React.Fragment>
                ))}
            </div>
            <div className="p-3 border-t border-gray-200 bg-gray-100 flex justify-between">
                <button onClick={() => setShowSettings(true)} className="text-gray-500 hover:text-gray-800 transition p-2">
                    <Settings size={20} />
                </button>
                <button onClick={() => setShowArchive(true)} className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-800 transition">
                    <Archive size={16} /> Archivio
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
