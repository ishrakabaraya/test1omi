// import React, { useActionState } from 'react'
import { auth, signIn, signOut } from '@/auth'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { WarningToast } from './MakeAToast';
import { Suspense } from 'react';
import Wallet from './Wallet';
import SigninClient from './SigninClient';
import { Skeleton } from './ui/skeleton';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export const experimental_ppr = true;

const Navbar = async () => {
    const session = await auth()


    const { name, email, image } = session?.user || { name: "user", email: "user", image: "user" };


    return (
        <>
            <header>
                <nav className='flex justify-between items-center  text-white relative shadow-sm font-mono p-3 bg-[#121619]  mb-5' role='navigation ' >


                    {!session ? (
                        <div className='z-10'>

                            <SigninClient />
                            <form action={
                                async () => {
                                    'use server';
                                    const promiseToast = await signIn()

                                }
                            } className="signin_server">
                                <button type='submit'>

                                </button>                         </form>
                        </div>

                    ) : (
                        <>


                            <Popover>
                                <PopoverTrigger>
                                    <Avatar className='text-black z-10'>
                                        <AvatarImage src={image || "https://lh3.googleusercontent.com/a/ACg8ocJZ2mp_oLz-iIFQqLXHima3C3K0iFQUvo0QhLzoxk3dx5RGKRU=s96-c"}
                                            alt={name || ""} />
                                        <AvatarFallback>{name || "user"}</AvatarFallback>
                                    </Avatar>

                                </PopoverTrigger>

                                <PopoverContent>
                                    <form action={
                                        async () => {
                                            'use server';
                                            await signOut({ redirectTo: '/' })

                                        }
                                    }>
                                        <button type='submit'>
                                            Logout
                                        </button>

                                    </form>

                                </PopoverContent>
                            </Popover>



                            <Suspense fallback={<Skeleton className=' bg-slate-400 w-10 h-3  mx-6' />}>
                                <div className='flex justify-between mx-3 z-10'>
                                    {name || "user"}
                                    <Wallet email={email || ""} />
                                </div>

                            </Suspense>

                            <Suspense fallback={''}>
                                <WarningToast warning={session} />
                            </Suspense>
                        </>
                    )}
                </nav>

            </header>
        </>
    )
}

export default Navbar