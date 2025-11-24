import React from 'react';
import { X, Camera } from 'lucide-react';

export const GiftModal = ({
    onClose,
    handleSaveRegalo,
    editingGiftIndex,
    giftTargetEvent,
    setGiftTargetEvent,
    updateSuggestions,
    activePerson,
    setShowAddEventModal,
    suggerimenti,
    giftObj,
    setGiftObj,
    giftYear,
    setGiftYear,
    giftParticipants,
    setGiftParticipants,
    giftShop,
    setGiftShop,
    giftLink,
    setGiftLink,
    giftImg,
    setGiftImg,
    giftPrice,
    setGiftPrice,
    persone,
    handleSelectUid
}) => {
    const selectedEvent = activePerson?.eventi.find(e => e.tipo === giftTargetEvent);
    const isFixedEvent = selectedEvent?.is_fixed;

    const handlePersonChange = (personId) => {
        if (!personId) return;
        const person = persone.find(p => p.id.toString() === personId);
        if (person && person.eventi.length > 0) {
            const firstEventIndex = 0; // Or find a default/next event
            handleSelectUid(`${personId}-${firstEventIndex}`);
        } else {
             handleSelectUid(`${personId}-0`); // fallback
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto flex flex-col">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Regalo</h3>
                    <button onClick={onClose}><X /></button>
                </div>
                <div className="p-6 space-y-4 flex-1 overflow-y-auto">
                    {editingGiftIndex === null && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Persona</label>
                                <select 
                                    className="w-full border border-gray-200 rounded-lg p-3" 
                                    value={activePerson?.id || ''} 
                                    onChange={e => handlePersonChange(e.target.value)}
                                >
                                    <option value="" disabled>Seleziona una persona</option>
                                    {persone.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Occasione</label>
                                <div className="flex gap-2">
                                    <select className="w-full border border-gray-200 rounded-lg p-3" value={giftTargetEvent} onChange={e => { setGiftTargetEvent(e.target.value); updateSuggestions(e.target.value); }} disabled={!activePerson}>
                                        {activePerson && activePerson.eventi && activePerson.eventi.filter(e => !e.archived).map(e => <option key={e.tipo} value={e.tipo}>{e.tipo}</option>)}
                                        {(!activePerson || !activePerson.eventi || activePerson.eventi.filter(e => !e.archived).length === 0) && <option value="" disabled>Nessun evento</option>}
                                    </select>
                                    <button onClick={() => setShowAddEventModal(true)} className="bg-gray-100 px-3 rounded-lg font-bold" disabled={!activePerson}>+</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {editingGiftIndex === null && (
                        <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="text-xs font-bold text-amber-800">💡 Consigli Rapidi {giftTargetEvent ? `(${giftTargetEvent})` : '(Generici)'}</h4>
                                <button onClick={() => updateSuggestions(giftTargetEvent)} className="text-[10px] text-amber-600 hover:underline">Rinnova</button>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {suggerimenti.slice(0, 3).map((s, i) => (
                                    <a key={i} href={s.link} target="_blank" rel="noreferrer" className="bg-white border border-amber-200 rounded-lg text-center hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                                        <div className="w-full h-20 bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                                            {s.img ? (
                                                <img src={s.img} alt={s.nome} className="w-full h-full object-cover" />
                                            ) : (
                                                <Camera size={32} className="text-gray-300" />
                                            )}
                                        </div>
                                        <div className="p-2 flex-1 flex flex-col justify-center">
                                            <span className="text-xs font-bold text-gray-800 block truncate">{s.nome}</span>
                                            <span className="text-[10px] text-amber-500">Amazon &rarr;</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-bold mb-1">Oggetto</label>
                        <input className="w-full border border-gray-200 rounded-lg p-3" value={giftObj} onChange={e => setGiftObj(e.target.value)} required />
                    </div>
                    <div className={`grid ${isFixedEvent ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                        {!isFixedEvent && (
                            <div>
                                <label className="block text-sm font-bold mb-1">Anno</label>
                                <input type="number" className="w-full border border-gray-200 rounded-lg p-3" value={giftYear} onChange={e => setGiftYear(e.target.value)} />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-bold mb-1">Prezzo (€)</label>
                            <input type="text" inputMode="decimal" className="w-full border border-gray-200 rounded-lg p-3" value={giftPrice} onChange={e => setGiftPrice(e.target.value)} placeholder="Es. 49,99" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Link Prodotto</label>
                        <input className="w-full border border-gray-200 rounded-lg p-3" value={giftLink} onChange={e => setGiftLink(e.target.value)} placeholder="https://..." />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Link Immagine</label>
                        <input className="w-full border border-gray-200 rounded-lg p-3" value={giftImg} onChange={e => setGiftImg(e.target.value)} placeholder="https://..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">Negozio</label>
                            <input className="w-full border border-gray-200 rounded-lg p-3" value={giftShop} onChange={e => setGiftShop(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Partecipanti</label>
                            <input className="w-full border border-gray-200 rounded-lg p-3" value={giftParticipants} onChange={e => setGiftParticipants(e.target.value)} />
                        </div>
                    </div>
                    <div className="pt-4 border-t flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 font-bold rounded-lg">Annulla</button>
                        <button onClick={handleSaveRegalo} className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg">Salva Regalo</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
