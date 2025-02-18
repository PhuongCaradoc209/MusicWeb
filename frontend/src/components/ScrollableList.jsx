import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ScrollableList = ({ items, CardComponent }) => {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    useEffect(() => {
        const checkScroll = () => {
            if (scrollRef.current) {
                setCanScrollLeft(scrollRef.current.scrollLeft > 0);
                setCanScrollRight(
                    scrollRef.current.scrollLeft + scrollRef.current.clientWidth < scrollRef.current.scrollWidth
                );
            }
        };

        if (scrollRef.current) {
            scrollRef.current.addEventListener("scroll", checkScroll);
            checkScroll();
        }

        return () => {
            if (scrollRef.current) {
                scrollRef.current.removeEventListener("scroll", checkScroll);
            }
        };
    }, [items]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.8; 
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative w-full">
            {canScrollLeft && (
                <button 
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md hover:bg-gray-800 z-10"
                    onClick={() => scroll("left")}
                >
                    <FaChevronLeft size={20} />
                </button>
            )}

            <div 
                ref={scrollRef} 
                className="inline-flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-4 p-4 scrollbar-hidden max-w-full"
            >

                {items.map((item, index) => (
                    <div key={index} className="snap-center min-w-[200px]"> 
                        {React.createElement(CardComponent, item)}
                    </div>
                ))}
            </div>

            {canScrollRight && (
                <button 
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md hover:bg-gray-800 z-10"
                    onClick={() => scroll("right")}
                >
                    <FaChevronRight size={20} />
                </button>
            )}
        </div>
    );
};

export default ScrollableList;
