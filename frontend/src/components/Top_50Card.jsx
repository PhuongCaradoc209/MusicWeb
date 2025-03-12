import React from 'react'
import { useNavigate } from 'react-router-dom';

function Top_50Card({country, fromColor, toColor}) {
    const navigate = useNavigate();

    const playlistId = country.toLowerCase() === "global"
        ? "5dRf6aFdWTzAwxVMRzIqhv"
        : country.toLowerCase() === "vietnam"
        ? "1OzCJ16JSIlHd2yps5tkfU"
        : "0kzHhkwrByLv5Yhx5NXmZP"; //CHINA

    const handleClick = () => {
        navigate(`/songsPage/top50/${country.toLowerCase()}/${playlistId}`);
    };

    return (
        <div className='relative w-[24rem] 
                        h-48 md:h-52 lg:h-56 bg-black
                        flex justify-center items-center
                        group 
                        cursor-pointer rounded-2xl'
            onClick={handleClick}
            style={{
                backgroundImage: `linear-gradient(to bottom, ${fromColor}, ${toColor})`
            }}>
            <span className='flex flex-col items-center text-5xl font-bold w-[50%]
                            group-hover:scale-110 transition duration-200'>
                <p>
                    Top 50
                </p>
                <hr className='my-4 w-full'/>
                <p className='text-xl'>{country}</p>
            </span>
        </div>
    )
}

export default Top_50Card
