import { defineType } from "sanity";


export const room = defineType({
    name: 'room',
    title: 'Room',
    type: 'document',
    fields: [

        {
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },

        {
            name: 'date',
            title: 'Date',
            type: 'string',
        },
        {
            name: 'type',
            title: 'Type',
            type: 'string',
        },
        {
            name: 'payment',
            title: 'Payment',
            type: 'string',

        },
        {
            name: 'rounds',
            title: 'Rounds',
            type: 'string',
        },
    ],
    preview: {
        select: {
            title: 'email',
        }
    }
})