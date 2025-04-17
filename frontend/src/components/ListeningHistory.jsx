import React from 'react';
import SongList from './SongList';
import useFetchListeningHistory from '../hooks/useFetchListeningHistory';

function ListeningHistory() {
    const { history, loading, error } = useFetchListeningHistory();

    if (!loading && !error && history.length === 0) {
        return null;
    }

    return (
        <div className='h-fit rounded-2xl px-4 py-6 bg-color_body space-y-6 text-lg'>
        <div className='flex justify-between items-center'>
            <p className='font-medium text-white'>Recently Played</p>
            <p className='text-gray-400 hover:text-white cursor-pointer text-sm transition duration-200'>
            See all
            </p>
        </div>

        <div className='flex flex-col gap-y-2 overflow-y-auto scrollbar-hidden max-h-44'>
            {loading && <p className="text-gray-400 text-sm">Đang tải...</p>}
            {error && <p className="text-red-500 text-sm">Lỗi khi tải lịch sử nghe</p>}
            {!loading && !error &&
            history.map((song) => (
                <SongList
                key={song.id}
                id={song.id}
                srcImage={song.srcImage}
                titleSong={song.titleSong}
                artist={song.artist}
                duration={song.duration}
                onClick={() => console.log("Clicked song:", song.titleSong)}
                />
            ))}
        </div>
        </div>
    );
}

export default ListeningHistory;