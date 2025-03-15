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
            // const formValues = {
            //     Email_To: formData.get("id") as string,
            //     Accept: formData.get("accept") as string,
            // };
            // console.log(formValues)


            const result = await RemoveFromBuffer(prevState, formData);
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
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>

                        </AlertDialogTitle>
                        <AlertDialogDescription>

                            {userEmail} wants to join...
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <div className="flex gap-1 justify-between">
                            <form action={formActionCancel}>
                                <input type="text" name="EmailTo" value={userEmail} readOnly className="w-0" />
                                <input type="text" name="Accept" value={'false'} readOnly className="w-0" />
                                <input type="text" name="Team" value={'0'} readOnly className="w-0" />
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
                                <input type="text" name="EmailTo" value={userEmail} readOnly className="w-0" />
                                <input type="text" name="Accept" value={'true'} readOnly className="w-0" />
                                <input type="text" name="Team" value={'1'} readOnly className="w-0" />
                                <Button type="submit" variant="outline"
                                    className="text-black"
                                    onClick={() => accept.current && accept.current.click()}
                                    disabled={isPendingCreate}
                                >
                                    MyTeam
                                </Button>
                            </form>
                            <form action={formActionCancel}>
                                <input type="text" name="EmailTo" value={userEmail} readOnly className="w-0" />
                                <input type="text" name="Accept" value={'true'} readOnly className="w-0" />
                                <input type="text" name="Team" value={'2'} readOnly className="w-0" />
                                <Button type="submit" variant="outline"
                                    className="text-black"
                                    onClick={() => accept.current && accept.current.click()}
                                    disabled={isPendingCreate}
                                >
                                    Opposite
                                </Button>
                            </form>


                            <AlertDialogAction ref={accept} className=" p-0  !opacity-0"></AlertDialogAction>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div >
    )
}

export default AlertComponent