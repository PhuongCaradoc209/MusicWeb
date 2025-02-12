import React from 'react'

function ArtistCard({image, name}) {
    return (
        <div className='flex flex-col items-center mt-2 h-24 w-16
                    rounded-lg
                    group cursor-pointer'>   
            <div className='w-16 aspect-square rounded-full overflow-hidden'>
                <div 
                    className='w-full h-full bg-cover bg-center 
                            transition-transform duration-300 group-hover:scale-125' 
                    style={{ backgroundImage: `url(${image})` }}
                />
            </div>
            <div className='mt-1.5 text-[9px] text-center'>{name}</div>
        </div>
    );    
}

export default ArtistCard
