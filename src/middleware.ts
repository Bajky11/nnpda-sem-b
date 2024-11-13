// middleware.ts
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export async function middleware(req: NextRequest) {
    return NextResponse.next()
    console.log("TOKEN VALIDATION")
    const token = req.cookies.get('authToken');  // Získáme token z cookies
    if (!token) {
        console.log("Token not found")
        return NextResponse.redirect(new URL('/auth/login', req.url));  // Pokud není token, přesměrujeme na login
    }

    console.log(JSON.stringify(token.value))
    // Ověření tokenu a získání uživatelských dat z backendu
    const res = await fetch('http://localhost:8080/api/auth/validate-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: token.value,
    });

    if (res.status === 401 || res.status === 404) {
        console.log("Token not valid")
        const response = NextResponse.redirect(new URL('/auth/login', req.url));
        response.cookies.delete('authToken');
        return response;
    }

    // Získáme data z odpovědi backendu
    const {userId, username} = await res.json();

    // Uložíme uživatelská data do cookies nebo globálního stavu
    const response = NextResponse.next();
    response.cookies.set('userId', userId);  // Uložení userId do cookies
    response.cookies.set('username', username);
    console.log("logged in with token")
    return response;
}

export const config = {
    matcher: [
        '/app/:path*',  // Aplikuje middleware na všechny stránky pod /app/app
    ],
};
