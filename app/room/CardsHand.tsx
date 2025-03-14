"use client";
import React from 'react'
import { IKImage } from 'imagekitio-next';

type cardType = {
    cardName: string,
    cardPlayer: string
}
const CardsHand = ({ Cards }: { Cards: cardType[] }) => {
    const urlEndpoint = "https://ik.imagekit.io/m61ypgg2m"
    return (
        <div className='grid grid-cols-2 gap-[20vw] rotate-0 '>
            {Cards && Cards.map((e, i) =>
                <div key={i} className='
                w-[10vw] h-[15.58vw] relative'>
                    <IKImage urlEndpoint={urlEndpoint} path={e.cardName} alt="Greeting image"
                        style={{
                            transform: `rotate(${90 * (i + 1) + 45}deg)`
                        }}
                        fill
                    />
                    {i + 1}
                </div>
            )
            }
        </div>
    )
}

export default CardsHand