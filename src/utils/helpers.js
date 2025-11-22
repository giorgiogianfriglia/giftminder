import imageCompression from 'browser-image-compression';

export const isValidUrl = (urlString) => {
    try {
        return Boolean(new URL(urlString));
    } catch (e) {
        return false;
    }
};

export const calcolaGiorni = (dataStr) => {
    const oggi = new Date();
    const eventoDate = new Date(dataStr);
    eventoDate.setFullYear(oggi.getFullYear());
    if (eventoDate < new Date(oggi.setHours(0, 0, 0, 0))) eventoDate.setFullYear(oggi.getFullYear() + 1);
    const diff = eventoDate - new Date();
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
