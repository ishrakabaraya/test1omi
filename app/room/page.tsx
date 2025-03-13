import React from 'react'
import CardContainer from '@/components/CardContainer';
import CardDrawer from './CardDrawer';
import { List } from './List';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { PLAYER_BY_GITHUB_ID_QUERY_ROOM_ONLY, ROOM_CARDS } from '@/sanity/queries';
import { cardListPlayer, roomCardsLive } from './roomActions';
import { auth } from '@/auth';
import { parseServerActionResponse } from '@/lib/utils';
import { redirect } from 'next/navigation';
import CardsHand from './CardsHand';
import { client } from '@/sanity/client';



const page = async () => {
    const session = await auth();
    if (!session)
        redirect('/')


    const { email } = session?.user || { email: "user" };
    const { room } = await client.withConfig({ useCdn: false })
        .fetch
        (PLAYER_BY_GITHUB_ID_QUERY_ROOM_ONLY, { email })
    const { data: LiveCards } = await roomCardsLive(room as string)
    if (!LiveCards) {
        redirect('/game_room')
    }


    const CardList = await cardListPlayer(room, email as string)

    console.log("CardList")
    console.log(CardList)

    return (


        <div className='room_container flex h-[100vh] w-full bg-black justify-center items-center m-0 p-0 relative'>

            <div className="scene ">
                <div className="floor flex justify-center items-center">

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


            <SanityLive />
        </div>

    )
}

export default page