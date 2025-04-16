import React, { useEffect, useState } from 'react';
import useFetchNewReleaseAlbums from '../hooks/useFetchNewReleaseAlbum';

function AlbumsSlide() {
    const [fetchedAlbums, loading, error] = useFetchNewReleaseAlbums();
    const [activeIndex, setActiveIndex] = useState(2); // ảnh giữa

    //AUTO SLIDE
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % fetchedAlbums.length);
        }, 3000); 

        return () => clearInterval(interval); 
    }, [fetchedAlbums.length]);

    const getTransformStyle = (index) => {
        const diff = index - activeIndex;
    
        switch (diff) {
            case 0:
                return {
                    transform: 'translateX(0) rotateY(0deg) scale(1)',
                    zIndex: 20,
                    opacity: 1,
                };
            case -1:
                return {
                    transform: 'translateX(-70%) rotateY(35deg) scale(0.9)',
                    zIndex: 10,
                    opacity: 1,
                };
            case -2:
                return {
                    transform: 'translateX(-120%) rotateY(55deg) scale(0.75)',
                    zIndex: 0,
                    opacity: 0.4,
                };
            case 1:
                return {
                    transform: 'translateX(70%) rotateY(-35deg) scale(0.9)',
                    zIndex: 10,
                    opacity: 1,
                };
            case 2:
                return {
                    transform: 'translateX(120%) rotateY(-55deg) scale(0.75)',
                    zIndex: 0,
                    opacity: 0.4,
                };
            default:
                return {
                    opacity: 0,
                    transform: 'scale(0.5)',
                    zIndex: -1,
                };
        }
    };    

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + fetchedAlbums.length) % fetchedAlbums.length);
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % fetchedAlbums.length);
    };

    if (loading) return <div className="text-center text-white">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;
    if (!fetchedAlbums || fetchedAlbums.length === 0) return <div className="text-center text-white">No albums found.</div>;

    console.log(fetchedAlbums);
    return (
        <div
            className="relative w-full h-[320px] flex justify-center items-center"
            style={{ perspective: '1000px' }}
        >
            {fetchedAlbums.map((album, index) => {
                const style = getTransformStyle(index);
                return (
                    <React.Fragment key={album.id}>
                        {/* Ảnh chính */}
                        <img
                            src={album.image}
                            alt={album.name}
                            className="absolute transition-all duration-[2s] ease-in-out shadow-xl rounded-xl"
                            style={{
                                width: '250px',
                                height: '250px',
                                transformStyle: 'preserve-3d',
                                backfaceVisibility: 'hidden',
                                ...style,
                            }}
                        />

                        {/* Ảnh phản chiếu */}
                        <img
                            src={album.image}
                            alt={`reflection-${album.name}`}
                            className="absolute transition-all duration-[2s] ease-in-out rounded-xl"
                            style={{
                                width: '250px',
                                height: '250px',
                                transformStyle: 'preserve-3d',
                                backfaceVisibility: 'hidden',
                                ...style,
                                transform: `${style.transform} translateY(100px) scaleY(-1)`, // đảo ảnh và đẩy xuống dưới
                                opacity: style.opacity * 0.4, // làm mờ hơn
                                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)', // đổ bóng
                                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)',
                            }}
                        />
                    </React.Fragment>
                );
            })}

            {/* Controls */}
            {/* <button
                onClick={handlePrev}
                className="absolute left-5 top-1/2 -translate-y-1/2 bg-black px-3 py-1 rounded-full shadow hover:bg-white"
            >
                ‹
            </button>
            <button
                onClick={handleNext}
                className="absolute right-5 top-1/2 -translate-y-1/2 bg-black px-3 py-1 rounded-full shadow hover:bg-white"
            >
                ›
            </button> */}

            {/* Pagination Dots */}
            <div className="absolute bottom-0 flex gap-2">
                {fetchedAlbums.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`w-2 h-2 z-50 rounded-full cursor-pointer transition-all duration-300 ${
                            index === activeIndex ? 'bg-white scale-125' : 'bg-white/50'
                        }`}
                    />
                ))}
            </div>

        </div>
    );
}

export default AlbumsSlide;