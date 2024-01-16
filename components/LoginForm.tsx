'use client';

import {useState} from 'react';
import {login} from '@/actions/login';
import {useRouter} from 'next/navigation';

export function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    
    async function tryLogin() {
        const response = await login(username, password);
        
        if (response.success) {
            router.push('/')
        } else {
            alert(response.error ?? 'error');
        }
    }
    
    return (
        <>
            <label htmlFor="username">Username</label>
            <input name="username" id="username" value={username} onChange={x => setUsername(x.target.value)} />
            <br/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={password} onChange={x => setPassword(x.target.value)} />
            <br/>
            <button onClick={tryLogin}>Continue</button>
        </>
    );
};