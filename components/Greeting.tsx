"use client";
import React from 'react';
import { IKImage } from "imagekitio-next";

const urlEndpoint = "https://ik.imagekit.io/m61ypgg2m"


const Greeting = () => {
    return (
        <div className=' m-auto w-full max-w-lg absolute bottom-0 left-1/2 -translate-x-1/2 greeting_image'>
            <IKImage urlEndpoint={urlEndpoint} path="/peaky6_crop.jpg" alt="Greeting text" />
        </div>
    )
}

export default Greeting