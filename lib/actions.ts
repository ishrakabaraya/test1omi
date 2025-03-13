"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";

import { writeClient } from "@/sanity/write-client";
import { client } from "@/sanity/client";
import { PLAYER_BY_GITHUB_ID_QUERY_ROOM, ROOM_BUFFER, ROOM_MAXIMUM_10 } from "@/sanity/queries";
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








    const { type, payment, rounds, cancel } = Object.fromEntries(form)


    try {

        if (cancel) {
            await writeClient.delete(room as string)
            return parseServerActionResponse({
                error: "Canceled room ....",
                status: "CANCELED",
            });
        }
        if (room)
            return parseServerActionResponse({
                error: "Already In A Room",
                status: "ERROR",
            });

        const result = await writeClient.create({
            _type: "room",
            type,
            payment,
            chosen: [email],
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



export const JoinRoom = async (
    state: any,
    form: FormData,
) => {


    // const { i } = Object.fromEntries(form) || ""
    // await writeClient.delete({ query: `*[_type == "room" ][0..3]` })

    const session = await auth();
    if (!session)
        return parseServerActionResponse({
            error: "Not signed in",
            status: "ERROR",
        });
    const { email } = session?.user || { email: "user" };
    const { _id, room } = await client.withConfig({ useCdn: false })
        .fetch
        (PLAYER_BY_GITHUB_ID_QUERY_ROOM, { email })
    if (room)
        return parseServerActionResponse({
            error: "Wait For More",
            status: "ERROR",
        });




    const { id } = Object.fromEntries(form) || ""



    try {

        const { buffer } = await client.withConfig({ useCdn: false })
            .fetch(ROOM_BUFFER, { id })
        // console.log("buffer")
        // console.log(buffer)
        // console.log(email)
        // console.log(buffer.includes(email))

        // if (email && buffer.includes(email)) {
        //     return parseServerActionResponse({
        //         error: "WAIT........",
        //         status: "ERROR",
        //     });
        // }
        if (buffer) {
            await writeClient
                .patch(id as string)
                .set({ buffer: [...buffer, email] })
                .commit()
        } else {
            await writeClient
                .patch(id as string)
                .set({ buffer: [email] })
                .commit()
        }

        // const result = await writeClient.create({
        //     _type: "room",
        //     type,
        //     payment,
        //     rounds,
        //     email: session.user?.email

        // });
        await writeClient
            .patch(_id)
            .set({ room: id })
            .commit()



        return parseServerActionResponse({
            // ...result,
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


export const bufferToChosen = async (email: string) => {


    await writeClient.delete({ query: `*[_type == "room" ][0..3]` })


    const { data: roomLive } = await sanityFetch({
        query: PLAYER_BY_GITHUB_ID_QUERY_ROOM, params: {
            email
        }
    });
    console.log("changed")
    if (!roomLive.room) {
        return []
    }
    const { data: email_buffer_chosen } = await sanityFetch({
        query: ROOM_BUFFER, params: {
            id: roomLive.room
        }
    });
    // console.log(email_buffer_chosen)
    if (email_buffer_chosen == null) {
        await writeClient
            .patch(roomLive._id)
            .set({ room: "" })
            .commit()

        return []
    }

    if (email == email_buffer_chosen.email) {
        let buffer = []
        let chosen = []
        if (email_buffer_chosen.buffer) {
            buffer = email_buffer_chosen.buffer
        }
        if (email_buffer_chosen.chosen) {
            chosen = email_buffer_chosen.chosen
        }
        const list: string = buffer.map((b: string) => {

            if (chosen.length < 5 && !chosen.includes(b)) {

                return b;
            }
        })
        console.log("check list type")
        console.log(list)
        return list

    } else {
        if ((email_buffer_chosen.buffer && !email_buffer_chosen.buffer.includes(email))
            &&
            (email_buffer_chosen.chosen && !email_buffer_chosen.chosen.includes(email))

        ) {
            await writeClient
                .patch(roomLive._id)
                .set({ room: "" })
                .commit()
        }

    }
    return []

}




export const RemoveFromBuffer = async (
    state: any,
    form: FormData,
) => {


    // const { i } = Object.fromEntries(form) || ""
    // await writeClient.delete({ query: `*[_type == "room" ][0..3]` })

    const session = await auth();
    if (!session)
        return parseServerActionResponse({
            error: "Not signed in",
            status: "ERROR",
        });
    const { email } = session?.user || { email: "user" };
    const { _id, room } = await client.withConfig({ useCdn: false })
        .fetch
        (PLAYER_BY_GITHUB_ID_QUERY_ROOM, { email })


    const { EmailTo, Accept } = Object.fromEntries(form) || ""


    try {

        const { buffer,
            chosen } = await client.withConfig({ useCdn: false })
                .fetch(ROOM_BUFFER, { id: room })
        // console.log("buffer")
        // console.log(buffer)
        // console.log(email)
        // console.log(buffer.includes(email))

        // if (email && buffer.includes(email)) {
        //     return parseServerActionResponse({
        //         error: "WAIT........",
        //         status: "ERROR",
        //     });
        // }


        await writeClient
            .patch(room)
            .set({ buffer: buffer.filter((item: string) => item != EmailTo) })
            .commit()
        if (Accept == 'true') {
            if (chosen) {

                await writeClient
                    .patch(room)
                    .set({ chosen: [...chosen, EmailTo] })
                    .commit()
            }
            else {
                await writeClient
                    .patch(room)
                    .set({ chosen: [EmailTo] })
                    .commit()
            }
        }

        // const result = await writeClient.create({
        //     _type: "room",
        //     type,
        //     payment,
        //     rounds,
        //     email: session.user?.email

        // });
        return parseServerActionResponse({
            // ...result,
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