
import { client } from '@/sanity/client';
import { sanityFetch } from '@/sanity/lib/live';
import { PLAYER_BY_GITHUB_ID_QUERY_WALLET } from '@/sanity/queries';
import { SanityLive } from '@/sanity/lib/live';
import React from 'react'

const Wallet = async ({ email }: { email: string }) => {
    // const params = { email: email || null };
    const { data: pocket } = await sanityFetch({ query: PLAYER_BY_GITHUB_ID_QUERY_WALLET, params: { email } })
    return (
        <div className='ml-5'>Rs.{pocket.wallet}
            <SanityLive />
        </div>
    )
}

export default Wallet