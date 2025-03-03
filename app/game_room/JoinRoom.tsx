
import React from 'react';
import { Payment, columns } from "./columns"
import { DataTable } from "./data-tablr"
import { get10Rows } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { ROOM_MAXIMUM_10 } from '@/sanity/queries';
import TestLive from './TestLive';
const JoinRoom = async () => {



    const { data: firstRow } = await sanityFetch({ query: ROOM_MAXIMUM_10 }).then(d => {
        console.log(d)
        return d
    });

    return (
        <div className="container mx-auto ">
            <DataTable columns={columns} data={firstRow} />
            <SanityLive />
        </div>
    )
}

export default JoinRoom