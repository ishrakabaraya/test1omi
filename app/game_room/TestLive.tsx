"use client";
import { getLiveData } from '@/lib/actions';
import React, { useEffect, useState } from 'react'
import { array } from 'zod';

type incoming = {
    _id: string,
    payment: string
}
const TestLive = ({ data }: { data: incoming[] }) => {

    const [arr, setArr] = useState<incoming[]>(data)
    useEffect(() => {
        getLiveData().then((d) => {
            console.log("here : " + d)
            setArr(d)
        })
    }, []);
    return (
        <div>

            {arr.map(i => {

                return <div>
                    {i.payment}
                </div>
            })}

        </div>
    )
}

export default TestLive