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
                    *[_type == "room"]{
                        _id,
                        payment
                    }
                    `);
export const ROOM_BUFFER = defineQuery(`
                        *[_type == "room" && _id == $id ][0]{
                            email,
                            buffer,
                            chosen
                        }
                        `);

export const ROOM_CARDS = defineQuery(`
                        *[_type == "room" &&  _id == $id ][0]{
                           cards
                        }
                        `);

export const PLAYER_BY_GITHUB_ID_QUERY_ROOM_CARDS = defineQuery(`
                            *[_type == "player" && email == $email][0]{
                            _id,    
                            room ,   
                            cards
                            }
                            `);

export const PLAYER_BY_GITHUB_ID_QUERY_ROOM_ONLY = defineQuery(`
                                *[_type == "player" && email == $email][0]{
                                 
                                room 
                                }
                                `);




export const ROOM_CHOSEN = defineQuery(`
                                    *[_type == "room" && _id == $id ][0]{
                                        chosen,
                                        thurumpu,
                                        email,
                                        chooser
                                    }
                                    `);

export const ROOM_CHOSEN_RANDOM = defineQuery(`
                                        *[_type == "room" && _id == $id ][0]{
                                            chosen,
                                            random
                                        }
                                        `);