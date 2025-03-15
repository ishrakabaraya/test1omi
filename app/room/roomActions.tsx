"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";

import { writeClient } from "@/sanity/write-client";
import { client } from "@/sanity/client";
import { PLAYER_BY_GITHUB_ID_QUERY_ROOM, PLAYER_BY_GITHUB_ID_QUERY_ROOM_CARDS, PLAYER_BY_GITHUB_ID_QUERY_ROOM_ONLY, PLAYER_CARDS_SET_GET, ROOM_BUFFER, ROOM_CARDS, ROOM_CHOSEN_RANDOM, ROOM_MAXIMUM_10 } from "@/sanity/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { ROOM_CARDS_CHOOSER_TEAMS, TEAMS_THURUMPU } from "./roomQueries";


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

    const { cards: roomCards, chosen, counter, chooser } = await client.withConfig({ useCdn: false })
        .fetch
        (ROOM_CARDS, { id: room })





    const { cardName } = Object.fromEntries(form) as { cardName: string };
    // console.log(cardName)
    // console.log(roomCards)

    try {
        if (chooser != email) {
            return parseServerActionResponse({
                error: "not your turn",
                status: "ERROR",
            });
        }




        if (roomCards && roomCards.length > 2) {

            const { team1, team2, thurumpu } = await client.withConfig({ useCdn: false })
                .fetch
                (TEAMS_THURUMPU, { id: room })

            const checkCards = [...roomCards, {
                cardName,
                cardPlayer: email
            }]
            let cardMax = checkCards[0]
            const sorter = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A']
            checkCards.map((card: any) => {
                const max = cardMax.cardName[2]
                const name = card.cardName[2]
                const thurump = thurumpu
                const maxL = sorter.indexOf(cardMax.cardName[1])
                const cardL = sorter.indexOf(card.cardName[1])
                if (max == thurump) {
                    if (name == thurump) {
                        if (cardL > maxL) {
                            cardMax = card
                        }
                    }
                } else {
                    if (name == thurump) {
                        cardMax = card
                    } else {
                        if (max == name && cardL > maxL) {
                            cardMax = card
                        }
                    }
                }
            })

            const checkTeam = chosen.indexOf(cardMax.cardPlayer)
            if (checkTeam == 0 || checkTeam == 2) {
                await writeClient
                    .patch(room)
                    .set({
                        team1: team1 + 1,
                        chooser: cardMax.cardPlayer

                    })
                    .commit()

            } else {
                await writeClient
                    .patch(room)
                    .set({
                        team2: team2 + 1,
                        chooser: cardMax.cardPlayer

                    })
                    .commit()
            }

            if ((team1 + team2) == 7) {
                await writeClient.delete(room as string)
            }





        }

        if (roomCards && roomCards.length > 0) {
            console.log(roomCards[0].cardName[2])
            console.log(cardName[2])
            if (!(roomCards[0].cardName[2] == cardName[2])) {
                console.log("cards")
                const clist: string[] = []
                cards.map((c: string) => {

                    console.log(c[2])
                    if (c[2] == roomCards[0].cardName[2]) {
                        clist.push(c)
                    }
                })
                console.log(clist)
                if (clist && clist.length > 0) {
                    return parseServerActionResponse({
                        error: "Wrong card",
                        status: "ERROR",
                    });
                }
            }

            await writeClient
                .patch(room)
                .set({
                    cards: [...roomCards,
                    {
                        _key: cardName + 'key',
                        cardName,
                        cardPlayer: email
                    }
                    ]
                })
                .commit()
        } else {
            await writeClient
                .patch(room)
                .set({
                    cards: [
                        {
                            _key: cardName + 'key',
                            cardName,
                            cardPlayer: email
                        }
                    ]
                })
                .commit()
        }

        if (cards) {
            await writeClient
                .patch(_id)
                .set({ cards: cards.filter((card: string) => card != cardName) })
                .commit()
            const index = (chosen.indexOf(email) + 1) % 4
            await writeClient
                .patch(room)
                .set({ chooser: chosen[index] })
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
        query: ROOM_CARDS_CHOOSER_TEAMS, params: {
            id: room
        }
    })
    if (result.data && result.data.cards && result.data.cards.length > 3) {
        await writeClient
            .patch(room)
            .set({ cards: [] })
            .commit()
    }


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

    const { cards, _id } = await client.withConfig({ useCdn: false })
        .fetch
        (PLAYER_CARDS_SET_GET, { email })
    if (cards && cards.length > 0) {
        return cards
    }

    if (chosen) {
        const emailI = chosen.indexOf(email)

        if (emailI > -1) {
            const cardsArray: string[] = []
            // console.log('cardsArray')
            for (let i = emailI * 8; i < (emailI + 1) * 8; i++) {

                cardsArray.push(cardArray[random[i] - 1])
            }
            console.log(cardsArray)
            await writeClient
                .patch(_id)
                .set({ cards: cardsArray })
                .commit()
            console.log('cardsArray')
            console.log(cardsArray)


            return cardsArray

        }
    }

    return []


}



