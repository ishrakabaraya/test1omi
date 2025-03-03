"use client";
import React, { useState } from 'react'
import { IKImage } from "imagekitio-next";

const urlEndpoint = "https://ik.imagekit.io/m61ypgg2m"
const CardContainer = ({ cardList }: { cardList: string[] }) => {

    type itemType = {
        cardUrl: string,
        rotate: boolean,
        sequence: number
    }

    const [items, setItems] = useState<itemType[]>(cardList.map((v, i) => {
        return {
            cardUrl: v,
            rotate: false,
            sequence: i + 1
        }
    }))

    console.log(items)




    const [card1, setCard1] = useState("");





    const [rotateChevron, setRotateChevron] = useState(false);





    const handleRotate = () => {
        setRotateChevron(!rotateChevron);
        console.log(rotate)
    }

    const rotate = rotateChevron ? "rotateY(180deg)" : "rotateY(0deg)"

    return (<div className="card_container">


        <div className="cards" style={{ transform: rotate }} onClick={handleRotate}>
            <IKImage urlEndpoint={urlEndpoint} path="/2C.svg" alt="Greeting image" />
        </div>


        <IKImage urlEndpoint={urlEndpoint} path="/1B.svg" alt="Greeting image" />


        <IKImage urlEndpoint={urlEndpoint} path="/1B.svg" alt="Greeting image" />
        <IKImage urlEndpoint={urlEndpoint} path="/1B.svg" alt="Greeting image" />
        <IKImage urlEndpoint={urlEndpoint} path="/1B.svg" alt="Greeting image" />

        <IKImage urlEndpoint={urlEndpoint} path="/1B.svg" alt="Greeting image" />
        <IKImage urlEndpoint={urlEndpoint} path="/1B.svg" alt="Greeting image" />
        <IKImage urlEndpoint={urlEndpoint} path="/1B.svg" alt="Greeting image" />
    </div>
    )
}

export default CardContainer