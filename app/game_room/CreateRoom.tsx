"use client";
import React, { useState, useActionState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { formSchema } from "@/lib/validation";
import { bufferToChosen, createPitch, get10Rows } from "@/lib/actions";
import { toast } from 'sonner';
import { z } from "zod";
import { SanityLive } from '@/sanity/lib/live';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';


const CreateRoom = () => {
    const [created, setCreated] = useState("");
    const [payment, setPayment] = useState("");





    const handleCreateForm = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                // type: formData.get("type") as string,
                payment: formData.get("payment") as string,
                // rounds: formData.get("rounds") as string,

            };
            setPayment(payment)


            await formSchema.parseAsync(formValues);
            const result = await createPitch(prevState, formData);
            //console.log(result)
            if (result.status == "CANCELED") {
                setCreated("")

                toast.success('Canceled room successfully...')

            }
            if (result.status == "SUCCESS") {
                toast.success('Created room successfully....')
                setCreated(result._id)


            }
            // else {
            //     toast.error("reload")
            // }

            return result;
        } catch (e) {
            // console.log(e)
            if (e instanceof z.ZodError) {

                toast.error('invalid ')
                return { ...prevState, error: "Room Validation failed ", status: "ERROR" };
            }
            toast.error('error')
            return { ...prevState, error: "Unexpected  Error Occured", status: "ERROR" };
        }

    }


    const [stateCreate, formActionCreate, isPendingCreate] = useActionState(handleCreateForm, "INITIAL");

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Custom Room</CardTitle>
                {/* <CardDescription>
            Change your password here. After saving, you'll be logged out.
        </CardDescription> */}
            </CardHeader>
            <CardContent className="space-y-2">
                <form action={formActionCreate}>
                    <div className="grid w-full items-center gap-4">

                        {/* <div className="flex flex-col space-y-1.5" >
                            <Label htmlFor="type_select">Type</Label>
                            <Select required name="type">
                                <SelectTrigger id="type_select">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="public">public</SelectItem>
                                    <SelectItem value="private">private</SelectItem>

                                </SelectContent>
                            </Select>
                        </div> */}

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="payment">Payment</Label>
                            <Input id="payment" placeholder="Amount in Rs." type='number' required name="payment" onChange={(e) => { setPayment(e.target.value) }} value={payment} />
                        </div>

                        {/* <div className="flex flex-col space-y-1.5" >
                            <Label htmlFor="rounds_select">Rounds</Label>
                            <Select required name="rounds">
                                <SelectTrigger id="rounds_select">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                    <SelectItem value="4">4</SelectItem>
                                </SelectContent>
                            </Select>
                        </div> */}
                        <input name="cancel" type="text" hidden readOnly value='' />
                        {/* {(room || created) ? <Button type='submit' variant={'destructive'} disabled={isPendingCreate}>cancel</Button> : */}

                        <Button type='submit' disabled={isPendingCreate}>Make</Button>



                    </div>
                </form>
            </CardContent>
            {/* <CardFooter>
        <Button>Save password</Button>
    </CardFooter> */}

        </Card>
    )
}

export default CreateRoom