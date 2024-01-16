'use client';

import {User} from 'lucia';
import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from 'react';
import {getAccount} from '@/actions/getAccount';

interface IAuthContext {
    loading: boolean;
    status: 'authenticated' | 'unauthenticated';
    user: User | null;
    reloadUser: () => any;
}

const AuthContext = createContext<IAuthContext>({
    loading: false,
    status: 'unauthenticated',
    user: null,
    reloadUser: () => {}
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const status = useMemo(() => {
        if (user) {
            return 'authenticated';
        }

        return 'unauthenticated';
    }, [loading, user]);

    useEffect(() => {
        setLoading(true);
        loadUser().then(() => setLoading(false));
    }, []);

    async function loadUser() {
        const user = await getAccount();
        setUser(user);
    }

    return (
        <AuthContext.Provider value={{ loading, user, status, reloadUser: loadUser }}>{children}</AuthContext.Provider>
    );
}

export const useSession = () => {
    const session = useContext(AuthContext);

    return session;
};