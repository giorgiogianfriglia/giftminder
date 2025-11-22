import { supabase } from '../supabaseClient';

export const fetchUserData = async (userId) => {
    const { data, error } = await supabase
        .from('user_data')
        .select('id, persone, custom_relazioni, custom_event_types')
        .maybeSingle();

    if (error && error.code !== 'PGRST116') { // PGRST116 = 'single row not found'
        console.error('Errore nel fetch dei dati utente:', error);
        throw error;
    }
    return data;
};

export const saveUserData = async (userId, dbRowId, updates) => {
    try {
        if (dbRowId) {
            const { data, error } = await supabase
                .from('user_data')
                .update(updates)
                .eq('id', dbRowId)
                .select()
                .single();
            if (error) throw error;
            return data;
        } else {
            const { data, error } = await supabase
                .from('user_data')
                .insert([{ ...updates, user_id: userId }])
                .select()
                .single();
            if (error) throw error;
            return data;
        }
    } catch (err) {
        console.error('Errore nel salvataggio dei dati utente:', err);
        throw err;
    }
};

export const uploadAvatar = async (userId, file) => {
    try {
        const fileName = `${userId}-${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, file);
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
        return data.publicUrl;
    } catch (error) {
        console.error("Errore caricamento immagine:", error);
        throw error;
    }
};
