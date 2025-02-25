'use client';
import { auth, signIn, signOut } from '@/auth';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useActionState } from 'react';

const SigninClient = () => {
    const [form, setForm] = useState<HTMLFormElement | null>(null);

    useEffect(() => {
        setForm(document.querySelector('.signin_server') as HTMLFormElement);
    }, []);

    async function action(previousState: any, formData: any) {
        const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 10000));

        if (form) {
            form.requestSubmit();
        }

        toast.promise(promise, {
            loading: 'Loading...',
            success: (data) => {
                return `redirecting to google`;
            },
            error: 'Error',
        });
        return previousState + 1;
    }

    const [state, formAction] = useActionState(action, 0);

    return (
        <div>
            <form action={formAction} >
                <button type='submit' >
                    login
                </button>
            </form>
        </div>
    );
};

export default SigninClient;