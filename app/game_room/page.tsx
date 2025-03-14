
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"


import CreateRoom from './CreateRoom';
import JoinRoom from "./JoinRoom";
import { after } from "next/server";
import { bufferToChosen, get10Rows } from "@/lib/actions";
import { sanityFetch } from "@/sanity/lib/live";
import { PLAYER_BY_GITHUB_ID_QUERY_ROOM } from "@/sanity/queries";
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
import { Button } from "@/components/ui/button"
import AlertComponent from "./AlertComponent";
import { redirect } from "next/navigation";
import { chooserCheck, chosenPlayers } from "./gameRoomAcrions";
import AlertChooser from "./AlertChooser";
import { auth } from "@/auth";


const page = async () => {

    const session = await auth();
    if (!session)
        redirect('/')

    const roomLive = await bufferToChosen(session.user?.email as string) as string[]
    console.log("in")
    // console.log(roomLive)


    // const buff = await bufferToChosen(result._id);
    // console.log(buff)



    // const getMoreRows = async () => {
    //     const newList = await get10Rows()
    //     return newList
    // }





    //plaers
    const players = await chosenPlayers()
    if (players.redirect) {
        redirect('/room')
    }

    console.log(players)




    return (
        <div className='bg-white w-full h-[100vh]  flex justify-center pt-10 overflow-scroll text-black '>


            {roomLive &&

                roomLive.map((ale, i) => {
                    return <AlertComponent userEmail={ale} key={i} />
                })
            }
            {
                players.chooser &&
                <AlertChooser />
            }






            <Tabs defaultValue="account" className="w-[90vw] max-w-[700px] ">
                <TabsList className="grid w-full grid-cols-2 ">
                    <TabsTrigger value="account" className=''>

                        Join

                    </TabsTrigger>
                    <TabsTrigger value="password">Custom</TabsTrigger>
                </TabsList>
                <TabsContent value="account">

                    <Card>
                        <CardHeader>
                            <CardTitle>Join a Room</CardTitle>


                            {/* <CardDescription>
                                Make changes to your account here. Click save when you're done.
                            </CardDescription> */}
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {/* <form action="{handleJoinForm}">
                                <div className="grid w-full items-center gap-4">


                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="payment">Payment</Label>
                                        <Input id="payment" placeholder="Amount in Rs." type='number' required />
                                    </div>

                                    <div className="flex flex-col space-y-1.5" >
                                        <Label htmlFor="rounds_select">Rounds</Label>
                                        <Select required >
                                            <SelectTrigger id="rounds_select">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
                                                <SelectItem value="3">3</SelectItem>
                                                <SelectItem value="4">4</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Button type='submit'>Join</Button>

                                </div>
                            </form> */}


                            {/* {players.chosen && players.chosen.map((p: string, i: number) => <div key={p + i}>
                                <div className="text-blue-700"> {p}


                                </div>

                            </div>)} */}
                            {
                                players.chosen && <div className='text-blue-600'>{players.chosen[0]}</div>
                            }
                            {
                                players.chosen && <div className='text-blue-600'>{players.chosen[2]}</div>
                            }
                            VS.
                            {
                                players.chosen && <div className='text-red-500'>{players.chosen[1]}</div>
                            }
                            {
                                players.chosen && <div className='text-red-500'>{players.chosen[3]}</div>
                            }

                            <JoinRoom />
                        </CardContent>
                        {/* <CardFooter>
                            <Button>Save changes</Button>
                        </CardFooter> */}

                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <CreateRoom />
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default page



