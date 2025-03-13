export const fetchTop50Songs = async (country) => {
    if (!country) return [];

    try {
        const lowerCaseCountry = country.toLowerCase();
        const response = await fetch(`http://localhost:8080/api/songs/${lowerCaseCountry}-top50`, {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ backend:", error);
        throw error;
    }
};