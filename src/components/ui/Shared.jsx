import React, { useState } from 'react';
import { Gift } from 'lucide-react';

export const AdUnit = ({ type }) => (
    <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 text-[10px] font-bold tracking-widest uppercase text-center text-wrap p-2 ${type === 'banner' ? 'w-full h-20 mb-6' : 'w-full h-24 my-2'}`}>
        {type === 'banner' ? 'Banner Sponsor' : 'Pubblicità (AdSense)'}
    </div>
);

export const GiftImage = ({ src }) => {
    const [error, setError] = useState(false);
    if (!src || error) return <Gift className="text-gray-300 w-8 h-8" />;
    return <img src={src} alt="regalo" className="w-full h-full object-cover" onError={() => setError(true)} />;
};
