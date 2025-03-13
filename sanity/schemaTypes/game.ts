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
            name: 'thurumpu',
            title: 'Thurumpu',
            type: 'string',

        }, {
            name: 'chooser',
            title: 'Chooser',
            type: 'string',

        },
        {
            name: 'buffer',
            title: 'Buffer',
            type: 'array',
            of:
                [
                    {
                        type: 'string',

                    }
                ],
        },
        {
            name: 'chosen',
            title: 'Chosen',
            type: 'array',
            of:
                [
                    {
                        type: 'string',

                    }
                ],
            validation: (Rule) => Rule.max(4)

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

        }, {
            name: 'random',
            title: 'Random',
            type: 'array',
            of:
                [
                    {
                        type: 'number',

                    }
                ],
            validation: (Rule) => Rule.max(32)

        },
    ],
    preview: {
        select: {
            title: 'email',
        }
    }
})