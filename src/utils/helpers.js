import imageCompression from 'browser-image-compression';

export const isValidUrl = (urlString) => {
    try {
        return Boolean(new URL(urlString));
    } catch (e) {
        return false;
    }
};

export const calcolaGiorni = (dataStr) => {
    if (!dataStr) return Infinity;
    const oggi = new Date();
    oggi.setHours(0, 0, 0, 0);

    let annoEvento = oggi.getFullYear();
    let eventoDate;

    if (dataStr.length === 5 && dataStr.includes('-')) { // Formato MM-DD
        const [mese, giorno] = dataStr.split('-').map(Number);
        eventoDate = new Date(annoEvento, mese - 1, giorno);
    } else { // Formato YYYY-MM-DD
        eventoDate = new Date(dataStr);
        eventoDate.setFullYear(annoEvento); // Usa l'anno corrente per il confronto
    }
    
    eventoDate.setHours(0, 0, 0, 0);

    if (eventoDate < oggi) {
        eventoDate.setFullYear(annoEvento + 1);
    }

    const diff = eventoDate.getTime() - oggi.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const calcolaOccorrenza = (dataOriginale, annoTarget, tipoEvento) => {
    if (!dataOriginale || !annoTarget) return null;
    const annoInizio = new Date(dataOriginale).getFullYear();
    const diff = annoTarget - annoInizio;
    if (diff <= 0) return null;
    if (tipoEvento === "Compleanno") return `${diff} Anni`;
    if (tipoEvento === "Anniversario") return `${diff}° Anniv.`;
    return null;
};

export const isValidParticipants = (text) => {
    const validPattern = /^[a-zA-Z0-9\p{L}\s,.]*$/u;
    return validPattern.test(text) && !/\n/.test(text);
};

export const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

export const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return amount;
    // Use 'it-IT' locale for dot as thousand separator and comma for decimals
    return amount.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const formatFixedDate = (mmdd) => {
    if (!mmdd || !mmdd.includes('-')) return '';
    const [month, day] = mmdd.split('-');
    // Create a date object (year is irrelevant) to use toLocaleDateString for formatting
    const date = new Date(2000, parseInt(month, 10) - 1, parseInt(day, 10));
    return date.toLocaleDateString('it-IT', { month: 'long', day: 'numeric' });
};

export async function getCroppedImg(image, crop) {
    if (!crop || !image) {
        return null;
    }


    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.floor(crop.width * scaleX);
    canvas.height = Math.floor(crop.height * scaleY);

    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    ctx.drawImage(
        image,
        cropX,
        cropY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
    );

    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 1));

    if (!blob) {
        console.error('Failed to create blob');
        return null;
    }

    const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 512,
        useWebWorker: true,
    };

    try {
        const compressedFile = await imageCompression(blob, options);
        return new File([compressedFile], "avatar.jpg", {
            type: compressedFile.type,
            lastModified: Date.now(),
        });
    } catch (error) {
        console.error('Image compression error:', error);
        return null;
    }
}
