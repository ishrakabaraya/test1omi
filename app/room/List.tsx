"use client"

import dynamic from 'next/dynamic'
import React, { useActionState, useEffect, useRef, useState } from 'react'
import { ArrowUp } from 'lucide-react';
import { ArrowDown } from 'lucide-react';


import {
    closestCenter, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, TouchSensor, useSensor,
    useSensors
} from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy, rectSortingStrategy } from '@dnd-kit/sortable'

import { SortableRow } from './SortableRow'
import { toast } from 'sonner';
import { cardNameSet } from './roomActions';

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
    const sensors = useSensors(useSensor(PointerSensor))

    const [cardString, setCardString] = useState("")

    const removeItem = (id: string) => {

        if (cardName.current) {
            cardName.current.value = id;
        }

        if (cardSubmit.current) {
            cardSubmit.current.requestSubmit()

        }
    }

    // triggered when dragging starts
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event
        setActiveItem(items?.find(item => item.sequence === active.id))
    }

    const handleDragEnd = (event: DragEndEvent) => {

        // console.log(event.activatorEvent.y)
        // console.log(event.delta.y)

        const { active, over } = event


        const activeItem = items.find(ex => ex.sequence === active.id)
        if (!activeItem) {
            return
        }
        if (event.delta.y < -300) {
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




    //arrow
    const [floor, setFloor] = useState<HTMLDivElement | null>(null)
    const [drawer, setDrawer] = useState<HTMLDivElement | null>(null)
    const [cardcontainer, setCardcontainer] = useState<HTMLDivElement | null>(null)
    const [arrow, setArrow] = useState(true)

    const [cards, setCards] = useState<NodeListOf<HTMLElement> | null>(null)

    useEffect(() => {
        setDrawer(document.querySelector('.card_drawer') as HTMLDivElement);

        setFloor(document.querySelector('.floor') as HTMLDivElement);

        setCards(
            document.querySelectorAll<HTMLElement>
                ('.cards'))
    }, [])
    const handleClick = () => {

        if (arrow) {
            if (drawer && floor) {
                drawer.style.bottom = '10vh';
                floor.style.transform = 'translateX(-50%) translateY(-60%) rotateX(80deg) scale(1)';

            }
            if (cardContainer.current) {
                cardContainer.current.style.width = '90vw'
            }

        } else {
            if (drawer && floor) {
                drawer.style.bottom = '-30vh';
                floor.style.transform = 'translateX(-50%) translateY(-60%) rotateX(50deg) scale(1)';


            }
            if (cardContainer.current) {
                cardContainer.current.style.width = '50vw'
            }
        }


        setArrow(!arrow)
    }

    const cardName = useRef<HTMLInputElement | null>(null)

    const cardSubmit = useRef<HTMLFormElement | null>(null)

    const cardContainer = useRef<HTMLDivElement | null>(null)
    const cardDrawer = useRef<HTMLDivElement | null>(null)

    const handleCardChosen = async (prevState: any, formData: FormData) => {
        console.log('submit')
        try {

            const id = formData.get("cardName")

            const result = await cardNameSet(formData)
            console.log(result)
            if (result.status == "SUCCESS") {

                const updated = items.filter(item => item.id !== id).map((item, i) => ({ ...item, sequence: i + 1 }))

                setItems(updated)
                setTimeout(() => {
                    handleClick()
                }, 500)
            }
            return result;
        } catch (e) {
            // console.log(e)

            toast.error('error')
            return { ...prevState, error: "Unexpected  Error Occured", status: "ERROR" };
        }

    }

    const [stateCreate, formActionCard, isPendingCreate] = useActionState(handleCardChosen, "INITIAL");
    return (

        <div className="card_drawer" onClick={handleClick} ref={cardDrawer}>

            <form action={formActionCard} ref={cardSubmit}>
                <input type="text" name="cardName" readOnly hidden ref={cardName} />
                <input type="text" name="timer" readOnly hidden value={'true'} />
                <input type="submit" hidden disabled />
            </form>

            {arrow ?
                <ArrowUp onClick={handleClick} />
                :
                <ArrowDown className='mb-0' onClick={handleClick} />
            }
            {/* <List cardList={['/2C.svg', '/3D.svg', '/2D.svg']} /> */}




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
                            className="card_container w-1/2"
                            ref={cardContainer}
                        >
                            {items.map(item => (

                                <SortableRow
                                    key={item.id}
                                    item={item}
                                    removeItem={removeItem}
                                    arrow={arrow}

                                />
                            ))}

                        </div>
                    </SortableContext>
                    <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
                        {activeItem ? (
                            <SortableRow
                                item={activeItem}
                                removeItem={removeItem}
                                arrow={arrow}
                                forceDragging={true}
                            />
                        ) : null}
                    </DragOverlay>


                </DndContextWithNoSSR>
            ) : null}


            {
                isPendingCreate &&
                <div className=' bg-black w-[100vw] h-[100vh] absolute -top-[20vh] opacity-40'> </div>
            }

        </div>

    )
}