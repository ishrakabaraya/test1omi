"use client";
import React, { useEffect, useRef, useState } from 'react'
import { ImageKitProvider, IKImage, IKUpload } from "imagekitio-next";
import { AlertCircle } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { LoaderCircle } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { CircleCheck } from 'lucide-react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const publicKey = "public_aOAGxjsN9l7cX4wezf16EWT68Yw=";
const urlEndpoint = "https://ik.imagekit.io/m61ypgg2m";
const authenticator = async () => {
    try {
        const response = await fetch("https://test1omi.vercel.app/api/auth");
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





const onUploadProgress = (progress: any) => {
    console.log("Progressing");
};



const SlipUpload = () => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")
    const [progress, setProgress] = useState(false)
    const onError = (err: any) => {
        setProgress(false)
        setError(err.message)
    };






    const onSuccess = (res: any) => {
        setSuccess(true)
        setProgress(false)
        alertDialog.current?.click()
    };
    const onUploadStart = (res: any) => {
        setProgress(true)

    };

    const uploadRef = useRef(null)
    const alertDialog = useRef(null)
    return (
        <div className='bg-white'>

            <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
                <div>
                    <IKUpload
                        useUniqueFileName
                        ref={uploadRef}
                        onError={onError}
                        onSuccess={onSuccess}
                        onUploadStart={onUploadStart}
                        isPrivateFile={true}
                    />

                </div>
            </ImageKitProvider>
            {progress &&
                <div className='flex items-center gap-6 mt-3'>
                    <LoaderCircle className='animate-spin ' />
                    uploading .......
                </div>
            }


            {error && <Alert variant="destructive" className='mt-3'>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>}
            <Button className='mt-3 mx-0 w-full' onClick={() => {
                uploadRef.current?.abort();
                console.log('hii')

            }}  >cancel</Button>


            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="hidden " ref={alertDialog}></Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>

                            <CircleCheck className=' text-green-400 size-8' /> SUCCESSFUL
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            your receipt uploaded successfully money will be depisitted to your account soon
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>

                        <AlertDialogAction>OK</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default SlipUpload