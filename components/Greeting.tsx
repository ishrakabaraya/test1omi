"use client";
import React from 'react';
import { IKImage } from "imagekitio-next";

const urlEndpoint = "https://ik.imagekit.io/m61ypgg2m"


const Greeting = () => {
    return (
        <>

            <div className=' m-auto w-full max-w-lg absolute bottom-0 left-1/2 -translate-x-1/2 greeting_image'>
                <IKImage urlEndpoint={urlEndpoint} path="/peaky6_crop.jpg" alt="Greeting image" />
            </div>
            <div className='text-white font-extrabold text-4xl greeting_text'>

                <span style={{ "--i": 1 } as React.CSSProperties}>L</span>
                <span style={{ "--i": 2 } as React.CSSProperties}>E</span>
                <span style={{ "--i": 3 } as React.CSSProperties}>T'</span>
                <span style={{ "--i": 4 } as React.CSSProperties}>S</span>
                <span style={{ "--i": 5 } as React.CSSProperties}>M</span>
                <span style={{ "--i": 6 } as React.CSSProperties}>A</span>
                <span style={{ "--i": 7 } as React.CSSProperties}>K</span>
                <span style={{ "--i": 8 } as React.CSSProperties}>E</span>
                <br />
                <span style={{ "--i": 9 } as React.CSSProperties}>M</span>
                <span style={{ "--i": 10 } as React.CSSProperties}>O</span>
                <span style={{ "--i": 11 } as React.CSSProperties}>N</span>
                <span style={{ "--i": 12 } as React.CSSProperties}>E</span>
                <span style={{ "--i": 13 } as React.CSSProperties}>Y</span>

            </div>
        </>
    )
}

export default Greeting