import React, { useState, useRef, useEffect } from 'react';
import { Plus, Settings, Archive, Home, Users, Menu } from 'lucide-react';
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
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    const handleMenuClick = (action) => {
        action();
        setMenuOpen(false);
    }

    return (
        <aside className="w-full md:w-80 bg-slate-50 border-r border-gray-200 flex flex-col h-auto md:h-full shadow-xl z-20">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-slate-50">
                <div className="flex items-center gap-2 font-bold text-lg" style={themeStyles.textPrimary}>
                    <img src="/logo.png" className="w-6 h-6 object-contain" alt="logo" /> GiftMinder
                </div>
                <div className='flex items-center gap-2'>
                    <button onClick={handleHomeClick} className="p-1.5 rounded shadow hover:opacity-90 transition" style={themeStyles.primary}>
                        <Home size={20} />
                    </button>
                    <div className="relative" ref={menuRef}>
                        <button onClick={() => setMenuOpen(!menuOpen)} className="p-1.5 rounded shadow hover:opacity-90 transition" style={themeStyles.primary}>
                            <Menu size={20} />
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border">
                                <a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick(openNewPersonModal) }} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <Plus size={16} /> Aggiungi Persona
                                </a>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick(() => setShowPeopleList(!showPeopleList)) }} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 md:hidden">
                                    <Users size={16} /> Persone
                                </a>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick(() => setShowArchive(true)) }} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <Archive size={16} /> Archivio
                                </a>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick(() => setShowSettings(true)) }} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <Settings size={16} /> Opzioni
                                </a>
                            </div>
                        )}
                    </div>
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
