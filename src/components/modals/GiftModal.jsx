import React from 'react';
import { X } from 'lucide-react';

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
    setGiftPrice
}) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 fade-in">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-lg">Regalo</h3>
                <button onClick={onClose}><X /></button>
            </div>
            <div className="p-6 space-y-4 flex-1 overflow-y-auto">
                {editingGiftIndex === null && (
                    <div>
                        <label className="block text-sm font-bold mb-1">Occasione</label>
                        <div className="flex gap-2">
                            <select className="w-full border border-gray-200 rounded-lg p-3" value={giftTargetEvent} onChange={e => { setGiftTargetEvent(e.target.value); updateSuggestions(e.target.value); }}>
                                {activePerson && activePerson.eventi && activePerson.eventi.filter(e => !e.archived).map(e => <option key={e.tipo} value={e.tipo}>{e.tipo}</option>)}
                                {(!activePerson || !activePerson.eventi || activePerson.eventi.filter(e => !e.archived).length === 0) && <option value="" disabled>Nessun evento disponibile</option>}
                            </select>
                            <button onClick={() => setShowAddEventModal(true)} className="bg-gray-100 px-3 rounded-lg font-bold">+</button>
                        </div>
                    </div>
                )}
                {editingGiftIndex === null && (
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-xs font-bold text-amber-800">💡 Consigli Rapidi ({giftTargetEvent})</h4>
                            <button onClick={() => updateSuggestions(giftTargetEvent)} className="text-[10px] text-amber-600 hover:underline">Rinnova</button>
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                            {suggerimenti.map((s, i) => (
                                <a key={i} href={s.link} target="_blank" rel="noreferrer" className="flex-shrink-0 bg-white border border-amber-200 px-3 py-2 rounded text-center min-w-[100px] hover:shadow-sm">
                                    <span className="text-xs font-bold text-gray-800 block truncate">{s.nome}</span>
                                    <span className="text-[10px] text-amber-500">Amazon &rarr;</span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
                <div>
                    <label className="block text-sm font-bold mb-1">Oggetto</label>
                    <input className="w-full border border-gray-200 rounded-lg p-3" value={giftObj} onChange={e => setGiftObj(e.target.value)} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-1">Anno</label>
                        <input type="number" className="w-full border border-gray-200 rounded-lg p-3" value={giftYear} onChange={e => setGiftYear(e.target.value)} />
                    </div>
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
