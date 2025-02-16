import React from 'react'

function ArtistCard({ image, name }) {
    return (
        <div className='flex flex-col items-center w-28 md:w-28 lg:w-32 cursor-pointer group'>
            <div className='w-full aspect-square rounded-full overflow-hidden border-2 border-transparent
                            transition-all duration-300 hover:border-gray-400'>
                <div className='w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110'
                    style={{ backgroundImage: `url(${image})` }} />
            </div>
            <p className='mt-2 text-sm text-white text-center font-medium'>{name}</p>
        </div>
    );
}

export default ArtistCard