"use client"
import NextLink from "next/link";
import {Button, Link, Stack, TextField, Typography} from "@mui/material";
import Form from "@/app/components/Form/Form";

function RegisterPage() {

    const handleFormSubmit = (formData) => {
        console.log('Login data:', formData);
    };

    const formFields = {
        email: {label: 'Email', type: 'text'},
        password: {label: 'Password', type: 'password'},
        repeatPassword: {label: 'Repeat password', type: 'password'}
    };

    return <Stack>
        <Typography>Registration</Typography>

        <Form fields={formFields} onSubmit={handleFormSubmit}>
            <TextField name="email" fullWidth required/>
            <TextField name="password" fullWidth required/>
            <TextField name="repeatPassword" fullWidth required/>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                register
            </Button>
        </Form>

        <Link component={NextLink} href="login">
            Back to login
        </Link>
    </Stack>
}

export default RegisterPage;