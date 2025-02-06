import React from 'react'

function Body_left_artist({image, name}) {
    return (
        <div className='flex flex-col items-center mt-2 h-24 w-16
                    rounded-lg
                    group cursor-pointer'>   
            <div className='w-16 h-16 rounded-full overflow-hidden'>
                <div 
                    className='w-full h-full bg-cover bg-center 
                            transition-transform duration-300 group-hover:scale-110' 
                    style={{ backgroundImage: `url(${image})` }}
                />
            </div>
            <div className='mt-1.5 text-[9px] text-center'>{name}</div>
        </div>
    );    
}

export default Body_left_artist
