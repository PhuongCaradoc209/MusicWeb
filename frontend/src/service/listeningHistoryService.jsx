import axios from "axios";

const ListeningHistoryService = {
    save: async (spotifyId, listenDuration = 0) => {
        try {
            await axios.post("/api/listening-history/save", {
                spotifyId,
                listenDuration,
                playedAt: new Date().toISOString(),
            },
            {
                withCredentials: true,
            }
        );
            console.log("✅ Đã lưu lịch sử nghe:", spotifyId);
        } catch (error) {
            console.error("❌ Lỗi khi lưu lịch sử nghe:", error);
        }
    },
    getUserHistory: async () => {
        try {
            const res = await axios.get("/api/users/me/listening-history", {
                withCredentials: true,
        });
            console.log("🎧 Đã lấy lịch sử nghe:", res.data);
            return res.data;
        } catch (error) {
            console.error("❌ Lỗi khi lấy lịch sử nghe:", error);
            return [];
        }
    },
};

export default ListeningHistoryService;