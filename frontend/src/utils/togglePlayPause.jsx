const togglePlayPause = async (setIsPlaying, isPlaying, player) => {
    if (!player) return;
    try {
        const state = await player.getCurrentState();
        if (!state) return;

        if (isPlaying) {
            await player.pause();
        } else {
            await player.resume();
        }
        setIsPlaying(!isPlaying);
    } catch (error) {
        console.error("❌ Lỗi khi điều khiển trình phát:", error);
    }
};

export default togglePlayPause;