"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";

import { writeClient } from "@/sanity/write-client";
import { client } from "@/sanity/client";
import { PLAYER_BY_GITHUB_ID_QUERY_ROOM, ROOM_MAXIMUM_10 } from "@/sanity/queries";
import { sanityFetch } from "@/sanity/lib/live";

export const createPitch = async (
    state: any,
    form: FormData,
) => {
    const session = await auth();
    if (!session)
        return parseServerActionResponse({
            error: "Not signed in",
            status: "ERROR",
        });
    const { email } = session?.user || { email: "user", _id: "u" };
    const { _id, room } = await client.withConfig({ useCdn: false })
        .fetch
        (PLAYER_BY_GITHUB_ID_QUERY_ROOM, { email })
    if (room)
        return parseServerActionResponse({
            error: "Already In A Room",
            status: "ERROR",
        });




    const { type, payment, rounds } = Object.fromEntries(form)


    try {


        const result = await writeClient.create({
            _type: "room",
            type,
            payment,
            rounds,
            email: session.user?.email

        });
        await writeClient
            .patch(_id)
            .set({ room: result._id })
            .commit()



        return parseServerActionResponse({
            ...result,
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


export const get10Rows = async () => {
    const listOfRooms = await client.withConfig({ useCdn: false })
        .fetch
        (ROOM_MAXIMUM_10)

    console.log(listOfRooms)
    return listOfRooms



}
export const getLiveData = async () => {

    const { data } = await sanityFetch({ query: ROOM_MAXIMUM_10 }).then(d => {
        console.log("hii" + d)
        return d
    });

    return data
}