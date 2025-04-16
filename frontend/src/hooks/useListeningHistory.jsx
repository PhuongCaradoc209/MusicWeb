import { useState } from "react";
import ListeningHistoryService from "../service/listeningHistoryService";

const useListeningHistory = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const saveListeningHistory = async (spotifyId, listenDuration = 0) => {
        setIsSaving(true);
        setError(null);

        try {
            await ListeningHistoryService.save(spotifyId, listenDuration);
        } catch (err) {
            setError(err);
        } finally {
            setIsSaving(false);
        }
    };

    return { saveListeningHistory, isSaving, error };
};

export default useListeningHistory;