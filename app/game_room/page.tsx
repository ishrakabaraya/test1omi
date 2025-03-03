
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
import { get10Rows } from "@/lib/actions";
import { SanityLive } from "@/sanity/lib/live";

const page = async () => {






    const getMoreRows = async () => {
        const newList = await get10Rows()
        return newList
    }










    return (
        <div className='bg-white w-full h-[100vh]  flex justify-center pt-10'>
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
            <SanityLive />
        </div>
    )
}

export default page



