
import { client } from '@/sanity/client';
import { PLAYER_BY_GITHUB_ID_QUERY_WALLET } from '@/sanity/queries';
import React from 'react'

const Wallet = async ({ email }: { email: string }) => {
    const { wallet: pocket } = await client.withConfig({ useCdn: false })
        .fetch
        (PLAYER_BY_GITHUB_ID_QUERY_WALLET, { email })
    return (
        <div className='ml-5'>Rs.{pocket}</div>
    )
}

export default Wallet