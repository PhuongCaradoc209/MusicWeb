import axios from "axios";

export const fetchTopArtists = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/spotify/top-artists");
        return response.data.artists || [];
    } catch (error) {
        console.error("Error fetching artists:", error);
        throw new Error("Failed to load artists. Please try again.");
    }
};