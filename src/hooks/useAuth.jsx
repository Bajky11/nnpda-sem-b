import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { postData} from "@/services/apiService"; // Odkaz na soubor, kde máš definované axios funkce

export const useAuth = () => {
    const router = useRouter();

    // Funkce pro přihlášení uživatele
    const handleLogin = async (formData) => {
        console.log('Login data:', formData);
        router.push('/app/dashboard');
        return;
        try {
            // Očekáváme odpověď s tokenem a uživatelskými daty (např. userId, username)
            const response = await postData('/api/auth/login', formData);
            const { token, userId, username } = response;

            if (token) {
                console.log("Saving token to cookies");
                // Uložíme token a další data do cookies
                Cookies.set('authToken', token, { expires: 1, secure: true, sameSite: 'Strict' });

                // Přesměrování na dashboard po úspěšném přihlášení
                router.push('/app/dashboard');
            } else {
                console.error('Unauthorized: Token not found');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    // Funkce pro odhlášení uživatele
    const handleLogout = () => {
        console.log("Removing authToken");
        Cookies.remove('authToken', { path: '/', sameSite: 'Strict', secure: true });
        router.push('/');
    };

    return { handleLogin, handleLogout };
};
