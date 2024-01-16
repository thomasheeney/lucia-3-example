'use server';

import {validateRequest} from '@/lib/auth';

export async function getAccount() {
    const { user } = await validateRequest();

    return user;
}
