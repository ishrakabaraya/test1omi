import { defineQuery } from "next-sanity";

export const TEAMS_THURUMPU = defineQuery(`
                                        *[_type == "room" && _id == $id ][0]{
                                            team1,
                                            team2,
                                            thurumpu,
                                        }
                                        `);

export const ROOM_CARDS_CHOOSER_TEAMS = defineQuery(`
                                            *[_type == "room" &&  _id == $id ][0]{
                                               cards,
                                               chooser,
                                               team1,
                                               team2
                                            }
                                            `);
