import axios from 'axios';

const URL = 'http://localhost:8080';

const api = axios.create({
    baseURL: URL,  // Základní URL API
    headers: {
        'Content-Type': 'application/json',
        // Můžeš přidat i autorizační token nebo jiné hlavičky
    },
});

// Funkce pro GET požadavky
export const getData = async (url: string, params = {}) => {
    try {
        const response = await api.get(url, { params });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Funkce pro POST požadavky
export const postData = async (url: string, data: any) => {
    try {
        const response = await api.post(url, data);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Funkce pro PUT požadavky
export const putData = async (url: string, data: any) => {
    try {
        const response = await api.put(url, data);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Funkce pro DELETE požadavky
export const deleteData = async (url: string) => {
    try {
        const response = await api.delete(url);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Zpracování chyb
const handleApiError = (error: any) => {
    console.error('API Error:', error);
    // Tady můžeš přidat další logiku pro zpracování chyb, například zobrazení zpráv uživateli
};
