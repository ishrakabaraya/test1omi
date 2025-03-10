import { defineQuery } from "next-sanity";


export const PLAYER_BY_GITHUB_ID_QUERY = defineQuery(`
    *[_type == "player" && email == $email][0]{
        _id,
        id,
        name,
        email,
        image,
    }
    `);

export const PLAYER_BY_GITHUB_ID_QUERY_WALLET = defineQuery(`
        *[_type == "player" && email == $email][0]{
            wallet
        }
        `);
export const PLAYER_BY_GITHUB_ID_QUERY_ROOM = defineQuery(`
            *[_type == "player" && email == $email][0]{
            _id,    
            room 
            }
            `);

export const PLAYER_BY_GITHUB_ID_QUERY_NAME = defineQuery(`
            *[_type == "player" && email == $email][0]{
                name
            }
            `);

export const PLAYER_BY_GOOGLE_ID_QUERY = defineQuery(`
                *[_type == "player" && email == $email][0]{
                    name,
                    email,
                    image,
                    wallet
                }
                `);

export const ROOM_MAXIMUM_10 = defineQuery(`
                    *[_type == "room"][0..9]{
                        _id,
                        payment
                    }
                    `);
