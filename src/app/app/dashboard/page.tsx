"use client"

import {Button, Stack, Typography} from "@mui/material";
import {useRouter} from "next/navigation";
import Cookies from 'js-cookie';

function DashboardPage() {
    const router = useRouter()

    function handleLogout() {
        console.log("Removing authToken")
        Cookies.remove('authToken', {path: '/', sameSite: 'Strict', secure: true});
        router.push('/');
    }

    return (
        <Stack>
            <Typography>Dashboard</Typography>

            <h3>1. CRUD</h3>
            <h3>2. PASSWORD RESET</h3>
            <h3>3. KIBANA DASHBOARD WITH SENSORS</h3>

            <Button onClick={() => handleLogout()}>Logout</Button>
            <iframe
                style={{
                    border: 'none',
                    width: '100%',
                    height: '600px'
                }}
                src="http://localhost:5601/app/kibana#/visualize/edit/e2cb2fd0-8fee-11ef-907e-7b327a24461e?embed=true">
            </iframe>
        </Stack>
    )
}

export default DashboardPage;