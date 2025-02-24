import { defineType } from "sanity";


export const room = defineType({
    name: 'room',
    title: 'Room',
    type: 'document',
    fields: [
        {
            name: 'players',
            title: 'Players',
            type: 'array',

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
            name: 'expires',
            title: 'Expires',
            type: 'string',
        },
        {
            name: 'wallet',
            title: 'Wallet',
            type: 'number',
        },
    ],
    preview: {
        select: {
            title: 'name',
        }
    }
})