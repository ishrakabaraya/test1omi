import { SanityLive } from '@/sanity/lib/live'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {children}
            <SanityLive />
        </div>
    )
}

export default layout