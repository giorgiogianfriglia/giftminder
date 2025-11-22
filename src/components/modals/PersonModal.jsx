import React from 'react';
import { X, Check, Trash2 } from 'lucide-react';
import { ImageEditor } from '../ui/ImageEditor';
import { getCroppedImg } from '../../utils/helpers';
import { fixedEvents } from '../../utils/fixedEvents';

const formatFixedDate = (mmdd) => {
    if (!mmdd || !mmdd.includes('-')) return '';
    const [month, day] = mmdd.split('-');
    // Create a date object (year is irrelevant) to use toLocaleDateString for formatting
    const date = new Date(2000, parseInt(month, 10) - 1, parseInt(day, 10));
    return date.toLocaleDateString('it-IT', { month: 'long', day: 'numeric' });
};

export const PersonModal = ({ 
    onClose,
    editingPersonId,
    handleSavePerson,
    newPersonName,
    setNewPersonName,
    newPersonPhoto,
    setNewPersonPhoto,
    handlePhotoUpload,
    newRelation,
    setNewRelation,
    relazioniList,
    customRelation,
    setCustomRelation,
    saveCustomRelation,
    newPartnerId,
    setNewPartnerId,
    persone,
    editingEvents,
    handleEditEventChange,
    handleDeleteEventFromEdit,
    handleAddFixedEvents,
    newEventType,
    setNewEventType,
    eventTypesList,
    customEventType,
    setCustomEventType,
    saveCustomEventType,
    newEventDate,
    setNewEventDate
}) => { 
    const [uploadType, setUploadType] = React.useState('url');
    const [imageToEdit, setImageToEdit] = React.useState(null);
    const fileInputRef = React.useRef(null);

        const handleFileChange = (e) => {         const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImageToEdit(reader.result);
            reader.readAsDataURL(file);
        }
    };

        const handleDeletePhoto = () => {        setNewPersonPhoto('');
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    return ( 
        <>
            {imageToEdit && (
                <ImageEditor 
                    imageSrc={imageToEdit}
                    onCancel={() => setImageToEdit(null)}
                    onConfirm={async (image, crop) => { 
                        const croppedAndCompressedImage = await getCroppedImg(image, crop);
                        if (croppedAndCompressedImage && handlePhotoUpload) {
                            await handlePhotoUpload(croppedAndCompressedImage);
                        }
                        setImageToEdit(null);
                    }}
                />
            )}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="font-bold text-lg">{editingPersonId ? "Modifica" : "Nuova"} Scheda</h3>
                        <button onClick={onClose}><X /></button>
                    </div>
                    <div className="p-6 space-y-4 flex-1 overflow-y-auto">
                        <form onSubmit={handleSavePerson} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Nome Persona</label>
                                <input className="w-full border border-gray-200 rounded-lg p-2" value={newPersonName} onChange={e => setNewPersonName(e.target.value)} autoFocus required />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-1">Foto</label>
                                <div className="flex items-center gap-4">
                                    <div 
                                        className="w-24 h-24 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden border cursor-pointer"
                                        onClick={() => fileInputRef.current?.click()}
                                        title="Clicca per caricare un\'immagine"
                                    >
                                        {newPersonPhoto ? (
                                            <img src={newPersonPhoto} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500 mb-2">Carica un file cliccando sull'immagine.</p>
                                        <div className="flex gap-2 items-center">
                                            <button type="button" onClick={handleDeletePhoto} title="Rimuovi immagine" className="p-2 text-gray-500 hover:text-red-600"><Trash2 size={18} /></button>
                                        </div>
                                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" className="hidden" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Relazione</label>
                                    <select className="w-full border border-gray-200 rounded-lg p-2" value={newRelation} onChange={e => setNewRelation(e.target.value)}>
                                        {relazioniList.map(r => <option key={r} value={r}>{r}</option>)}
                                        <option value="Altro">Altro...</option>
                                    </select>
                                    {newRelation === "Altro" && (
                                        <div className="flex gap-2 mt-2">
                                            <input className="w-full border rounded-lg p-2 bg-gray-50" placeholder="Specifica..." value={customRelation} onChange={e => setCustomRelation(e.target.value)} required />
                                            <button type="button" onClick={saveCustomRelation} className="bg-green-100 text-green-600 p-2 rounded"><Check size={18} /></button>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Partner</label>
                                    <select className="w-full border border-gray-200 rounded-lg p-2" value={newPartnerId} onChange={e => setNewPartnerId(e.target.value)}>
                                        <option value="">Nessuno</option>
                                        {persone.filter(p => p.id !== editingPersonId).map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                                    </select>
                                </div>
                            </div>
                            {!editingPersonId && (
                                <div className="pt-2 border-t border-gray-200 mt-2">
                                    <h4 className="text-sm font-bold mb-2 text-gray-600">Prima Ricorrenza</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold mb-1">Tipo Evento</label>
                                            <select className="w-full border border-gray-200 rounded-lg p-2" value={newEventType} onChange={e => setNewEventType(e.target.value)}>
                                                {eventTypesList.map(t => <option key={t} value={t}>{t}</option>)}
                                                <option value="Altro">Altro...</option>
                                            </select>
                                            {newEventType === "Altro" && (
                                                <div className="flex gap-2 mt-2">
                                                    <input className="w-full border rounded-lg p-2 bg-gray-50" placeholder="Specifica..." value={customEventType} onChange={e => setCustomEventType(e.target.value)} required />
                                                    <button type="button" onClick={saveCustomEventType} className="bg-green-100 text-green-600 p-2 rounded"><Check size={18} /></button>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-1">Data</label>
                                            <input type="date" className="w-full border border-gray-200 rounded-lg p-2" value={newEventDate} onChange={e => setNewEventDate(e.target.value)} required />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {editingPersonId && (
                                <div className="pt-4 border-t">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-bold mb-2">Eventi</h4>
                                        <button type="button" onClick={handleAddFixedEvents} className="text-sm font-medium text-blue-600 hover:text-blue-800 px-2 py-1 rounded-md hover:bg-blue-50">
                                            + Aggiungi eventi fissi
                                        </button>
                                    </div>
                                    {editingEvents.map((evt, idx) => {
                                        const isFixed = evt.is_fixed;
                                        return (
                                            <div key={idx} className="flex gap-2 items-end p-2 rounded-lg bg-gray-50 mb-2">
                                                <input 
                                                    value={evt.tipo} 
                                                    readOnly={isFixed}
                                                    onChange={(e) => handleEditEventChange(idx, 'tipo', e.target.value)} 
                                                    className={`w-full border p-2 rounded-md ${isFixed ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                                                />
                                                {isFixed ? (
                                                    <div className="w-full border p-2 rounded-md bg-gray-200 text-gray-600 cursor-not-allowed flex items-center h-[42px]">
                                                        {formatFixedDate(evt.data)}
                                                    </div>
                                                ) : (
                                                    <input 
                                                        type="date" 
                                                        value={evt.data} 
                                                        onChange={(e) => handleEditEventChange(idx, 'data', e.target.value)} 
                                                        className="w-full border p-2 rounded-md" 
                                                    />
                                                )}
                                                <button 
                                                    type="button" 
                                                    onClick={() => handleDeleteEventFromEdit(idx)} 
                                                    className={`p-2 ${isFixed ? 'text-gray-300 cursor-not-allowed' : 'text-red-500 hover:bg-red-100 rounded-full'}`}
                                                    disabled={isFixed}
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            <div className="pt-4 border-t flex justify-end gap-3">
                                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 font-bold rounded-lg">Annulla</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg">Salva</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
