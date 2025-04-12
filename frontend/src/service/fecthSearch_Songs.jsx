export const fetchSearch_Song = async (query) => {
    if (!query) return [];
    
    try {
        const res = await fetch(`http://localhost:8080/api/spotify/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        return data.tracks && data.tracks.items ? data.tracks.items : [];
    } catch (error) {
        console.error("Error fetching search results:", error);
        return [];
    }
};