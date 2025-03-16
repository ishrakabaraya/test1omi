"use client";
import React, { useActionState, useRef } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { MessageCircle, SendHorizontal } from 'lucide-react';
import { MessageSent } from './roomActions';

const MessageBox = ({ room, email }: { room: string, email: string }) => {
    const closebut = useRef<HTMLButtonElement>(null);


    const handleCreateForm = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                id: formData.get("id") as string,
            };
            // console.log(formValues)


            const result = await MessageSent(room, email, formData);
            //console.log(result)
            // if (result.status == "SUCCESS") {

            // } else {

            // }
            if (closebut.current) {
                closebut.current.click();
            }

            return result;
        } catch (e) {
            // console.log(e)
            if (closebut.current) {
                closebut.current.click();
            }
            console.log(e)

            return { ...prevState, error: "Unexpected  Error Occured", status: "ERROR" };
        }

    }


    const [stateCreate, formActionJoin, isPendingCreate] = useActionState(handleCreateForm, "INITIAL");
    return (
        <div>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="default" className='fixed top-[20vh] right-0 '>
                        <MessageCircle />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='text-black'>
                            <form action={formActionJoin} className='flex items-center gap-3'>
                                <input type="text" className='w-full border p-2' placeholder='Message' name='message' />
                                <br />
                                <Button type="submit" disabled={isPendingCreate}>
                                    <SendHorizontal />
                                </Button>
                            </form>

                        </AlertDialogTitle>
                        <AlertDialogDescription>

                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>

                        <AlertDialogAction className='p-0 h-0' ref={closebut}></AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}

export default MessageBox