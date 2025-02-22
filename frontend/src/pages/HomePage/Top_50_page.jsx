import React from 'react'
import TopSongs from '../../components/TopSongs'
import NewReleaseSongs from '../../components/NewReleaseSongs'
import musicHand from '../../assets/items/musicHand.png'

import { motion } from "framer-motion";
import Top_50Card from '../../components/Top_50Card';

function Top_50_page() {
    return (
    <div className='col-span-5 rounded-2xl
                    bg-gradient-to-b from-[#15B392] to-color_body
                    overflow-y-auto custom-scrollbar text-white
                    space-y-2 h-full'>
            <div className="relative w-full h-96 grid grid-cols-3">
                <div className='col-span-1 flex justify-center items-center'>
                    <div 
                        className="relative
                                h-60 md:h-64 lg:h-72
                                aspect-square bg-black 
                                flex justify-center items-center  
                                bg-gradient-to-b from-[#73EC8B] to-[#15B392]"
                    >
                        <span className="flex flex-col items-center 
                                        text-2xl md:text-3xl lg:text-5xl
                                        font-bold w-[70%]">
                            <p>Top 50</p>
                            <hr className="my-8 w-full"/>
                            <p className="text-base md:text-lg lg:text-xl 
                                            uppercase font-medium">Viet Nam</p>
                        </span>
                    </div>
                </div>
                
                <span className="col-span-2 flex flex-col justify-center">
                    <p className='font-medium mb-4'>Playlist</p>
                    <p className='font-bold text-7xl'>
                        Top 50 - Viet Nam
                    </p>
                    <span className='w-[70%] font-medium mt-8'>
                        <p>
                            Discover the hottest tracks in Vietnam right now! 
                        </p>
                        <p>
                        This chart features the most popular songs, updated regularly based on streaming trends and listener favorites.
                        </p>
                    </span>
                </span>
            </div>

            <div className=''>
                
            </div>
    </div>
    )
}

export default Top_50_page
