package com.example.demo.service.spotify;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Service
public class SpotifyService {
    private static final String CLIENT_ID = "73d67f6d5eb64d8388129f9ac3e1f2ad";
    private static final String CLIENT_SECRET = "fa214010f1f346f4a50bd519b3fc9cf9";
    private static final String TOKEN_URL = "https://accounts.spotify.com/api/token";
    private static final String BASE_URL = "https://api.spotify.com/v1";

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Lấy access token từ Spotify API.
     */
    public String getAccessToken() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth(CLIENT_ID, CLIENT_SECRET);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "client_credentials");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(TOKEN_URL, HttpMethod.POST, request, Map.class);
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return Objects.toString(response.getBody().get("access_token"), "");
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
}