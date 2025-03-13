export const fetchNewReleaseSongs = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/songs/new-release-tracks");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Invalid data format from API");
        }

        return data;
    } catch (error) {
        console.error("Error fetching new release songs:", error);
        throw error;
    }
};