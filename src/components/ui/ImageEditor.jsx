import React, { useState, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export const ImageEditor = ({ imageSrc, onConfirm, onCancel }) => {
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState();
    const imgRef = useRef(null);

    function onImageLoad(e) {
        const { width, height } = e.currentTarget;
        const crop = centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 90,
                },
                1, // aspect ratio 1:1
                width,
                height
            ),
            width,
            height
        );
        setCrop(crop);
    }

    const handleConfirm = async () => {
        if (completedCrop?.width && completedCrop?.height && imgRef.current) {
            // The actual cropping/compression logic will be handled outside
            onConfirm(imgRef.current, completedCrop);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
                <h3 className="font-bold text-lg mb-4">Ritaglia Immagine</h3>
                <p className="text-sm text-gray-500 mb-4">Centra e ridimensiona la tua immagine del profilo.</p>
                <div className="flex justify-center bg-gray-100 p-4 rounded-lg">
                    <ReactCrop
                        crop={crop}
                        onChange={c => setCrop(c)}
                        onComplete={c => setCompletedCrop(c)}
                        aspect={1}
                        circularCrop
                        keepSelection
                    >
                        <img
                            ref={imgRef}
                            src={imageSrc}
                            onLoad={onImageLoad}
                            alt="Crop me"
                            style={{ maxHeight: '60vh' }}
                            crossOrigin="anonymous" // Required for cropping images from a URL
                        />
                    </ReactCrop>
                </div>
                <div className="pt-4 mt-4 border-t flex justify-end gap-3">
                    <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-100 font-bold rounded-lg">Annulla</button>
                    <button type="button" onClick={handleConfirm} className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg">Conferma</button>
                </div>
            </div>
        </div>
    );
};
