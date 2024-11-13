"use client"

import {TextField, Stack, Typography, Button, Link} from '@mui/material';
import NextLink from 'next/link';
import Form from "@/app/components/Form/Form";
import {useRouter} from "next/navigation";
import {postData} from "@/app/services/apiService";
import Cookies from 'js-cookie';


function LoginPage() {
    const router = useRouter();

    const handleFormSubmit = async (formData) => {
        console.log('Login data:', formData);

        try {
            // Očekáváme odpověď s tokenem a uživatelskými daty (např. userId, username)
            const response = await postData('/api/auth/login', formData);
            const {token, userId, username} = response;

            if (token) {
                console.log("setting token")
                // Uložíme token a další data do cookies
                Cookies.set('authToken', token, {expires: 1, secure: true, sameSite: 'Strict'});

                // Přesměrování na dashboard po úspěšném přihlášení
                router.push('/app/dashboard');
            } else {
                console.error('Unauthorized: Token not found');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const formFields = {
        username: {label: 'Username', type: 'text'},
        password: {label: 'Password', type: 'password'},
    };

    return (
        <Stack spacing={3}>
            <Typography variant="h4">Login</Typography>

            <Form fields={formFields} onSubmit={handleFormSubmit}>
                <TextField name="username" fullWidth required/>
                <TextField name="password" fullWidth required/>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    login
                </Button>
            </Form>

            <Link component={NextLink} href="register">
                Create an account
            </Link>
        </Stack>
    );
}

export default LoginPage;