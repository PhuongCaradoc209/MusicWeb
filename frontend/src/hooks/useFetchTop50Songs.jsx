import { useState, useEffect } from "react";

export const useFetchTop50Songs = (country) => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
    if (!country) return;
    const lowerCaseCountry = country.toLowerCase();
    fetch(`http://localhost:8080/api/songs/${lowerCaseCountry}-top50`, {
        method: "POST",
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("Fetched new release songs:", data);
        setSongs(data);
        })
    . catch((err) => console.error("Lỗi khi lấy dữ liệu từ backend:", err));
    }, [country]);

    return songs;
};