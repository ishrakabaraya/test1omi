"use client"
import React from 'react'
import { toast } from 'sonner'

import { useEffect } from 'react';

export const normalToast = () => {



    return (
        <></>
    )
}

export const WarningToast = ({ warning }: { warning: any }) => {
    React.useEffect(() => {
        const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 1000));
        toast.promise(promise, {
            loading: 'Loading...',
            success: (data) => {
                return "successfully logged in";
            },
            error: 'Error',
        });
    }, []);
    return (
        <></>
    )
}
