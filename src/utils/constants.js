export const RELAZIONI_DEFAULT = ["Amico/a", "Moglie", "Marito", "Fidanzato/a", "Papà", "Mamma", "Figlio/a", "Fratello/Sorella", "Collega"];
export const EVENT_TYPES_DEFAULT = ["Compleanno", "Natale", "Anniversario", "San Valentino", "Onomastico", "Laurea"];

export const THEMES = {
    default: { id: 'default', name: 'Classico', primary: '#4f46e5', secondary: '#f59e0b', accent: '#e0e7ff', textAccent: '#3730a3' },
    logo: { id: 'logo', name: 'Corallo', primary: '#FF7F50', secondary: '#25A79B', accent: '#FEF2F2', textAccent: '#991B1B' },
    ocean: { id: 'ocean', name: 'Oceano', primary: '#0284c7', secondary: '#06b6d4', accent: '#e0f2fe', textAccent: '#075985' },
    forest: { id: 'forest', name: 'Foresta', primary: '#059669', secondary: '#84cc16', accent: '#d1fae5', textAccent: '#064e3b' },
    autumn: { id: 'autumn', name: 'Autunno', primary: '#D97706', secondary: '#F59E0B', accent: '#FEF3C7', textAccent: '#92400E' }
};

export const DB_SUGGERIMENTI = {
    generici: [
        { nome: "Buono Amazon", link: "https://www.amazon.it/s?k=buono+regalo&tag=giftminder-21" },
        { nome: "Powerbank Solare", link: "https://www.amazon.it/s?k=powerbank+solare&tag=giftminder-21" },
        { nome: "Zaino Tech", link: "https://www.amazon.it/s?k=zaino+laptop&tag=giftminder-21" },
        { nome: "Borraccia Termica", link: "https://www.amazon.it/s?k=borraccia+termica&tag=giftminder-21" },
        { nome: "Speaker Bluetooth", link: "https://www.amazon.it/s?k=speaker+bluetooth&tag=giftminder-21" },
        { nome: "Organizer Scrivania", link: "https://www.amazon.it/s?k=organizer+scrivania&tag=giftminder-21" },
        { nome: "Cuscino Viaggio", link: "https://www.amazon.it/s?k=cuscino+viaggio+memory&tag=giftminder-21" },
        { nome: "Tazza Personalizzata", link: "https://www.amazon.it/s?k=tazza+divertente&tag=giftminder-21" },
        { nome: "Caricatore Wireless", link: "https://www.amazon.it/s?k=caricatore+wireless&tag=giftminder-21" },
        { nome: "Agenda Moleskine", link: "https://www.amazon.it/s?k=moleskine&tag=giftminder-21" },
        { nome: "Penna Parker", link: "https://www.amazon.it/s?k=penna+parker&tag=giftminder-21" },
        { nome: "Set Sommelier", link: "https://www.amazon.it/s?k=set+vino&tag=giftminder-21" }
    ],
    Compleanno: [
        { nome: "Kindle", link: "https://www.amazon.it/s?k=kindle&tag=giftminder-21" },
        { nome: "Smartwatch", link: "https://www.amazon.it/s?k=smartwatch&tag=giftminder-21" },
        { nome: "Cuffie Noise Cancelling", link: "https://www.amazon.it/s?k=cuffie+anc&tag=giftminder-21" },
        { nome: "Set Cocktail", link: "https://www.amazon.it/s?k=set+barman&tag=giftminder-21" },
        { nome: "LEGO Icons", link: "https://www.amazon.it/s?k=lego+adulti&tag=giftminder-21" },
        { nome: "Fotocamera Istantanea", link: "https://www.amazon.it/s?k=instax+mini&tag=giftminder-21" },
        { nome: "Massaggiatore Collo", link: "https://www.amazon.it/s?k=massaggiatore+collo&tag=giftminder-21" },
        { nome: "Telescopio", link: "https://www.amazon.it/s?k=telescopio+astronomico&tag=giftminder-21" },
        { nome: "Giradischi Vintage", link: "https://www.amazon.it/s?k=giradischi&tag=giftminder-21" },
        { nome: "Macchina Caffè", link: "https://www.amazon.it/s?k=macchina+caffe+espresso&tag=giftminder-21" },
        { nome: "Drone con Telecamera", link: "https://www.amazon.it/s?k=drone&tag=giftminder-21" },
        { nome: "Tablet", link: "https://www.amazon.it/s?k=tablet&tag=giftminder-21" }
    ],
    Natale: [
        { nome: "Cesto Gourmet", link: "https://www.amazon.it/s?k=cesto+natalizio&tag=giftminder-21" },
        { nome: "Luci Smart", link: "https://www.amazon.it/s?k=philips+hue&tag=giftminder-21" },
        { nome: "Maglione Natalizio", link: "https://www.amazon.it/s?k=maglione+natale&tag=giftminder-21" },
        { nome: "Gioco da Tavolo", link: "https://www.amazon.it/s?k=giochi+da+tavolo&tag=giftminder-21" },
        { nome: "Candela Yankee Candle", link: "https://www.amazon.it/s?k=yankee+candle&tag=giftminder-21" },
        { nome: "Coperta Ponderata", link: "https://www.amazon.it/s?k=coperta+ponderata&tag=giftminder-21" },
        { nome: "Set Degustazione Tè", link: "https://www.amazon.it/s?k=set+regalo+te&tag=giftminder-21" },
        { nome: "Echo Dot", link: "https://www.amazon.it/s?k=echo+dot&tag=giftminder-21" },
        { nome: "Calze Divertenti", link: "https://www.amazon.it/s?k=calze+pizza&tag=giftminder-21" },
        { nome: "Pandoro Artigianale", link: "https://www.amazon.it/s?k=pandoro+artigianale&tag=giftminder-21" },
        { nome: "Proiettore Stelle", link: "https://www.amazon.it/s?k=proiettore+galassia&tag=giftminder-21" },
        { nome: "Set Bombe da Bagno", link: "https://www.amazon.it/s?k=bombe+da+bagno&tag=giftminder-21" }
    ],
    Anniversario: [
        { nome: "Smartbox Coppia", link: "https://www.amazon.it/s?k=smartbox+coppia&tag=giftminder-21" },
        { nome: "Mappa Stellare", link: "https://www.amazon.it/s?k=mappa+stellare&tag=giftminder-21" },
        { nome: "Cornice Digitale", link: "https://www.amazon.it/s?k=cornice+digitale&tag=giftminder-21" },
        { nome: "Set Spa Luxury", link: "https://www.amazon.it/s?k=set+spa+regalo&tag=giftminder-21" },
        { nome: "Proiettore Portatile", link: "https://www.amazon.it/s?k=mini+proiettore&tag=giftminder-21" },
        { nome: "Calici Vino Incisi", link: "https://www.amazon.it/s?k=calice+vino+inciso&tag=giftminder-21" },
        { nome: "Cena a Lume di Candela", link: "https://www.amazon.it/s?k=kit+cena+romantica&tag=giftminder-21" },
        { nome: "Weekend Fuori Porta", link: "https://www.amazon.it/s?k=cofanetto+viaggio&tag=giftminder-21" }
    ],
    "San Valentino": [
        { nome: "Cioccolatini Luxury", link: "https://www.amazon.it/s?k=cioccolatini+regalo&tag=giftminder-21" },
        { nome: "Album Foto", link: "https://www.amazon.it/s?k=album+foto+coppia&tag=giftminder-21" },
        { nome: "Orso di Rose", link: "https://www.amazon.it/s?k=orso+rose&tag=giftminder-21" },
        { nome: "Gioiello Personalizzato", link: "https://www.amazon.it/s?k=collana+nome&tag=giftminder-21" },
        { nome: "Cuscino Cuore", link: "https://www.amazon.it/s?k=cuscino+cuore&tag=giftminder-21" },
        { nome: "Chiave del Cuore", link: "https://www.amazon.it/s?k=portachiavi+coppia&tag=giftminder-21" }
    ],
    Laurea: [
        { nome: "Penna Stilografica", link: "https://www.amazon.it/s?k=penna+stilografica&tag=giftminder-21" },
        { nome: "Borsa Ventiquattrore", link: "https://www.amazon.it/s?k=borsa+lavoro+pelle&tag=giftminder-21" },
        { nome: "Smartwatch Elegante", link: "https://www.amazon.it/s?k=smartwatch+elegante&tag=giftminder-21" }
    ]
};
