import React from 'react';
import { Gift, Calendar, Plus, Users, Star, RefreshCw } from 'lucide-react';
import PeopleList from './PeopleList';

const HomeScreen = ({
    sidebarList,
    persone,
    getLastGift,
    amazonSuggestions,
    openNewPersonModal,
    openNewGiftModal,
    handleSidebarClick,
    themeStyles,
    handleRefreshAmazonSuggestions,
    selectedUid,
    currentTheme,
    setShowPeopleList
}) => {
    if (sidebarList.length === 0) {
        return (
            <div className="p-6 bg-slate-50 h-full flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-bold mb-2">Benvenuto in GiftMinder!</h1>
                <p className="text-gray-600 mb-8">Sembra che tu non abbia ancora aggiunto nessuno. Inizia creando una scheda persona.</p>
                <button
                    onClick={openNewPersonModal}
                    style={themeStyles.primary}
                    className="px-6 py-3 rounded-lg font-bold shadow-md flex items-center gap-2 hover:opacity-90 transition"
                >
                    <Plus size={18} />
                    <span>Crea la tua prima scheda</span>
                </button>
            </div>
        );
    }

    const nextEvent = {
        ...sidebarList[0],
        lastGift: getLastGift(sidebarList[0].id, sidebarList[0].nextEvent.tipo),
    };

    const upcomingEvents = sidebarList.slice(1, 4);

    return (
        <div className="p-6 bg-slate-50 h-full overflow-y-auto">
            <div className="max-w-full mx-auto">
                {/* <h1 className="text-3xl font-bold mb-6">Home</h1> */}

                <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6 mb-6">
                    {/* Left Column: Action Buttons */}
                    <div className="flex flex-row lg:flex-col gap-4">
                        <button onClick={openNewPersonModal} className="bg-white text-center p-4 rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition">
                            <Users className="mx-auto mb-2 text-indigo-500" size={24} />
                            <span className="font-bold text-sm text-gray-700">Nuova Persona</span>
                        </button>
                        <button onClick={openNewGiftModal} className="bg-white text-center p-4 rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition">
                            <Gift className="mx-auto mb-2 text-amber-500" size={24} />
                            <span className="font-bold text-sm text-gray-700">Nuovo Regalo</span>
                        </button>
                        <button onClick={() => setShowPeopleList(true)} className="bg-white text-center p-4 rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition lg:hidden">
                            <Users className="mx-auto mb-2 text-green-500" size={24} />
                            <span className="font-bold text-sm text-gray-700">Persone</span>
                        </button>
                    </div>

                    {/* Right Column: In Scadenza & Prossimi Eventi */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left: Next Event Details - In Scadenza */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">In Scadenza</h2>
                            <div className="flex items-start sm:items-center gap-6">
                                <div className={`text-center flex-shrink-0 w-24 cursor-pointer`} onClick={() => handleSidebarClick(nextEvent)}>
                                    <div className="text-5xl font-bold" style={{ color: nextEvent.nextEvent.days < 14 ? '#E53E3E' : '#38A169' }}>
                                        {nextEvent.nextEvent.days}
                                    </div>
                                    <div className="text-sm font-bold text-gray-500">Giorni</div>
                                </div>
                                <div className="w-px bg-gray-200 self-stretch hidden sm:block"></div>
                                <div className="flex-grow cursor-pointer" onClick={() => handleSidebarClick(nextEvent)}>
                                    <p className="text-xl font-bold">{nextEvent.nome}</p>
                                    <p className="text-sm text-gray-500 mb-2">{nextEvent.relazione}</p>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                                        <span className="flex items-center gap-1.5 bg-indigo-100 text-indigo-600 font-bold px-3 py-1 rounded-full">
                                            <Calendar size={14} />
                                            {nextEvent.nextEvent.tipo}
                                        </span>
                                        {nextEvent.occorrenza && <span className="font-medium text-gray-600">{nextEvent.occorrenza}</span>}
                                    </div>
                                    {nextEvent.lastGift && (
                                        <div className="mt-4 pt-4 border-t">
                                            <p className="text-xs text-gray-400 font-semibold">Ultimo regalo ({nextEvent.lastGift.anno}):</p>
                                            <p className="font-semibold text-gray-700">{nextEvent.lastGift.oggetto}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right: Upcoming Events - Prossimi Eventi */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Prossimi Eventi</h2>
                            <div className="space-y-4">
                                {upcomingEvents.map((event, i) => (
                                    <div key={i} className="flex items-center justify-between cursor-pointer group" onClick={() => handleSidebarClick(event)}>
                                        <div className="w-3/4">
                                            <p className="font-bold group-hover:text-indigo-600 transition truncate">{event.nome}</p>
                                            <p className="text-sm text-gray-500">{event.nextEvent.tipo}</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <div className={`font-bold text-lg ${event.nextEvent.days < 14 ? 'text-red-600' : 'text-green-600'}`}>
                                                {event.nextEvent.days}gg
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* AdSense Banner Placeholder */}
                <div className="my-6 text-center">
                    {/* Replace data-ad-client and data-ad-slot with your actual AdSense IDs */}
                    {/* Example ad unit - dimensions and type might need adjustment */}
                    <ins className="adsbygoogle"
                         style={{ display: 'block' }}
                         data-ad-client="ca-pub-YOUR_ADSENSE_CLIENT_ID"
                         data-ad-slot="YOUR_ADSENSE_SLOT_ID"
                         data-ad-format="auto"
                         data-full-width-responsive="true"></ins>
                    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
                </div>

                {/* Amazon Section */}
                {amazonSuggestions && amazonSuggestions.length > 0 && (
                    <div className="p-6 rounded-2xl shadow-sm border border-gray-200" style={{ backgroundColor: '#FE6100' }}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                               <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-5 invert" />
                               <span>I più desiderati al Black Friday</span>
                            </h2>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleRefreshAmazonSuggestions}
                                    className="text-sm font-bold text-white hover:underline flex items-center gap-1"
                                >
                                    <RefreshCw size={14} /> Rinnova
                                </button>
                                <a href="https://www.amazon.it/most-wished-for?tag=giftminder-21" target="_blank" rel="noreferrer" className="text-sm font-bold text-white hover:underline">Vedi tutti</a>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {amazonSuggestions.map((item, i) => (
                                <a key={i} href={item.link} target="_blank" rel="noreferrer" className="group block">
                                    <div className="bg-white rounded-lg mb-2 h-32 flex items-center justify-center p-2">
                                         <p className="text-center font-bold text-gray-700">{item.nome}</p>
                                    </div>
                                    <p className="text-sm font-bold text-white group-hover:text-gray-200 transition truncate">{item.nome}</p>
                                    <div className="flex items-center text-xs text-white">
                                        <Star size={12} fill="currentColor" />
                                        <Star size={12} fill="currentColor" />
                                        <Star size={12} fill="currentColor" />
                                        <Star size={12} fill="currentColor" />
                                        <Star size={12} className="text-gray-300" fill="currentColor" />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeScreen;
