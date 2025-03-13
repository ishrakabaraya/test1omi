"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";

import { writeClient } from "@/sanity/write-client";
import { client } from "@/sanity/client";
import { PLAYER_BY_GITHUB_ID_QUERY_ROOM, PLAYER_BY_GITHUB_ID_QUERY_ROOM_CARDS, PLAYER_BY_GITHUB_ID_QUERY_ROOM_ONLY, ROOM_BUFFER, ROOM_CARDS, ROOM_CHOSEN_RANDOM, ROOM_MAXIMUM_10 } from "@/sanity/queries";
import { sanityFetch } from "@/sanity/lib/live";


export const cardNameSet = async (
    state: any,
    form: FormData,
) => {
    const session = await auth();
    if (!session)
        return parseServerActionResponse({
            error: "Not signed in",
            status: "ERROR",
        });
    const { email } = session?.user || { email: "user" };
    const { _id, room, cards } = await client.withConfig({ useCdn: false })
        .fetch
        (PLAYER_BY_GITHUB_ID_QUERY_ROOM_CARDS, { email })

    if (!room) {
        return parseServerActionResponse({
            error: "Error .Try Reloading...",
            status: "ERROR",
        });
    }

    const { cards: roomCards } = await client.withConfig({ useCdn: false })
        .fetch
        (ROOM_CARDS, { id: room })




    const { cardName } = Object.fromEntries(form)
    console.log(cardName)
    console.log(roomCards)

    try {

        if (cards) {
            await writeClient
                .patch(_id)
                .set({ cards: cards.filter((card: string) => card != cardName) })
                .commit()
        }

        if (roomCards) {
            await writeClient
                .patch(room)
                .set({ cards: [...roomCards, cardName] })
                .commit()
        } else {
            await writeClient
                .patch(room)
                .set({ cards: [cardName] })
                .commit()
        }




        return parseServerActionResponse({
            error: "",
            status: "SUCCESS",
        });
    } catch (error) {
        console.log(error);

        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: "ERROR",
        });
    }
};



export const roomCardsLive = async (room: string) => {



    const result = await sanityFetch({
        query: ROOM_CARDS, params: {
            id: room
        }
    })


    return result
}

export const cardListPlayer = async (room: string, email: string) => {
    const cardArray = [
        '/6H.svg', '/6S.svg', '/6D.svg', '/6C.svg',
        '/7H.svg', '/7S.svg', '/7D.svg', '/7C.svg',
        '/8H.svg', '/8S.svg', '/8D.svg', '/8C.svg',
        '/9H.svg', '/9S.svg', '/9D.svg', '/9C.svg',
        '/TH.svg', '/TS.svg', '/TD.svg', '/TC.svg',
        '/KH.svg', '/KS.svg', '/KD.svg', '/KC.svg',
        '/QH.svg', '/QS.svg', '/QD.svg', '/QC.svg',
        '/AH.svg', '/AS.svg', '/AD.svg', '/AC.svg',
    ]

    const { chosen, random } = await client.withConfig({ useCdn: false })
        .fetch
        (ROOM_CHOSEN_RANDOM, { id: room })

    if (chosen) {
        const emailI = chosen.indexOf(email)

        if (emailI > -1) {

            return cardArray.slice(emailI * 8, (emailI + 1) * 8)

        }
    }

    return []


}



