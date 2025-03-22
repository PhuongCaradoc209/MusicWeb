import { createContext, useState, useEffect } from "react";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    const [track, setTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [player, setPlayer] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);

    return (
        <MusicContext.Provider value={{ track, setTrack, isPlaying, setIsPlaying, player, setPlayer, currentTime, setCurrentTime }}>
            {children}
        </MusicContext.Provider>
    );
};

export default MusicContext;