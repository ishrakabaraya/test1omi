"use client";
import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { ImageUp } from "lucide-react";
import SlipUpload from "./SlipUpload";



export default function DrawerDialogDemo() {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 512px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className='upload_button  p-[30px] left-1/2 -translate-x-[calc(256px)] bottom-[5vh]'>
                        <ImageUp />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] text-black">
                    <DialogHeader>
                        <DialogTitle>UPLOAD RECEIPT</DialogTitle>
                        <DialogDescription>
                            take a picture of receipt or atm screen and upload here. Money will deposit to your account as soonly as possible.
                        </DialogDescription>
                    </DialogHeader>
                    <ProfileForm />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button className='upload_button p-[35]'>
                    <ImageUp />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>UPLOAD RECEIPT</DrawerTitle>
                    <DrawerDescription>
                        take a picture of receipt or atm screen and upload here. Money will deposit to your account as soonly as possible.

                    </DrawerDescription>
                </DrawerHeader>
                <ProfileForm className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button className=" hidden">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
    return (
        <form className={cn("grid items-start gap-4", className)}>
            <div className="grid gap-2">
                <Label htmlFor="email">Amount</Label>
                <Input type="number" id="amount" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="number" />
            </div>
            <SlipUpload />
            {/* <Button type="submit">Save</Button> */}
        </form>
    )
}
