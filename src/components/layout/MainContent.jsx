import React, { useState } from 'react';
import { Gift, Calendar, Plus, Trash, Pencil, Lightbulb, RefreshCw, Search, Calculator, Link as LinkIcon, ExternalLink, ShoppingBag, Euro, Clock, Users } from 'lucide-react';
import { AdUnit, GiftImage } from '../ui/Shared';
import HomeScreen from './HomeScreen';
import { truncateText } from '../../utils/helpers';

const MainContent = (props) => {
    const {
        activePerson,
        openEditPersonModal,
        themeStyles,
        headerInfo,
        handleSelectUid,
        currentTheme,
        handleArchive,
        openNewGiftModal,
        setShowModalStats,
        updateSuggestions,
        activeTab,
        suggerimenti,
        handleTabChange,
        setShowAddEventModal,
        searchTerm,
        setSearchTerm,
        getFilteredGifts,
        calcolaOccorrenza,
        openEditGiftModal,
        handleDeleteSingleGift
    } = props;

    const [showParticipantsTooltip, setShowParticipantsTooltip] = useState(false);
    const [tooltipContent, setTooltipContent] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    if (!activePerson) {
        return <HomeScreen {...props} />;
    }

    return (
        <main className="flex-1 bg-white h-2/3 md:h-full overflow-y-auto p-6 relative">
            {showParticipantsTooltip && (
                <div
                    className="fixed bg-gray-800 text-white text-sm p-3 rounded-lg shadow-lg z-50 max-w-xs"
                    style={{ left: tooltipPosition.x, top: tooltipPosition.y, transform: 'translateY(-100%)' }}
                >
                    {tooltipContent}
                </div>
            )}
            <div className="max-w-4xl mx-auto pb-20 fade-in">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                        {activePerson.foto ? (
                            <img 
                                src={activePerson.foto}
                                alt={activePerson.nome} 
                                className="w-16 h-16 rounded-full object-cover border-4"
                                style={{ borderColor: currentTheme.primary }}
                            />
                        ) : (
                            <div 
                                className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-4"
                                style={{ borderColor: currentTheme.primary }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                            </div>
                        )}
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-4xl font-bold">{truncateText(activePerson.nome, 30)}</h2>
                                <button onClick={openEditPersonModal} className="text-gray-400 hover:text-indigo-600 transition" title="Modifica">
                                    <Pencil size={20} />
                                </button>
                                <span className="text-xs px-2 py-1 rounded font-bold uppercase" style={themeStyles.accentBg}>
                                    {activePerson.relazione}
                                </span>
                            </div>
                            <p className="text-gray-500 flex items-center gap-2 mt-1">
                                <Calendar size={16} /> {headerInfo.date ? new Date(headerInfo.date).toLocaleDateString() : "--"} ({headerInfo.type})
                            </p>
                            <div className="min-h-[2.5rem]">
                                {headerInfo.partnerUid && (
                                    <button onClick={() => handleSelectUid(headerInfo.partnerUid, headerInfo.partnerType)} className="flex items-center gap-1 text-sm hover:underline font-medium" style={{ color: currentTheme.secondary }}>
                                        <LinkIcon size={14} /> Partner: {headerInfo.partnerName}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <button onClick={handleArchive} className="bg-white border border-gray-200 text-gray-400 hover:text-red-600 px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm hover:bg-red-50 transition">
                        <Trash size={16} /> Archivia
                    </button>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <button onClick={openNewGiftModal} style={themeStyles.primary} className="text-white px-4 py-2 rounded-lg font-bold shadow-md flex items-center gap-2 hover:opacity-90 transition">
                        <Plus size={18} /> Nuovo Regalo
                    </button>
                    <button onClick={() => setShowModalStats(true)} className="bg-white border border-gray-300 px-4 py-2 rounded-lg font-bold shadow-sm flex items-center gap-2 ml-auto">
                        <Calculator size={18} />
                    </button>
                </div>

                <div className="bg-orange-500 text-white text-center p-2 mb-4 rounded-lg shadow-md font-bold">
                    È la settimana del Black Friday! Offerte imperdibili su Amazon.
                </div>
                <div className="border border-gray-200 rounded-xl p-5 mb-8" style={{ backgroundColor: currentTheme.accent }}>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold flex items-center gap-2" style={{ color: currentTheme.textAccent }}>
                            <Lightbulb size={18} /> Ti consiglio di regalare: <span className="underline">{activeTab}</span>
                        </h3>
                        <button onClick={() => updateSuggestions(activeTab)} className="text-xs flex items-center gap-1 px-2 py-1 rounded hover:opacity-70 transition" style={{ color: currentTheme.textAccent }}>
                            <RefreshCw size={12} /> Rinnova
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {suggerimenti.map((s, i) => (
                            <a
                                key={i}
                                href={s.link}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-white border border-gray-200 p-3 rounded-lg hover:shadow-md transition text-center group relative"
                                style={s.link && s.link.includes('amazon.it') ? { backgroundColor: '#FE6100', color: 'white' } : {}}
                            >
                                <span className="text-sm font-bold block" style={s.link && s.link.includes('amazon.it') ? { color: 'white' } : { color: currentTheme.primary }}>{s.nome}</span>
                                <ExternalLink size={12} className="absolute top-2 right-2 text-gray-300" style={s.link && s.link.includes('amazon.it') ? { color: 'white' } : {}} />
                            </a>
                        ))}
                    </div>
                </div>

                <AdUnit />

                <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
                    <button onClick={() => handleTabChange("Tutti")} className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${activeTab === "Tutti" ? 'text-white' : 'bg-gray-100 text-gray-600'}`} style={activeTab === "Tutti" ? { backgroundColor: currentTheme.primary } : {}}>
                        Tutti
                    </button>
                    {activePerson.eventi.filter(e => !e.archived).map(e => (
                        <button key={e.tipo} onClick={() => handleTabChange(e.tipo)} className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${activeTab === e.tipo ? 'text-white' : 'bg-gray-100 text-gray-600'}`} style={activeTab === e.tipo ? { backgroundColor: currentTheme.primary } : {}}>
                            {e.tipo}
                        </button>
                    ))}
                    <button onClick={() => setShowAddEventModal(true)} className="px-3 py-2 rounded-full border-2 border-dashed border-gray-300 text-gray-400 hover:border-gray-500 transition">
                        <Plus size={16} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-end mb-2">
                        <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: currentTheme.primary }}>
                            <Gift /> {activeTab === "Tutti" ? "Tutti i Regali" : `Regali per ${activeTab}`}
                        </h3>
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm outline-none w-48" placeholder="Cerca regalo..." />
                        </div>
                    </div>
                    {getFilteredGifts().length > 0 ? (
                        getFilteredGifts().map((r, i) => {
                            const occ = calcolaOccorrenza(r._evtData, r.anno, r._evtTipo);
                            return (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-4 group relative min-h-[100px]">
                                    <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center border border-gray-200">
                                        <GiftImage src={r.img} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-xl">{r.oggetto}</h4>
                                                {activeTab === "Tutti" && <span className="text-xs font-bold uppercase tracking-wider" style={{ color: currentTheme.secondary }}>{r._evtTipo}</span>}
                                            </div>
                                            <div className="text-right">
                                                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 ml-auto">
                                                    <Clock size={12} /> {r.anno}
                                                </span>
                                                {occ && <span className="block text-[10px] mt-1" style={{ color: currentTheme.secondary }}>Per {occ}</span>}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                                            {(r.negozio || r.link) && (
                                                <span className="flex items-center gap-1">
                                                    <ShoppingBag size={14} /> {r.link ? (<a href={r.link} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-0.5 font-medium" style={{ color: currentTheme.secondary }}>{r.negozio || "Link"} <ExternalLink size={10} /></a>) : r.negozio}
                                                </span>
                                            )}
                                            {r.prezzo > 0 && <span className="flex items-center gap-1 font-bold text-green-600"><Euro size={14} /> {r.prezzo.toFixed(2)}</span>}
                                            {r.partecipanti && (
                                                <span 
                                                    className="flex items-center gap-1 text-gray-600 cursor-pointer relative"
                                                    onClick={(e) => {
                                                        setTooltipContent(r.partecipanti);
                                                        setTooltipPosition({ x: e.clientX, y: e.clientY });
                                                        setShowParticipantsTooltip(true);
                                                    }}
                                                    onMouseLeave={() => setShowParticipantsTooltip(false)}
                                                >
                                                    <Users size={14} /> 
                                                    {truncateText(r.partecipanti, 45)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition bg-white/90 p-1 rounded shadow-sm">
                                        <button onClick={() => openEditGiftModal(r, r._rIdx, r._eIdx, r._evtTipo)} className="p-1.5 bg-gray-100 rounded hover:opacity-80">
                                            <Pencil size={16} />
                                        </button>
                                        <button onClick={() => handleDeleteSingleGift(r._rIdx, r._eIdx)} className="p-1.5 bg-gray-100 text-red-600 rounded hover:bg-red-100">
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center text-gray-500">
                            Nessun regalo trovato per {activeTab === "Tutti" ? "questa persona" : activeTab}.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default MainContent;
