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
    ],
    preview: {
        select: {
            title: 'name',
        }
    }
})