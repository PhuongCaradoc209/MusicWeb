package com.example.demo.service.spotify;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Service
public class SpotifyService {
    @Value("${spotify.client.id}")
    private String CLIENT_ID;
    @Value("${spotify.client.secret}")
    private String CLIENT_SECRET;
    @Value("${spotify.redirect.uri}")
    private String REDIRECT_URI;
    @Value("${spotify.refresh.token}")
    private String REFRESH_TOKEN;

    private static final String TOKEN_URL = "https://accounts.spotify.com/api/token";
    private static final String BASE_URL = "https://api.spotify.com/v1";

    private static final Logger logger = LoggerFactory.getLogger(SpotifyService.class);
    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Lấy access token từ Spotify API.
     */
    private String cachedAccessToken;
    private long tokenExpiryTime = 0; // Thời điểm token hết hạn (milliseconds)

    public String getSpotifyAuthUrl() {
        return "https://accounts.spotify.com/authorize"
                + "?client_id=" + CLIENT_ID
                + "&response_type=code"
                + "&redirect_uri=" + REDIRECT_URI
                + "&scope=streaming user-read-private user-modify-playback-state";
    }

//    public String getAccessToken(String code) {
//        // Nếu token vẫn còn hạn, trả về luôn
//        if (cachedAccessToken != null && System.currentTimeMillis() < tokenExpiryTime) {
//            return cachedAccessToken;
//        }
//
//        // Nếu không có refresh token, lấy access token bằng code (lần đầu đăng nhập)
//        if (refreshToken == null) {
//            return fetchNewAccessToken(code);
//        }
//
//        // Nếu có refresh token, thử refresh token
//        return refreshAccessToken();
//    }


    private String fetchNewAccessToken(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth(CLIENT_ID, CLIENT_SECRET);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("code", code);
        body.add("redirect_uri", REDIRECT_URI);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(TOKEN_URL, HttpMethod.POST, request, Map.class);
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                cachedAccessToken = Objects.toString(response.getBody().get("access_token"), "");
                REFRESH_TOKEN = Objects.toString(response.getBody().get("refresh_token"), "");
                tokenExpiryTime = System.currentTimeMillis() + (Integer) response.getBody().get("expires_in") * 1000 - 60000;

                return cachedAccessToken;
            } else {
                throw new RuntimeException("Failed to retrieve access token: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error fetching access token: " + e.getMessage());
        }
    }

//    private String refreshAccessToken() {
//        if (refreshToken == null || refreshToken.isEmpty()) {
//            throw new RuntimeException("No refresh token available. Please reauthenticate.");
//        }
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//        headers.setBasicAuth(CLIENT_ID, CLIENT_SECRET);
//
//        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
//        body.add("grant_type", "refresh_token");
//        body.add("refresh_token", refreshToken);
//
//        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
//
//        try {
//            ResponseEntity<Map> response = restTemplate.exchange(TOKEN_URL, HttpMethod.POST, request, Map.class);
//            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
//                cachedAccessToken = Objects.toString(response.getBody().get("access_token"), "");
//                tokenExpiryTime = System.currentTimeMillis() + (Integer) response.getBody().get("expires_in") * 1000 - 60000;
//                return cachedAccessToken;
//            } else {
//                throw new RuntimeException("Failed to refresh access token: " + response.getStatusCode());
//            }
//        } catch (HttpClientErrorException e) {
//            if (e.getStatusCode() == HttpStatus.BAD_REQUEST) {
//                throw new RuntimeException("Refresh token expired. Please update it manually.");
//            }
//            throw new RuntimeException("Error refreshing access token: " + e.getMessage());
//        }
//    }

    public String getAccessToken() {
        if (cachedAccessToken != null && System.currentTimeMillis() < tokenExpiryTime) {
            return cachedAccessToken;
        }
        return refreshAccessToken();
    }

    private String refreshAccessToken() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth(CLIENT_ID, CLIENT_SECRET);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "refresh_token");
        body.add("refresh_token", REFRESH_TOKEN);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(TOKEN_URL, HttpMethod.POST, request, Map.class);
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                cachedAccessToken = Objects.toString(response.getBody().get("access_token"), "");
                tokenExpiryTime = System.currentTimeMillis() + (Integer) response.getBody().get("expires_in") * 1000 - 60000;

                return cachedAccessToken;
            } else {
                throw new RuntimeException("Failed to refresh access token: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error refreshing access token: " + e.getMessage());
        }
    }

    public String searchSpotify(String query) {
        if (query.isEmpty()) {
            throw new IllegalArgumentException("Query cannot be empty");
        }

        String accessToken = getAccessToken();
        String url = "https://api.spotify.com/v1/search?q=" + query + "&type=track,artist,album&limit=10";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            throw new RuntimeException("Failed to fetch search results from Spotify");
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

    public Map<String, String> getFirstTrackFromAlbum(String accessToken, String albumId, String albumImage) {
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

    @Cacheable(value = "newReleases", key = "'albums'")
    public List<Map<String, String>> getNewReleaseAlbums() {
        String accessToken = getAccessToken();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        String url = BASE_URL + "/browse/new-releases?country=VN&limit=10"; // Lấy 10 album mới nhất tại Việt Nam

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
            if (response.getStatusCode() != HttpStatus.OK || response.getBody() == null) {
                throw new RuntimeException("Failed to fetch new release albums: " + response.getStatusCode());
            }

            List<Map<String, String>> albums = new ArrayList<>();
            Map<String, Object> albumsData = (Map<String, Object>) response.getBody().get("albums");

            if (albumsData != null) {
                List<Map<String, Object>> items = (List<Map<String, Object>>) albumsData.get("items");

                if (items != null) {
                    for (Map<String, Object> album : items) {
                        Map<String, String> albumData = new HashMap<>();
                        albumData.put("id", album.get("id").toString());
                        albumData.put("name", album.get("name").toString());

                        List<Map<String, Object>> images = (List<Map<String, Object>>) album.get("images");
                        albumData.put("image", (images != null && !images.isEmpty()) ? images.get(0).get("url").toString() : "");

                        List<Map<String, Object>> artists = (List<Map<String, Object>>) album.get("artists");
                        albumData.put("artist", (artists != null && !artists.isEmpty()) ? artists.get(0).get("name").toString() : "Unknown");

                        albums.add(albumData);
                    }
                }
            }

            return albums;
        } catch (Exception e) {
            throw new RuntimeException("Error fetching new release albums: " + e.getMessage());
        }
    }

    @Cacheable(value = "top50", key = "#country", unless = "#result == null || #result.isEmpty()")
    public List<Map<String, Object>> getTop50Tracks(String country) {
        String accessToken = getAccessToken();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        String ID_PLAYLIST;
        if (Objects.equals(country, "global")){
            ID_PLAYLIST = "5dRf6aFdWTzAwxVMRzIqhv";
        } else if (Objects.equals(country, "vietnam")) {
            ID_PLAYLIST = "1OzCJ16JSIlHd2yps5tkfU";
        } else{
            ID_PLAYLIST = "0kzHhkwrByLv5Yhx5NXmZP"; //CHINA
        }

        // Thay YOUR_PLAYLIST_ID bằng ID playlist cá nhân của bạn
        String url = BASE_URL + "/playlists/" + ID_PLAYLIST + "/tracks?limit=50";

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);

            if (response.getStatusCode() != HttpStatus.OK || response.getBody() == null) {
                throw new RuntimeException("Failed to fetch My Top 50 tracks: " + response.getStatusCode());
            }

            List<Map<String, Object>> items = (List<Map<String, Object>>) response.getBody().get("items");
            List<Map<String, Object>> tracks = new ArrayList<>();
            if (items != null) {
                for (Map<String, Object> item : items) {
                    Map<String, Object> trackObj = (Map<String, Object>) item.get("track");
                    if (trackObj != null) {
                        tracks.add(trackObj);
                    }
                }
            }
            return tracks;
        } catch (Exception e) {
            logger.error("Error fetching My Top 50 tracks", e);
            return Collections.emptyList();
        }
    }

    public Map<String, Object> getTrackData(String trackId) {
        String accessToken = getAccessToken();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        String url = BASE_URL + "/tracks/" + trackId;

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
            if (response.getStatusCode() != HttpStatus.OK || response.getBody() == null) {
                throw new RuntimeException("Failed to fetch track details: " + response.getStatusCode());
            }
            // Trả về toàn bộ dữ liệu thô của track
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Error fetching track data: " + e.getMessage());
        }
    }

    /**
     * Chuyển đổi milliseconds thành mm:ss
     */
    public String convertMsToMinutes(long millis) {
        long minutes = (millis / 1000) / 60;
        long seconds = (millis / 1000) % 60;
        return String.format("%02d:%02d", minutes, seconds);
    }
}