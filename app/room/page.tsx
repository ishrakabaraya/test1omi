"use client";
import React from 'react'
import CardContainer from '@/components/CardContainer';


const page = () => {
    return (
        <div className='room_container flex h-[100vh] w-full bg-black justify-center items-center m-0 p-0'>
            <div className="scene">
                <div className="floor">
                </div>

            </div>

            <CardContainer cardList={['/2C.svg', '/3D.svg', '/2D.svg', '/3D.svg', '/2C.svg', '/3D.svg', '/2D.svg', '/3D.svg']} />

        </div>
    )
}

export default page