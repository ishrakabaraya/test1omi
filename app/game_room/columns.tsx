"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button"
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
            const id = row.getValue("_id")

            return <div className="text-right font-medium">
                <Button>join</Button>

            </div>
        },
    },

    {
        accessorKey: "payment",
        header: () => <div className="text-center">Amount</div>,
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
