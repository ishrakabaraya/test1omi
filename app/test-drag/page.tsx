import React from 'react'
import { List } from './List'
export default () => {

    const list = [
        {
            "id": 1,
            "artist": "The Beatles",
            "title": "Hey Jude",
            "sequence": 1
        },
        {
            "id": 2,
            "artist": "Neil Young",
            "title": "My My, Hey Hey",
            "sequence": 2
        },
        {
            "id": 3,
            "artist": "The Rolling Stones",
            "title": "Wild Horses",
            "sequence": 3
        },
        {
            "id": 4,
            "artist": "Led Zeppelin",
            "title": "Ten Years Gone",
            "sequence": 4
        },
        {
            "id": 5,
            "artist": "Triumph",
            "title": "Magic Power",
            "sequence": 5
        }
    ]
    return (
        <div>page

            <List cardList={['/2C.svg', '/3D.svg', '/2D.svg']} />
        </div>
    )
}
