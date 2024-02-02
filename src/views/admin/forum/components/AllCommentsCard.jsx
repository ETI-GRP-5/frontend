import React from "react";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";

import { FaUser } from "react-icons/fa";

import { FaEthereum } from "react-icons/fa";
import CommentCard from "../components/CommentCard"
import Card from "components/card";

const HistoryCard = () => {
    const HistoryData = [
        {
            image: Nft1,
            title: "Colorful Heaven",
            owner: "Mark Benjamin",
            price: 0.4,
            time: "30s",
        },
        {
            image: Nft2,
            title: "Abstract Colors",
            owner: "Esthera Jackson",
            price: 2.4,
            time: "50m",
        },
        {
            image: Nft3,
            title: "ETH AI Brain",
            owner: "Nick Wilson",
            price: 0.3,
            time: "20s",
        },
        {
            image: Nft4,
            title: "Swipe Circles",
            owner: " Peter Will",
            price: 0.4,
            time: "4h",
        },
        {
            image: Nft5,
            title: "Mesh Gradients",
            owner: "Will Smith",
            price: 0.4,
            time: "30s",
        },
        {
            image: Nft6,
            title: "3D Cubes Art",
            owner: " Manny Gates",
            price: 0.4,
            time: "2m",
        },
    ];

    return (
        <Card extra={"mt-3 !z-5 overflow-hidden border-0"}>
            {/* HistoryCard Header */}
            <div className="flex items-center justify-between rounded-t-3xl py-3 px-5">
                <div className="text-lg font-bold text-navy-700 dark:text-white">
                    32 comments
                </div>
            </div>

            {/* History CardData */}
            <div className="w-full h-full">
                <div className="flex h-full w-full items-start justify-between bg-white px-9 py-[20px]">
                    <div class="relative border-s border-gray">
                        {HistoryData.map((data, index) => (
                            <CommentCard 
                                key={index}
                                title={data.title} 
                                owner={data.owner}
                                price={data.price}
                                time={data.time}
                            />
                        ))}       
                    </div>
                </div>
            </div>

        
        </Card>
    );
};

export default HistoryCard;