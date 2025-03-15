import React from 'react'
import CardContainer from '@/components/CardContainer';
import CardDrawer from './CardDrawer';
import { List } from './List';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { PLAYER_BY_GITHUB_ID_QUERY_ROOM_ONLY, ROOM_CARDS, ROOM_THURUMPU_ONLY } from '@/sanity/queries';
import { cardListPlayer, roomCardsLive } from './roomActions';
import { auth } from '@/auth';
import { parseServerActionResponse } from '@/lib/utils';
import { redirect } from 'next/navigation';
import CardsHand from './CardsHand';
import { client } from '@/sanity/client';
import { Diamond } from 'lucide-react';



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
        const { thurumpu } = await client.withConfig({ useCdn: false })
            .fetch
            (ROOM_THURUMPU_ONLY, { id: room })
        if (!thurumpu)
            redirect('/game_room')
        thurump = thurumpu
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



    return (


        <div className='room_container flex h-[100vh] w-full bg-black justify-center items-center m-0 p-0 relative'>

            <div className="scene ">
                <div className="floor flex justify-center items-center">

                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 w-[10vw]'>
                        {(thurump && thurump == "D") && <Diamond className='w-full' />}

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


            <SanityLive />

        </div>

    )
}

export default page