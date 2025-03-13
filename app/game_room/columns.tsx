"use client"
import React, { useState, useActionState } from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { toast } from 'sonner';
import { JoinRoom } from '@/lib/actions';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    _id: string
    payment: number

}


export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "_id",
        header: () => <div className="text-right">_id</div>,
        cell: ({ row }) => {
            const [created, setCreated] = useState(true);
            const handleCreateForm = async (prevState: any, formData: FormData) => {
                try {
                    const formValues = {
                        id: formData.get("id") as string,
                    };
                    // console.log(formValues)


                    const result = await JoinRoom(prevState, formData);
                    //console.log(result)
                    if (result.status == "SUCCESS") {
                        toast.success('Joined room Waiting for permission....')
                        setCreated(true)
                    } else {
                        toast.error(result.error || "error")
                    }

                    return result;
                } catch (e) {
                    // console.log(e)

                    toast.error('error')
                    return { ...prevState, error: "Unexpected  Error Occured", status: "ERROR" };
                }

            }


            const [stateCreate, formActionJoin, isPendingCreate] = useActionState(handleCreateForm, "INITIAL");

            // const id = row.getValue("_id")

            return <div className="text-right font-medium">
                <form action={formActionJoin}>
                    <input type="text" name="id" value={row.getValue("_id")} hidden readOnly />
                    <Button className="py-0 m-0 " type="submit" disabled={isPendingCreate}>join</Button>
                </form>
            </div>
        },
    },

    {
        accessorKey: "payment",
        header: ({ column }) => {
            return (
                <div className=" flex justify-end">
                    <Button
                        className=""
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")

                        }
                    >
                        Amount
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const payment = parseFloat(row.getValue("payment"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "LKR",
            }).format(payment)

            return <div className="text-right font-medium">{formatted}</div>
        },

    },
]
