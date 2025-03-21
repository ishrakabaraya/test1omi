import React from 'react'
import CardContainer from '@/components/CardContainer';
import CardDrawer from './CardDrawer';
import { List } from './List';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { PLAYER_BY_GITHUB_ID_QUERY_CARDS, PLAYER_BY_GITHUB_ID_QUERY_ROOM_ONLY, ROOM_CARDS, ROOM_CHOOSER_ONLY, ROOM_MESSAGE_ONLY, ROOM_THURUMPU_CREATED_OWNER, ROOM_THURUMPU_ONLY } from '@/sanity/queries';
import { cardListPlayer, cardNameSet, roomCardsLive } from './roomActions';
import { auth } from '@/auth';
import { parseServerActionResponse } from '@/lib/utils';
import { redirect } from 'next/navigation';
import CardsHand from './CardsHand';
import { client } from '@/sanity/client';
import { Club, Diamond, Heart, Spade } from 'lucide-react';
import { writeClient } from '@/sanity/write-client';
import MessageBox from './MessageBox';
import ToastMessage from './ToastMessage';




const page = async () => {
    const session = await auth();
    if (!session)
        redirect('/')


    const { email } = session?.user || { email: "user" };
    const { room } = await client.withConfig({ useCdn: false })
        .fetch
        (PLAYER_BY_GITHUB_ID_QUERY_ROOM_ONLY, { email })




    if (!room)
        redirect('/game_room')


    let thurump = ''

    try {
        const { thurumpu, _createdAt, email: ownerEmail } = await client.withConfig({ useCdn: false })
            .fetch
            (ROOM_THURUMPU_CREATED_OWNER, { id: room })
        if (!thurumpu)
            redirect('/game_room')
        thurump = thurumpu

        const createdAt = new Date(_createdAt);
        const currentTime = new Date();
        const timeDifference = Math.floor((currentTime.getTime() - createdAt.getTime()) / 60000); // Convert milliseconds to minutes

        if (timeDifference > 60) {

            await writeClient.delete(room as string)

        }

    } catch (e) {
        redirect('/game_room')
    }








    const { data: LiveCards } = await roomCardsLive(room as string)
    if (!LiveCards) {
        redirect('/game_room')
    }


    const CardList = await cardListPlayer(room, email as string)



    const liveRoom = await sanityFetch({
        query: PLAYER_BY_GITHUB_ID_QUERY_ROOM_ONLY, params: {
            email
        }
    })
    if (!liveRoom) {
        redirect('/game_room')
    }

    // console.log("CardList")
    // console.log(CardList)

    // const { data: chooserLive } = await sanityFetch({
    //     query: ROOM_CHOOSER_ONLY, params: {
    //         id: room
    //     }
    // });


    // async function chooserCards() {
    //     console.log("hii")

    //     setTimeout(async () => {


    //         const { cards } = await client.withConfig({ useCdn: false })
    //             .fetch
    //             (PLAYER_BY_GITHUB_ID_QUERY_CARDS, { email: chooserLive.chooser })

    //         console.log(cards[0])
    //         const formData = new FormData();
    //         formData.append('cardName', cards[0]);
    //         formData.append('timer', 'true');
    //         console.log('form')
    //         console.log(formData.get("cardName"))
    //         await cardNameSet(formData)


    //     }, 10000)
    // }

    // if (owner == email) {
    //     chooserCards()
    // }





    // async function randomCard() {
    //     console.log("hii")
    //     const { chooser: chooser1 } = await client.withConfig({ useCdn: false })
    //         .fetch
    //         (ROOM_CHOOSER_ONLY, { id: room })
    //     setTimeout(async () => {

    //         const { chooser: chooser2 } = await client.withConfig({ useCdn: false })
    //             .fetch
    //             (ROOM_CHOOSER_ONLY, { id: room })

    //         console.log(chooser1)
    //         console.log(chooser2)
    //         if (chooser1 == chooser2) {
    //             const { cards } = await client.withConfig({ useCdn: false })
    //                 .fetch
    //                 (PLAYER_BY_GITHUB_ID_QUERY_CARDS, { email: chooser1 })

    //             console.log(cards)
    //             const formData = new FormData();
    //             formData.append('cardName', cards[0]);
    //             formData.append('timer', 'false');
    //             const result = await cardNameSet(formData)
    //             if (result.statue == 'WRONG') {
    //                 await cardNameSet(result.error)
    //             }
    //             randomCard()
    //         }


    //     }, 20000)
    // }

    // if (owner == email) {
    //     randomCard()
    // }

    const { data: message } = await sanityFetch({
        query: ROOM_MESSAGE_ONLY, params: {
            id: room
        }
    })

    return (


        <div className='room_container flex h-[100vh] w-full bg-black justify-center items-center m-0 p-0 relative'>

            <div className="scene ">
                <div className="floor flex justify-center items-center">

                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 w-[10vw]'>
                        {(thurump && thurump == "D") && <Diamond className='w-full' />}
                        {(thurump && thurump == "H") && <Heart className='w-full' />}
                        {(thurump && thurump == "C") && <Club className='w-full' />}
                        {(thurump && thurump == "S") && <Spade className='w-full' />}

                    </div>
                    <div className='text-white'>
                        <CardsHand Cards={LiveCards.cards} />
                    </div>
                </div>
            </div>
            {/* <CardDrawer /> */}


            {/* <CardContainer cardList={['/2C.svg', '/3D.svg', '/2D.svg', '/3D.svg', '/2C.svg', '/3D.svg', '/2D.svg', '/3D.svg']} /> */}

            {CardList &&
                <List cardList={CardList} />
            }

            {
                (LiveCards.chooser == email) &&
                <div className='bg-slate-700 w-1/2 fixed top-[5vh] p-[2vh] text-center'>YOUR TURN</div>
            }
            {
                (LiveCards && LiveCards.team1 > -1) &&
                <div className='text-blue-600 fixed top-[5vw] left-[5vw] bg-white p-[2vw] rounded-full'>{LiveCards.team1}</div>
            }
            {
                (LiveCards && LiveCards.team2 > -1) &&
                <div className='text-red-600 fixed top-[5vw] right-[5vw] bg-white p-[2vw] rounded-full'>{LiveCards.team2}</div>
            }

            <MessageBox room={room} email={email || ''} />

            <ToastMessage message={message.message} />
            <SanityLive />

        </div>

    )
}

export default page