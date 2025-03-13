"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";

import { writeClient } from "@/sanity/write-client";
import { client } from "@/sanity/client";
import { PLAYER_BY_GITHUB_ID_QUERY_ROOM, ROOM_BUFFER, ROOM_CHOSEN, ROOM_MAXIMUM_10 } from "@/sanity/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { LiveClient } from "next-sanity";





export const chosenPlayers = async () => {
    const session = await auth();
    if (!session)
        return parseServerActionResponse({
            error: "Not signed in",
            status: "ERROR",
        });
    const { email } = session?.user || { email: "user" };


    const { data: roomLive } = await sanityFetch({
        query: PLAYER_BY_GITHUB_ID_QUERY_ROOM, params: {
            email
        }
    });
    console.log("changed")
    if (!roomLive.room) {
        return []
    }
    const { data: chosenEmails } = await sanityFetch({
        query: ROOM_CHOSEN, params: {
            id: roomLive.room
        }
    });

    // console.log(email_buffer_chosen)

    // if (email_buffer_chosen == null) {
    //     await writeClient
    //         .patch(roomLive._id)
    //         .set({ room: "" })
    //         .commit()

    //     return []
    // }

    let chosen = []
    let chooser = ''
    console.log("check ")
    console.log(chosenEmails.chooser == email)
    console.log(email)

    if (chosenEmails.chosen) {
        chosen = chosenEmails.chosen
    }
    if (chosen.length > 3) {
        if (chosenEmails.thurumpu) {
            timer(roomLive.room)
            return {
                redirect: true
            }
        }
        if (chosenEmails.chooser && chosenEmails.chooser == email) {
            return {
                redirect: false,
                chosen,
                chooser: true
            }
        }
        if (session.user?.email == chosenEmails.email) {
            if (!chosenEmails.chooser) {
                const randomNumber = Math.floor(Math.random() * 4);
                const chooser = chosen[randomNumber]

            }

        }


    }



    return {
        redirect: false,
        chosen,
        chooser: false
    }

}
const timer = async (room: string) => {
    setTimeout(() => {

    })
}



export const chooserCheck = async () => {

}


export const setThurumpu = async (state: any,
    form: FormData) => {

    const { cardType } = Object.fromEntries(form)
    const session = await auth();
    if (!session)
        return parseServerActionResponse({
            error: "Not signed in",
            status: "ERROR",
        });
    const { email } = session?.user || { email: "user" };


    const { data: roomLive } = await sanityFetch({
        query: PLAYER_BY_GITHUB_ID_QUERY_ROOM, params: {
            email
        }
    });
    let numbers = new Set();

    while (numbers.size < 32) {
        let randomNum = Math.floor(Math.random() * 32) + 1;
        numbers.add(randomNum);
    }

    await writeClient
        .patch(roomLive.room)
        .set({
            random: Array.from(numbers),
            thurumpu: cardType
        })
        .commit()

    // await writeClient
    //     .patch(roomLive.room)
    //     .set({ thurumpu: cardType })
    //     .commit()

    return parseServerActionResponse({
        // ...result,
        error: "",
        status: "SUCCESS",
    });
}