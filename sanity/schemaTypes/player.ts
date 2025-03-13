import { defineType } from "sanity";


export const player = defineType({
    name: 'player',
    title: 'Player',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'image',
            title: 'Image',
            type: 'url',
        },
        {
            name: 'wallet',
            title: 'Wallet',
            type: 'number',
        },
        {
            name: 'room',
            title: 'Room',
            type: 'string',
        },
        {
            name: 'cards',
            title: 'Cards',
            type: 'array',
            of:
                [
                    {
                        type: 'string',

                    }
                ],
            validation: (Rule) => Rule.max(4)

        },
    ],
    preview: {
        select: {
            title: 'name',
        }
    }
})