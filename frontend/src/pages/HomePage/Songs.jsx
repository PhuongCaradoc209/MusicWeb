import React from 'react'
import TopSongs from '../../components/TopSongs'
import NewReleaseSongs from '../../components/NewReleaseSongs'
import musicHand from '../../assets/items/musicHand.png'

import { motion } from "framer-motion";
import Top_50Card from '../../components/Top_50Card';

function Songs() {
    return (
        <div className='col-span-5 rounded-2xl
                    bg-gradient-to-l from-[#fe5c3c] to-[#63061a]
                    overflow-y-auto custom-scrollbar text-white
                    space-y-2'>
            <div className='relative w-full h-72 flex justify-center items-center'>
                <motion.img 
                    src={musicHand} 
                    className='w-[50%] aspect-square object-cover relative z-20'
                    alt="Music Hand"
                    initial={{ y: -100, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }}   
                    transition={{ duration: 0.8, ease: "easeOut" }} 
                />
                <div className='absolute inset-0 bg-gradient-to-b from-color_body to-transparent z-10' />
            </div>

            <div className='p-4'>
                <NewReleaseSongs/>
                <div className="h-fit rounded-2xl px-4 py-6 space-y-4 text-lg">
                    <div className="flex justify-between items-center">
                        <p className="font-medium text-white">Top 50</p>
                        <p className="text-gray-100 hover:underline cursor-pointer text-sm transition duration-200">
                            See all
                        </p>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                        <Top_50Card country='Vietnam' fromColor='#73EC8B' toColor='#15B392'/>
                        <Top_50Card country='Global' fromColor='#B6FFFA' toColor='#687EFF'/>
                        <Top_50Card country='korea' fromColor='#FFCD38' toColor='#CF0000'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Songs;
