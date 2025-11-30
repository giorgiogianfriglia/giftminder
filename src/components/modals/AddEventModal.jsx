import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { fixedEvents } from '../../utils/fixedEvents';
import { formatFixedDate } from '../../utils/helpers';

export const AddEventModal = ({ onClose, handleAddEventToPerson, addEventName, setAddEventName, eventTypesList, customAddEventName, setCustomAddEventName, saveCustomAddEventName, addEventDate, setAddEventDate, themeStyles, isAddingEventFromGiftModal, setIsAddingEventFromGiftModal, activePerson }) => {
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const fixed = fixedEvents.find(fe => fe.type === addEventName);
        if (fixed) {
            setIsFixed(true);
            setAddEventDate(fixed.date);
        } else {
            setIsFixed(false);
            setAddEventDate('');
        }
    }, [addEventName, setAddEventDate]);

    const handleAddClick = () => {
        handleAddEventToPerson(); // handleAddEventToPerson now handles all logic
        onClose(); // Close the modal after adding the event
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 border border-gray-200">
                <h3 className="font-bold text-lg mb-4">Aggiungi Ricorrenza</h3>
                <div className="space-y-4">
                    <div>
                        <select className="w-full border border-gray-200 rounded-lg p-2" value={addEventName} onChange={e => setAddEventName(e.target.value)}>
                            {eventTypesList.map(t => <option key={t} value={t}>{t}</option>)}
                            <option value="Altro">Altro...</option>
                        </select>
                        {addEventName === "Altro" && (
                            <div className="flex gap-2 mt-2">
                                <input className="w-full border rounded-lg p-2 bg-gray-50" placeholder="Specifica..." value={customAddEventName} onChange={e => setCustomAddEventName(e.target.value)} required />
                                <button type="button" onClick={saveCustomAddEventName} className="bg-green-100 text-green-600 p-2 rounded"><Check size={18} /></button>
                            </div>
                        )}
                    </div>
                    {isFixed ? (
                        <div className="w-full border border-gray-200 rounded-lg p-2 bg-gray-200 text-gray-600">
                            {formatFixedDate(addEventDate)}
                        </div>
                    ) : (
                        <input type="date" className="w-full border border-gray-200 rounded-lg p-2" value={addEventDate} onChange={e => setAddEventDate(e.target.value)} />
                    )}
                    <button onClick={handleAddClick} style={themeStyles.primary} className="w-full font-bold py-2 rounded-lg">Aggiungi</button>
                    <button onClick={onClose} className="w-full text-gray-500 py-2">Annulla</button>
                </div>
            </div>
        </div>
    );
};
