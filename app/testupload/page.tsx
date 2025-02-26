"use client";
import SlipUpload from '@/components/SlipUpload'
import React from 'react'
import { ImageKitProvider, IKImage, IKUpload } from "imagekitio-next";

const publicKey = "public_aOAGxjsN9l7cX4wezf16EWT68Yw=";
const urlEndpoint = "https://ik.imagekit.io/m61ypgg2m";
const authenticator = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/auth");
        console.log('fetching')
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error}`);
    }
};
const onError = (err: any) => {
    console.log("Error", err);
};

const onSuccess = (res: any) => {
    console.log("Success", res);
};

const onProgress = (progress: any) => {
    console.log("Progress", progress);
};



function page() {


    return (
        <div className='bg-white'>

            <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
                <div>
                    <h2>File upload</h2>
                    <IKUpload fileName="test-upload.png" onError={onError} onSuccess={onSuccess} onProgress={onProgress}>
                    </IKUpload>
                </div>
            </ImageKitProvider>
        </div>
    )
}

export default page