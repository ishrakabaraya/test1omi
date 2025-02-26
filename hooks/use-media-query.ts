"use client";

import { useEffect, useState } from "react";


export const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false)
    useEffect(() => {
        setMatches(window.matchMedia(query).matches)
    }, [])
    return matches
}