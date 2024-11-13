"use client"

import {TextField, Stack, Typography, Button, Link} from '@mui/material';
import NextLink from 'next/link';
import Form from "@/components/Form/Form";
import {useAuth} from "@/hooks/useAuth";


function LoginPage() {
    const {handleLogin} = useAuth();
    const handleFormSubmit = async (formData) => handleLogin(formData);

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