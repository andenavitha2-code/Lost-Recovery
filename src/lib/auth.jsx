import { createContext, useContext, useState } from 'react';
import { getList } from './api';
const Ctx = createContext(null);
const KEY = 'lf_session';
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(KEY) || 'null');
        }
        catch {
            return null;
        }
    });
    async function login(email, password) {
        const found = await getList('users', { email: email.trim().toLowerCase(), password });
        const u = found[0];
        if (!u)
            throw new Error('Email or password is incorrect.');
        if (!u.active)
            throw new Error('This account is disabled. Contact an administrator.');
        const { password: _pw, ...safe } = u;
        localStorage.setItem(KEY, JSON.stringify(safe));
        setUser(safe);
        return safe;
    }
    function logout() { localStorage.removeItem(KEY); setUser(null); }
    const hasRole = (...r) => !!user && r.includes(user.role);
    return <Ctx.Provider value={{ user, login, logout, hasRole }}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);
