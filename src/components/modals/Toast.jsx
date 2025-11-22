import React from 'react';

export const Toast = ({ msg }) => (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg z-[999] text-sm font-bold fade-in">
        {msg}
    </div>
);
