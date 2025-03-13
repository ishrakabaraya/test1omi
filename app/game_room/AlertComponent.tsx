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
import { useActionState, useRef } from "react"
import { toast } from "sonner"
const AlertComponent = ({ userEmail }: { userEmail: string }) => {

    const handleCancelForm = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                Email_To: formData.get("id") as string,
                Accept: formData.get("accept") as string,
            };
            // console.log(formValues)


            const result = await RemoveFromBuffer(prevState, formData);
            //console.log(result)
            if (result.status == "SUCCESS") {
                toast.success('Canceled From Joining')

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
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>

                            {userEmail &&
                                userEmail.slice(0, 5)} wants to join...
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <div className="flex gap-1 justify-between">
                            <form action={formActionCancel}>
                                <input type="text" name="EmailTo" value={userEmail} readOnly />
                                <input type="text" name="Accept" value={'false'} readOnly />
                                <Button type="submit" variant="ghost"
                                    className="text-black"
                                    onClick={() => cancel.current && cancel.current.click()}
                                    disabled={isPendingCreate}
                                >
                                    Cancel
                                </Button>
                            </form>
                            <AlertDialogCancel ref={cancel}
                                className=" p-0  !opacity-0">
                            </AlertDialogCancel>

                            <form action={formActionCancel}>
                                <input type="text" name="EmailTo" value={userEmail} readOnly />
                                <input type="text" name="Accept" value={'true'} readOnly />
                                <Button type="submit" variant="ghost"
                                    className="text-black"
                                    onClick={() => accept.current && accept.current.click()}
                                    disabled={isPendingCreate}
                                >
                                    allow
                                </Button>
                            </form>


                            <AlertDialogAction ref={accept}></AlertDialogAction>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div >
    )
}

export default AlertComponent