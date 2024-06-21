import { writable } from "svelte/store";

export const setAuthToken = (token: string) => {
    sessionStorage.setItem("AuthorizationToken", `Bearer ${token}`);
};

export async function interceptedFetch(input: string, init: any) {
    const apiURL = import.meta.env.VITE_API_URL;
    const token = getAuthToken();
    if (token) {
        if (!init.headers) {
            init.headers = {};
        }
        init.headers.Authorization = token;
    }
    return fetch(apiURL + input, init);
}

export const getUserId = () => {
    if (typeof localStorage !== 'undefined' && localStorage !== null) {
        return localStorage.getItem("userId");
    } else {
        return null;
    }
}

export const setLoginInfo = (userId: string, isAdmin: string) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("isAdmin", isAdmin);
}

export const removeAuthToken = () => {
    sessionStorage.removeItem("AuthorizationToken");
    localStorage.removeItem("userId");
    window.location.reload();
};

export const getAuthToken = () => {
    if (typeof sessionStorage !== 'undefined' && sessionStorage !== null) {
        return sessionStorage.getItem("AuthorizationToken");
    } else {
        return null;
    }
};

export const isUserLoggedIn = () => {
    return getAuthToken() !== null;
};

export function isUserCustomer() {
    if (!isUserLoggedIn()) return false;
    if (typeof localStorage !== 'undefined' && localStorage !== null) {
        if (localStorage.getItem("isAdmin") === null) {
            return true;
        }
        return localStorage.getItem("isAdmin") === "false";
    } else {
        return false;
    }
}

export const isUserAdmin = () => {
    if (!isUserLoggedIn()) return false;
    if (typeof localStorage !== 'undefined' && localStorage !== null) {
        if (localStorage.getItem("isAdmin") === null) {
            return false;
        }
        return localStorage.getItem("isAdmin") === "true";
    } else {
        return false;
    }
}

export const isUserLogged = writable(getAuthToken());

export async function setUpSessionCookie() {
    const session = await getSessionCookie();
    if (!session) {
        const response = await generateCookie();
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('session', JSON.stringify(data));
        }
    }
}

export async function generateCookie() {
    return await interceptedFetch('/cookie', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({}),
    });
}

export async function getSessionCookie() {
    let session = localStorage.getItem('session')
    if (!session) {
        return null
    }
    let expiry = JSON.parse(session)["expiry"]
    if (!expiry) {
        return null
    }
    if (new Date(expiry) < new Date()) {
        localStorage.removeItem('session')
        return null
    }
    return localStorage.getItem('session')
}

export async function getSessionCookieValue() {
    let session = await getSessionCookie()
    if (!session) {
        return null
    }
    return JSON.parse(session)["value"]
}
