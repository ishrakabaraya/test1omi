"use client"
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
import { Button } from '@/components/ui/button'
import { RemoveFromBuffer } from "@/lib/actions"
import { Club, Diamond, Heart, Spade } from "lucide-react"
import { useActionState, useRef } from "react"
import { toast } from "sonner"
import { setThurumpu } from "./gameRoomAcrions"
const AlertChooser = ({ room }: { room: string }) => {

    const handleCancelForm = async (prevState: any, formData: FormData) => {
        try {

            // console.log(formValues)


            const result = await setThurumpu(prevState, formData);
            //console.log(result)
            if (result.status == "SUCCESS") {
                toast.success('Success')

            } else {
                toast.error(result.error || "error")
            }

            return result;
        } catch (e) {
            // console.log(e)

            toast.error('error')
            return { ...prevState, error: "Unexpected  Error Occured", status: "ERROR" };
        }

    }


    const [stateCreate, formActionCancel, isPendingCreate] = useActionState(handleCancelForm, "INITIAL");

    const cancel = useRef<HTMLButtonElement>(null)
    const accept = useRef<HTMLButtonElement>(null)
    return (
        <div>
            <AlertDialog defaultOpen={true}>
                <AlertDialogTrigger asChild>
                    <Button variant="ghost">
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-slate-800 flex justify-between">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Choose
                        </AlertDialogTitle>
                        <AlertDialogDescription>

                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>

                    </AlertDialogFooter>


                    <form action={formActionCancel} className="flex  gap-9">
                        <Button disabled={isPendingCreate} type="submit" name="cardType" value={'club'} ><Club /></Button>
                        <Button disabled={isPendingCreate} type="submit" name="cardType" value={'diamond'}><Diamond /></Button>
                        <Button disabled={isPendingCreate} type="submit" name="cardType" value={'heart'}><Heart /></Button>
                        <Button disabled={isPendingCreate} type="submit" name="cardType" value={'spade'}><Spade /></Button>

                    </form>
                    {/* <form action={formActionCancel}>

    <input type="text" name="Accept" value={'false'} readOnly />
    <Button type="submit" variant="ghost"
        className="text-black"
        onClick={() => cancel.current && cancel.current.click()}
        disabled={isPendingCreate}
    >
        Cancel
    </Button>
</form> */}
                    {/* <AlertDialogCancel ref={cancel}
                        className=" p-0  opacity-0">
                    </AlertDialogCancel> */}

                    {/* <form action={formActionCancel}>

    <input type="text" name="Accept" value={'true'} readOnly />
    <Button type="submit" variant="ghost"
        className="text-black"
        onClick={() => accept.current && accept.current.click()}
        disabled={isPendingCreate}
    >
        allow
    </Button>
</form> */}


                    {/* <AlertDialogAction ref={accept} className=" p-0  !opacity-0">

                    </AlertDialogAction> */}

                </AlertDialogContent>
            </AlertDialog>
        </div >
    )
}

export default AlertChooser