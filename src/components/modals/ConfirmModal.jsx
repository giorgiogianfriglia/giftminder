import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const ConfirmModal = ({ config, onCancel, onConfirm }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 fade-in">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center border border-gray-200">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                <AlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">{config.title}</h3>
            <p className="text-gray-500 mb-6">{config.msg}</p>
            <div className="flex gap-3">
                <button onClick={onCancel} className="flex-1 py-2 bg-gray-100 rounded-lg font-bold hover:bg-gray-200">Annulla</button>
                <button onClick={onConfirm} className="flex-1 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700">Conferma</button>
            </div>
        </div>
    </div>
);
