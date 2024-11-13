import {Link, Stack, Typography} from "@mui/material";
import NextLink from "next/link";

function IndexPage() {

    return (
        <Stack>
            <Typography>Index page</Typography>
            <Link component={NextLink} href={'app/auth/login'}>
                Login
            </Link>
        </Stack>
    )
}

export default IndexPage;