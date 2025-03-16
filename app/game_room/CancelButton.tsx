"use client";
import { Button } from '@/components/ui/button';
import React, { useActionState, useState } from 'react'
import { toast } from 'sonner';
import { cancelButtonAction } from './gameRoomAcrions';

const CancelButton = ({ room, id, email }: { room: string, id: string, email: string }) => {


    const handleCreateForm = async (prevState: any, formData: FormData) => {
        try {


            const result = await cancelButtonAction(room, id, email);
            //console.log(result)
            if (result.status == "SUCCESS") {
                toast.success('Exit room successfully....')
                setButt(false)


            }
            // else {
            //     toast.error("reload")
            // }

            return result;
        } catch (e) {
            // console.log(e)

            toast.error('error')
            return { ...prevState, error: "Unexpected  Error Occured", status: "ERROR" };
        }

    }



    const [stateCreate, formActionCreate, isPendingCreate] = useActionState(handleCreateForm, "INITIAL");

    const [butt, setButt] = useState(true)
    return (
        <>
            {butt ? <form action={
                formActionCreate
            }>


                <Button type='submit' variant={'destructive'} disabled={isPendingCreate}>cancel</Button>
            </form> : ""}
        </>
    )
}

export default CancelButton