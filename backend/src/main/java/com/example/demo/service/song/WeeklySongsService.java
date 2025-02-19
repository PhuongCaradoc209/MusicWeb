package com.example.demo.service.song;

import com.example.demo.model.WeeklySong;
import com.example.demo.repository.WeeklySongsRepository;
import com.example.demo.service.spotify.SpotifyService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class WeeklySongsService {
    private final WeeklySongsRepository weeklySongsRepository;
    private final SpotifyService spotifyService;

    public WeeklySongsService(WeeklySongsRepository weeklySongsRepository, SpotifyService spotifyService) {
        this.weeklySongsRepository = weeklySongsRepository;
        this.spotifyService = spotifyService;
    }

    public List<Map<String, String>> getTop10SongsWithDetails() {
        return weeklySongsRepository.findTop10ByOrderByRankAsc()
                .stream()
                .map(this::mapToSongDetails)
                .collect(Collectors.toList());
    }

    private Map<String, String> mapToSongDetails(WeeklySong song) {
        String trackId = extractTrackId(song.getUri());
        Map<String, String> trackInfo = spotifyService.getTrackInfo(trackId);

        return Map.of(
                "rank", String.valueOf(song.getRank()),
                "title", song.getTrack_name(),
                "artist", song.getArtist_names(),
                "streams", song.getStreams(),
                "image", trackInfo.getOrDefault("image", ""),
                "duration", trackInfo.getOrDefault("duration", ""),
                "preview", trackInfo.getOrDefault("preview", ""),
                "spotifyUrl", "https://open.spotify.com/track/" + trackId
        );
    }

    private String extractTrackId(String uri) {
        return uri.replace("spotify:track:", "");
    }
}
