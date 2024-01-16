'use server';

import {type DatabaseUser, db} from '@/lib/db';
import {Argon2id} from 'oslo/password';
import {lucia} from '@/lib/auth';
import {cookies} from 'next/headers';

export async function login(username: string, password: string): Promise<{ success: boolean; error?: string; }> {
    // .. some checks on username/password

    const existingUser = db.prepare("SELECT * FROM user WHERE username = ?").get(username) as
        | DatabaseUser
        | undefined;
    if (!existingUser) {
        return {
            success: false,
            error: "Incorrect username or password"
        };
    }

    const validPassword = await new Argon2id().verify(existingUser.password, password);
    if (!validPassword) {
        return {
            success: false,
            error: "Incorrect username or password"
        };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    
    return {
        success: true
    }
}