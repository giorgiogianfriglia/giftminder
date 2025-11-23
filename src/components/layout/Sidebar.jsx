import React from 'react';
import { Plus, Settings, Archive, Home, Users } from 'lucide-react';
import PeopleList from './PeopleList';

const Sidebar = ({
    themeStyles,
    openNewPersonModal,
    sidebarList,
    handleSidebarClick,
    handleHomeClick,
    selectedUid,
    currentTheme,
    setShowSettings,
    setShowArchive,
    showPeopleList,
    setShowPeopleList
}) => {
    return (
        <aside className="w-full md:w-80 bg-slate-50 border-r border-gray-200 flex flex-col h-auto md:h-full shadow-xl z-10">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-slate-50">
                <div className="flex items-center gap-2 font-bold text-lg" style={themeStyles.textPrimary}>
                    <img src="/logo.png" className="w-6 h-6 object-contain" alt="logo" /> GiftMinder
                </div>
                <div className='flex items-center gap-2'>
                    <button onClick={handleHomeClick} className="p-1.5 rounded shadow hover:opacity-90 transition mr-2" style={themeStyles.primary}>
                        <Home size={20} />
                    </button>
                    <button onClick={() => setShowSettings(true)} className="p-1.5 rounded shadow hover:opacity-90 transition mr-2" style={themeStyles.primary}>
                        <Settings size={20} />
                    </button>
                    <button onClick={() => setShowArchive(true)} className="p-1.5 rounded shadow hover:opacity-90 transition mr-2" style={themeStyles.primary}>
                        <Archive size={20} />
                    </button>
                    <button onClick={() => setShowPeopleList(!showPeopleList)} className="p-1.5 rounded shadow hover:opacity-90 transition md:hidden" style={themeStyles.primary}>
                        <Users size={20} />
                    </button>
                    <button onClick={openNewPersonModal} style={themeStyles.primary} className="p-1.5 rounded shadow hover:opacity-90 transition">
                        <Plus size={20} />
                    </button>
                </div>
            </div>
            <div className={`${showPeopleList ? 'fixed inset-0 bg-white z-20 h-screen' : 'hidden'} md:block md:static md:h-auto`}>
                <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-slate-50 md:hidden">
                    <div className="flex items-center gap-2 font-bold text-lg" style={themeStyles.textPrimary}>
                        <img src="/logo.png" className="w-6 h-6 object-contain" alt="logo" /> GiftMinder
                    </div>
                    <button onClick={() => setShowPeopleList(false)} className="p-1.5 rounded shadow hover:opacity-90 transition mr-2" style={themeStyles.primary}>
                        <Home size={20} />
                    </button>
                </div>
                <div className="hidden md:flex justify-between px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200 bg-gray-100">
                    <span>Persona</span>
                    <span>Prossimo Evento</span>
                </div>
                <PeopleList 
                    sidebarList={sidebarList}
                    handleSidebarClick={handleSidebarClick}
                    selectedUid={selectedUid}
                    currentTheme={currentTheme}
                    themeStyles={themeStyles}
                />
            </div>
        </aside>
    );
};

export default Sidebar;
