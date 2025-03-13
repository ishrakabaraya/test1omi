import { XIcon } from 'lucide-react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Button } from '@/components/ui/button'

import type { Item } from "./List"
import { IKImage } from 'imagekitio-next'
import { useEffect, useRef, useState } from 'react'

type Props = {
    item: Item,
    removeItem: (id: string) => void,
    arrow: boolean,
    forceDragging?: boolean
}
const urlEndpoint = "https://ik.imagekit.io/m61ypgg2m"

export function SortableRow({ item, removeItem, arrow, forceDragging = false }: Props) {

    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition
    } = useSortable({
        id: item.sequence,

    })

    const parentStyles = {
        transform: CSS.Transform.toString(transform),
        transition: 'transform 150ms cubic-bezier(0.25, 1, 0.5, 1)',
        opacity: isDragging ? "0.4" : "1",
        lineHeight: "4",
    }

    const draggableStyles = {
        cursor: isDragging || forceDragging ? "grabbing" : "grab",


    }

    const card = useRef<HTMLDivElement>(null)






    const setOpacity = (str: string) => {
        if (card.current) {
            card.current.style.transform = str
        }
    }

    useEffect(() => {


        if (arrow) {
            setOpacity('rotateY(180deg)')
        } else {
            setOpacity('rotateY(0deg)')
        }
    }, [arrow]);



    return (
        <article
            className="" ref={setNodeRef}
            style={parentStyles}

        >






            <div
                ref={setActivatorNodeRef}
                style={draggableStyles}
                {...attributes} {...listeners}
            >
                <div className="cards" ref={card}>
                    <IKImage urlEndpoint={urlEndpoint} path={item.id} alt="Greeting image" />
                </div>

            </div>



        </article>
    )
}