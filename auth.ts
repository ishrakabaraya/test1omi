import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { client } from "./sanity/client"
import { PLAYER_BY_GOOGLE_ID_QUERY } from "./sanity/queries"
import { writeClient } from "./sanity/write-client"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        async signIn({
            user: { name, email, image }
        }) {
            console.log("signIn", name, email, image, "user")
            const exist = await client.withConfig({ useCdn: false })
                .fetch
                (PLAYER_BY_GOOGLE_ID_QUERY, { email })

            if (!exist) {
                await writeClient.create({
                    _type: "player",
                    name,
                    email,
                    image,
                    wallet: 0,
                })
                console.log('wrote client')
            }

            return true
        },
        async jwt({ token, account, profile }) {

            console.log('jwt', token)
            console.log('account', account)
            console.log('profile', profile)

            return token
        }
        , async session({ session, token }) {
            console.log('session', session)
            console.log('token', token)
            return session
        }
    }
})