import React, { useState } from 'react';
import { X, LogOut, Trash2, Edit, Palette } from 'lucide-react';
import { themes } from "../../utils/themes";

export const SettingsModal = ({
    onClose,
    handleLogout,
    currentTheme,
    setCurrentTheme,
    // Customization props
    customEventTypes,
    handleDeleteCustomEventType,
    handleEditCustomEventType,
    editingEventType,
    setEditingEventType,
    customRelazioni,
    handleDeleteCustomRelationType,
    handleEditCustomRelationType,
    editingRelationType,
    setEditingRelationType
}) => {
    const [selectedEvent, setSelectedEvent] = useState(customEventTypes?.[0] || null);
    const [selectedRelation, setSelectedRelation] = useState(customRelazioni?.[0] || null);

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4 fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl">Opzioni</h3>
                    <button onClick={onClose}><X /></button>
                </div>

                <div className="mb-6">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2"><Palette size={14}/> Tema</label>
                    <div className="grid grid-cols-4 gap-3">
                        {themes.map(theme => (
                            <button
                                key={theme.name}
                                onClick={() => setCurrentTheme(theme)}
                                className={`h-12 rounded-lg border-4 ${currentTheme.name === theme.name ? 'border-blue-500' : 'border-transparent'}`}
                                style={{ backgroundColor: theme.primary }}
                                title={theme.name}
                            />
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-3">Eventi Personalizzati</label>
                    <div className="flex items-center gap-2">
                        <select
                            value={selectedEvent || ''}
                            onChange={(e) => setSelectedEvent(e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg ${customEventTypes.length === 0 ? 'bg-gray-100' : 'bg-gray-50'}`}
                            disabled={customEventTypes.length === 0}
                        >
                            {customEventTypes.length === 0 ? (
                                <option value="" disabled>Nessun evento personalizzato</option>
                            ) : (
                                customEventTypes.map(name => (
                                    <option key={name} value={name}>{name}</option>
                                ))
                            )}
                        </select>
                        <button
                            onClick={() => selectedEvent && setEditingEventType(selectedEvent)}
                            className={`p-2 rounded-lg ${!selectedEvent || customEventTypes.length === 0 ? 'bg-gray-100 text-gray-300' : 'bg-gray-200 text-gray-500 hover:text-indigo-600'}`}
                            disabled={!selectedEvent || customEventTypes.length === 0}
                        >
                            <Edit size={16} />
                        </button>
                        <button
                            onClick={() => selectedEvent && handleDeleteCustomEventType(selectedEvent)}
                            className={`p-2 rounded-lg ${!selectedEvent || customEventTypes.length === 0 ? 'bg-gray-100 text-gray-300' : 'bg-gray-200 text-gray-500 hover:text-red-600'}`}
                            disabled={!selectedEvent || customEventTypes.length === 0}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-3">Relazioni Personalizzate</label>
                    <div className="flex items-center gap-2">
                        <select
                            value={selectedRelation || ''}
                            onChange={(e) => setSelectedRelation(e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg ${customRelazioni.length === 0 ? 'bg-gray-100' : 'bg-gray-50'}`}
                            disabled={customRelazioni.length === 0}
                        >
                            {customRelazioni.length === 0 ? (
                                <option value="" disabled>Nessuna relazione personalizzata</option>
                            ) : (
                                customRelazioni.map(name => (
                                    <option key={name} value={name}>{name}</option>
                                ))
                            )}
                        </select>
                        <button
                            onClick={() => selectedRelation && setEditingRelationType(selectedRelation)}
                            className={`p-2 rounded-lg ${!selectedRelation || customRelazioni.length === 0 ? 'bg-gray-100 text-gray-300' : 'bg-gray-200 text-gray-500 hover:text-indigo-600'}`}
                            disabled={!selectedRelation || customRelazioni.length === 0}
                        >
                            <Edit size={16} />
                        </button>
                        <button
                            onClick={() => selectedRelation && handleDeleteCustomRelationType(selectedRelation)}
                            className={`p-2 rounded-lg ${!selectedRelation || customRelazioni.length === 0 ? 'bg-gray-100 text-gray-300' : 'bg-gray-200 text-gray-500 hover:text-red-600'}`}
                            disabled={!selectedRelation || customRelazioni.length === 0}
                        >
                            <Trash2 size={16} />
                        </button>
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
};