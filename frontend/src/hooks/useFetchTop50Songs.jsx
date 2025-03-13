import { useState, useEffect } from "react";
import { fetchTop50Songs } from "../service/fetchTop50Songs";

export const useFetchTop50Songs = (country) => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const getSongs = async () => {
            try {
                const data = await fetchTop50Songs(country);
                setSongs(data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu từ backend:", error);
            }
        };

        if (country) {
            getSongs();
        }
    }, [country]);

    return songs;
};