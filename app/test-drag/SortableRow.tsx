import { XIcon } from 'lucide-react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Button } from '@/components/ui/button'

import type { Item } from "./List"
import { IKImage } from 'imagekitio-next'
import { useState } from 'react'

type Props = {
    item: Item,
    removeItem: (id: string) => void,
    forceDragging?: boolean,
}
const urlEndpoint = "https://ik.imagekit.io/m61ypgg2m"

export function SortableRow({ item, removeItem, forceDragging = false }: Props) {

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
        transition: {
            duration: 150, // milliseconds
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        },
        opacity: isDragging ? "0.4" : "1",
        lineHeight: "4",
    }

    const draggableStyles = {
        cursor: isDragging || forceDragging ? "grabbing" : "grab",
    }



    return (
        <article
            className="" ref={setNodeRef}
            style={parentStyles}

        >




            <div
                ref={setActivatorNodeRef}
                className="flex-grow"
                style={draggableStyles}
                {...attributes} {...listeners}
            >

                <div className="cards">
                    <IKImage urlEndpoint={urlEndpoint} path={item.id} alt="Greeting image" />
                </div>
            </div>



        </article>
    )
}