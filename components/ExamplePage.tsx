'use client';

import {useSession} from '@/contexts/AuthContext';

export function ExamplePage() {
    const { user } = useSession();
    if (!user) {
        return 'Not authenticated';
    }
    
    
    return (
        <h1>Username: {user.username}</h1>
    );
}