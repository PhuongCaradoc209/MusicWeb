import React from 'react';
import AlbumsSlide from '../components/AlbumsSlide';

function AlbumPage() {
    return (
        <div
            className="mt-20 text-white overflow-auto custom-scrollbar h-full flex"
        >
            <div className='flex-[3] flex justify-center'>
                <AlbumsSlide/>
            </div>
            <div className='flex-[1] flex justify-center'> 

            </div>
        </div>
    );
}

export default AlbumPage;