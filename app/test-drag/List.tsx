"use client"

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import {
    closestCenter, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, TouchSensor, useSensor,
    useSensors
} from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy, rectSortingStrategy } from '@dnd-kit/sortable'

import { SortableRow } from './SortableRow'

const DndContextWithNoSSR = dynamic(
    () => import('@dnd-kit/core').then((mod) => mod.DndContext),
    { ssr: false }
)

export type Item = {
    id: string,
    rotate: boolean,
    sequence: number
}



export function List({ cardList }: { cardList: string[] }) {

    const urlEndpoint = "https://ik.imagekit.io/m61ypgg2m"

    type itemType = {
        id: string,
        rotate: boolean,
        sequence: number
    }

    const [items, setItems] = useState<itemType[]>(cardList.map((v, i) => {
        return {
            id: v,
            rotate: false,
            sequence: i + 1
        }
    }))

    const [activeItem, setActiveItem] = useState<Item | undefined>(undefined)

    // for input methods detection
    const sensors = useSensors(useSensor(TouchSensor))

    const removeItem = (id: string) => {
        const updated = items.filter(item => item.id !== id).map((item, i) => ({ ...item, sequence: i + 1 }))

        setItems(updated)
    }

    // triggered when dragging starts
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event
        setActiveItem(items?.find(item => item.sequence === active.id))
    }

    const handleDragEnd = (event: DragEndEvent) => {
        console.log('ended')
        // console.log(event.activatorEvent.y)
        // console.log(event.delta.y)

        const { active, over } = event


        const activeItem = items.find(ex => ex.sequence === active.id)
        if (!activeItem) {
            return
        }
        if (event.delta.y < -100) {
            removeItem(activeItem.id)
            return
        }
        if (!over) return

        const overItem = items.find(ex => ex.sequence === over.id)

        if (!activeItem || !overItem) {
            return
        }


        const activeIndex = items.findIndex(ex => ex.sequence === active.id)
        const overIndex = items.findIndex(ex => ex.sequence === over.id)

        if (activeIndex !== overIndex) {
            setItems(prev => {
                const updated = arrayMove(prev, activeIndex, overIndex).map((ex, i) => ({ ...ex, sequence: i + 1 }))

                return updated
            })
        }
        setActiveItem(undefined)
    }

    const handleDragCancel = () => {
        setActiveItem(undefined)
        console.log('canceled')
    }
    // const handleDragMove = (l: any) => {
    //     // console.log('__________________________')
    //     // console.log(l
    //     // )
    //     // console.log(l.activatorEvent.titlX
    //     // )
    //     // console.log(l.activatorEvent.screenX
    //     // )
    //     console.log(l.activatorEvent.pageY / 2
    //     )
    //     // console.log(l.activatorEvent.offsetX
    //     // )
    //     console.log(-l.delta.y
    //     )

    // }



    return (
        <div className="flex flex-col gap-2 w-1/2 mx-auto">
            {items?.length ? (
                <DndContextWithNoSSR
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragCancel={handleDragCancel}



                >
                    {/* <SortableContext
                        items={items.map(item => item.sequence)}
                        strategy={verticalListSortingStrategy}
                    >
                        {items.map(item => (
                            <SortableRow
                                key={item.id}
                                item={item}
                                removeItem={removeItem}
                            />
                        ))}
                    </SortableContext>

                    <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
                        {activeItem ? (
                            <SortableRow
                                item={activeItem}
                                removeItem={removeItem}
                                forceDragging={true}
                            />
                        ) : null}
                    </DragOverlay> */}

                    <SortableContext items={items} strategy={rectSortingStrategy}

                    >
                        <div
                            className='card_container'
                        >
                            {items.map(item => (

                                <SortableRow
                                    key={item.id}
                                    item={item}
                                    removeItem={removeItem}

                                />
                            ))}

                        </div>
                    </SortableContext>
                    <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
                        {activeItem ? (
                            <SortableRow
                                item={activeItem}
                                removeItem={removeItem}
                                forceDragging={true}
                            />
                        ) : null}
                    </DragOverlay>


                </DndContextWithNoSSR>
            ) : null}
        </div>
    )
}