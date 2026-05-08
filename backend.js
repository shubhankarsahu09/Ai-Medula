// ==========================================
// AI MEDULLA — backend.js
// ==========================================

const SB_URL = 'https://lkfvjbafvqckfxfbtsts.supabase.co';
const SB_KEY = 'sb_publishable_GfaJ3TqvmF5KhFg8ODpgpw_BP8xbc_G';
// Define Backend object first
const Backend = {
    // ... logic will use supabaseClient which might be null initially
};

window.Backend = Backend;

let supabaseClient = null;
try {
    const lib = window.supabase || (typeof supabase !== 'undefined' ? supabase : null);
    if (lib && typeof lib.createClient === 'function') {
        supabaseClient = lib.createClient(SB_URL, SB_KEY);
    }
} catch (e) {
    console.error('Backend: Initialization error:', e);
}

// Implement the methods
Backend.getAllData = async function() {
    if (!supabaseClient) return { tools: [], categories: {} };

    try {
        // Fetch Categories
        let { data: cats, error: catErr } = await supabaseClient.from('categories').select('*');
        if (catErr) throw catErr;

        // Seed defaults if empty
        if (!cats || cats.length === 0) {
            const defaults = [
                { id: 'llm', name: 'LLM & Chatbots', icon: 'ph-chat-circle-text' },
                { id: 'image', name: 'Image Generation', icon: 'ph-image' },
                { id: 'code', name: 'Coding Assistants', icon: 'ph-code' },
                { id: 'video', name: 'Video & Audio', icon: 'ph-video-camera' },
                { id: 'productivity', name: 'Productivity', icon: 'ph-briefcase' }
            ];
            const { data: newCats, error: insErr } = await supabaseClient.from('categories').insert(defaults).select();
            if (insErr) throw insErr;
            cats = newCats;
        }

        const categoriesInfo = (cats || []).reduce((acc, cat) => {
            acc[cat.id] = { name: cat.name, icon: cat.icon };
            return acc;
        }, {});

        // Fetch Tools
        let { data: tools, error: toolErr } = await supabaseClient.from('tools').select('*').order('created_at', { ascending: false });
        if (toolErr) throw toolErr;

        return { tools: tools || [], categories: categoriesInfo };
    } catch (err) {
        console.error('Backend: API Error:', err.message);
        return { tools: [], categories: {} };
    }
};

Backend.addTool = async function(tool) {
    return await supabaseClient.from('tools').insert([tool]);
};

Backend.updateTool = async function(id, updates) {
    return await supabaseClient.from('tools').update(updates).eq('id', id);
};

Backend.deleteTool = async function(id) {
    return await supabaseClient.from('tools').delete().eq('id', id);
};

Backend.addCategory = async function(id, name, icon = 'ph-folder-star') {
    return await supabaseClient.from('categories').insert([{ id, name, icon }]);
};

Backend.updateCategory = async function(id, name) {
    return await supabaseClient.from('categories').update({ name }).eq('id', id);
};

Backend.deleteCategory = async function(id) {
    return await supabaseClient.from('categories').delete().eq('id', id);
};

// Auth Operations
Backend.signUp = async function(email, password) {
    return await supabaseClient.auth.signUp({ email, password });
};

Backend.signIn = async function(email, password) {
    return await supabaseClient.auth.signInWithPassword({ email, password });
};

Backend.signOut = async function() {
    return await supabaseClient.auth.signOut();
};

Backend.resetPassword = async function(email) {
    return await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.href
    });
};

Backend.getCurrentUser = async function() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    return user;
};

Backend.updateUserPassword = async function(newPassword) {
    return await supabaseClient.auth.updateUser({ password: newPassword });
};
