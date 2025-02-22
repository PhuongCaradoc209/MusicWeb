package com.example.demo.service.spotify;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Service
public class SpotifyService {
    @Value("${spotify.client.id}")
    private String CLIENT_ID;
    @Value("${spotify.client.secret}")
    private String CLIENT_SECRET;

    private static final String TOKEN_URL = "https://accounts.spotify.com/api/token";
    private static final String BASE_URL = "https://api.spotify.com/v1";

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Lấy access token từ Spotify API.
     */
    private String cachedAccessToken;
    private long tokenExpiryTime = 0; // Thời điểm token hết hạn (milliseconds)

    public String getAccessToken() {
        if (cachedAccessToken != null && System.currentTimeMillis() < tokenExpiryTime) {
            return cachedAccessToken;
        }
        // Lấy token mới
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth(CLIENT_ID, CLIENT_SECRET);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "client_credentials");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(TOKEN_URL, HttpMethod.POST, request, Map.class);
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                cachedAccessToken = Objects.toString(response.getBody().get("access_token"), "");
                // Giả sử token có thời gian sống là 3600 giây
                tokenExpiryTime = System.currentTimeMillis() + 3600 * 1000 - 60000; // trừ 1 phút để an toàn
                return cachedAccessToken;
            } else {
                throw new RuntimeException("Failed to retrieve access token: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error fetching access token: " + e.getMessage());
        }
    }

    /**
     * Lấy danh sách top 10 nghệ sĩ từ Spotify.
     */
    @Cacheable(value = "topArtists", key = "'artists'")
    public List<Map<String, String>> getTopArtists() {
        String accessToken = getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        String url = BASE_URL + "/search?q=genre:pop&type=artist&limit=8"; // Tìm top 5 nghệ sĩ thể loại pop

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);

            if (response.getStatusCode() != HttpStatus.OK || response.getBody() == null) {
                throw new RuntimeException("Failed to fetch data from Spotify: " + response.getStatusCode());
            }

            List<Map<String, String>> artists = new ArrayList<>();
            Map<String, Object> artistsData = (Map<String, Object>) response.getBody().get("artists");

            if (artistsData != null) {
                List<Map<String, Object>> items = (List<Map<String, Object>>) artistsData.get("items");

                if (items != null) {
                    for (Map<String, Object> artist : items) {
                        Map<String, String> artistData = new HashMap<>();
                        artistData.put("name", artist.get("name").toString());
                        artistData.put("id", artist.get("id").toString());

                        List<Map<String, Object>> images = (List<Map<String, Object>>) artist.get("images");
                        artistData.put("image", (images != null && !images.isEmpty()) ? images.get(0).get("url").toString() : "");

                        artists.add(artistData);
                    }
                }
            }

            return artists;
        } catch (Exception e) {
            throw new RuntimeException("Error fetching top artists: " + e.getMessage());
        }
    }

    public Map<String, String> getTrackInfo(String trackId) {
        String accessToken = getAccessToken();
        String url = "https://api.spotify.com/v1/tracks/" + trackId;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
            if (response.getStatusCode() != HttpStatus.OK || response.getBody() == null) {
                throw new RuntimeException("Failed to fetch track details: " + response.getStatusCode());
            }

            Map<String, Object> trackData = response.getBody();
            String imageUrl = extractImage(trackData);
            String durationMs = Objects.toString(trackData.get("duration_ms"), "0");
            String previewUrl = Objects.toString(trackData.get("preview_url"), "");

            return Map.of(
                    "image", imageUrl,
                    "duration", durationMs,
                    "preview", previewUrl
            );

        } catch (Exception e) {
            throw new RuntimeException("Error fetching track info: " + e.getMessage());
        }
    }

    private String extractImage(Map<String, Object> trackData) {
        try {
            Map<String, Object> album = (Map<String, Object>) trackData.get("album");
            List<Map<String, Object>> images = (List<Map<String, Object>>) album.get("images");
            if (images != null && !images.isEmpty()) {
                return images.get(0).get("url").toString();
            }
        } catch (Exception ignored) {
        }
        return "";
    }

    @Cacheable(value = "newReleaseTracks", key = "'tracks'")
    public List<Map<String, String>> getNewReleaseTracks() {
        String accessToken = getAccessToken();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        String url = BASE_URL + "/browse/new-releases?country=VN&limit=10"; // Lấy 10 album mới nhất tại Việt Nam

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
            if (response.getStatusCode() != HttpStatus.OK || response.getBody() == null) {
                throw new RuntimeException("Failed to fetch new releases: " + response.getStatusCode());
            }

            List<Map<String, String>> tracks = new ArrayList<>();
            Map<String, Object> albumsData = (Map<String, Object>) response.getBody().get("albums");

            if (albumsData != null) {
                List<Map<String, Object>> items = (List<Map<String, Object>>) albumsData.get("items");

                if (items != null) {
                    for (Map<String, Object> album : items) {
                        String albumId = album.get("id").toString();
                        String albumImage = "";
                        List<Map<String, Object>> images = (List<Map<String, Object>>) album.get("images");
                        if (images != null && !images.isEmpty()) {
                            albumImage = images.get(0).get("url").toString();
                        }
                        Map<String, String> trackData = getFirstTrackFromAlbum(accessToken, albumId, albumImage);
                        if (trackData != null) {
                            tracks.add(trackData);
                        }
                    }
                }
            }

            return tracks;
        } catch (Exception e) {
            throw new RuntimeException("Error fetching new release tracks: " + e.getMessage());
        }
    }

    private Map<String, String> getFirstTrackFromAlbum(String accessToken, String albumId, String albumImage) {
        String url = BASE_URL + "/albums/" + albumId + "/tracks?limit=1";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
            if (response.getStatusCode() != HttpStatus.OK || response.getBody() == null) {
                throw new RuntimeException("Failed to fetch tracks from album: " + response.getStatusCode());
            }

            List<Map<String, Object>> items = (List<Map<String, Object>>) response.getBody().get("items");

            if (items != null && !items.isEmpty()) {
                Map<String, Object> track = items.get(0);
                Map<String, String> trackData = new HashMap<>();
                //NAME SONG
                trackData.put("name", Objects.toString(track.get("name"), ""));
                //ID SONG
                trackData.put("id", Objects.toString(track.get("id"), ""));
                //FIRST ARTIST
                List<Map<String, Object>> artists = (List<Map<String, Object>>) track.get("artists");
                trackData.put("artist", (artists != null && !artists.isEmpty())
                        ? Objects.toString(artists.get(0).get("name"), "Unknown")
                        : "Unknown");
                trackData.put("duration", Objects.toString(track.get("duration_ms"), "0"));
                //IMAGE FROM ALBUM
                trackData.put("image", albumImage);

                Object preview = track.get("preview_url");
                trackData.put("audioPreview", preview != null ? preview.toString() : "");

                return trackData;
            }
            return null;
        } catch (Exception e) {
            throw new RuntimeException("Error fetching track from album: " + e.getMessage());
        }
    }
}