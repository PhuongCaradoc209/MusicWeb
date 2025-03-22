package com.example.demo.service.song;

import com.example.demo.dto.SongDTO;
import com.example.demo.mapper.SongMapper;
import com.example.demo.model.Album;
import com.example.demo.model.Artist;
import com.example.demo.model.Song;
import com.example.demo.repository.SongRepository;
import com.example.demo.service.album.AlbumService;
import com.example.demo.service.artist.ArtistService;
import com.example.demo.service.spotify.SpotifyService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SongService implements ISongService {
    @Autowired
    private SongRepository songRepository;
    @Autowired
    private SpotifyService spotifyService;
    @Autowired
    private ArtistService artistService;
    @Autowired
    private AlbumService albumService;
    @Autowired
    private RestTemplate restTemplate;

    private final String YOUTUBE_API_KEY = "AIzaSyDBRJiqRJtnAHbJau61XzHifCBd5K-JOFQ";
//
//    @Override
//    public SongDTO createSong(SongDTO songDTO) {
//        Song song = SongMapper.toSong(songDTO);
//        Song savedSong = songRepository.save(song);
//        return SongMapper.toSongDTO(savedSong);
//    }
//
//    @Override
//    public SongDTO getSongById(Long id) {
//        return songRepository.findById(id)
//                .map(SongMapper::toSongDTO)
//                .orElseThrow(() -> new RuntimeException("Song not found with id: " + id));
//    }
//
//    @Override
//    public List<SongDTO> getAllSongs() {
//        return songRepository.findAll().stream()
//                .map(SongMapper::toSongDTO)
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public SongDTO updateSong(Long id, SongDTO songDTO) {
//        Song existingSong = songRepository.findById(id).orElseThrow(()->new RuntimeException("Song not found with id: " + id));
//        existingSong.setTitle(songDTO.getTitle());
//        existingSong.setArtistId(songDTO.getArtistId());
//        existingSong.setDuration(songDTO.getDuration());
//        existingSong.setAlbumId(songDTO.getAlbumId());
//        existingSong.setGenre(songDTO.getGenre());
//
//        Song updatedSong = songRepository.save(existingSong);
//        return SongMapper.toSongDTO(updatedSong);
//    }
//
//    @Override
//    public void deleteSong(Long id) {
//        Song song = songRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Song not found with id: " + id));
//        songRepository.delete(song);
//    }

    public SongDTO saveSongFromSpotify(String trackId) {
        Optional<Song> existing = songRepository.findBySpotifyId(trackId);

        if (existing.isPresent()) {
            return SongMapper.toSongDTO(existing.get());
        }

        // Lấy dữ liệu track từ Spotify API
        Map<String, Object> trackData = spotifyService.getTrackData(trackId);
        String spotifyId = trackData.get("id").toString();
        String title = trackData.get("name").toString();
        long duration = Long.parseLong(trackData.get("duration_ms").toString());
        String previewUrl = trackData.get("preview_url") != null ? trackData.get("preview_url").toString() : null;
        // Ví dụ: releaseDate có thể không có, bạn có thể parse nếu có trường "release_date"
        LocalDateTime releaseDate = LocalDateTime.now();

        // Xử lý Artist: chọn nghệ sĩ đầu tiên
        List<Map<String, Object>> artistsList = (List<Map<String, Object>>) trackData.get("artists");
        Map<String, Object> primaryArtist = artistsList.get(0);
        String spotifyArtistId = primaryArtist.get("id").toString();
        String artistName = primaryArtist.get("name").toString();
        Artist artist = artistService.findOrCreate(spotifyArtistId, artistName);

        // Xử lý Album
        Map<String, Object> albumData = (Map<String, Object>) trackData.get("album");
        String spotifyAlbumId = albumData.get("id").toString();
        String albumName = albumData.get("name").toString();
        String imageUrl = albumData.get("img").toString();
        String artistAl  = albumData.get("artist").toString();
        List<Map<String, Object>> images = (List<Map<String, Object>>) albumData.get("images");
        if (images != null && !images.isEmpty()) {
            imageUrl = images.get(0).get("url").toString();
        }
        Album album = albumService.findOrCreate(spotifyAlbumId, albumName, imageUrl, artistAl);

        // Genre: nếu có dữ liệu, nếu không thì để null
        String genre = trackData.get("genre") != null ? trackData.get("genre").toString() : null;

        Song song = new Song(spotifyId, title, artist, album, duration, releaseDate, previewUrl, genre);
        Song savedSong = songRepository.save(song);
        System.out.println(savedSong);
        return SongMapper.toSongDTO(savedSong);
    }

    /**
     * Lấy danh sách Global Top 50 tracks từ Spotify API và lưu chúng vào database.
     * Trả về danh sách SongDTO của các bài hát đã được lưu.
     */
    public List<SongDTO> saveTop50Tracks(String country) {
        List<Map<String, Object>> tracks = spotifyService.getTop50Tracks(country);
        return tracks.stream().map(trackData -> {
            // Lấy trackId từ dữ liệu track
            String trackId = trackData.get("id").toString();
            // Gọi phương thức saveSongFromSpotify để lưu hoặc lấy song đã tồn tại
            return saveSongFromSpotify(trackId);
        }).collect(Collectors.toList());
    }

    public List<SongDTO> saveNewReleaseTracks() {
        List<Map<String, String>> newTracks = spotifyService.getNewReleaseTracks();

        return newTracks.stream().map(track -> {
            String trackId = track.get("id");
            return saveSongFromSpotify(trackId);
        }).collect(Collectors.toList());
    }

    public String getYouTubeVideoIdBySpotifyId(String spotifyId) {
        try {
            // 1. Tìm bài hát theo spotifyId trong database
            Optional<Song> songOpt = songRepository.findBySpotifyId(spotifyId);
            if (songOpt.isEmpty()) {
                throw new RuntimeException("Không tìm thấy bài hát với spotifyID: " + spotifyId);
            }
            Song song = songOpt.get();

            // 2. Lấy tên bài hát và tên nghệ sĩ
            String songTitle = song.getTitle();
            String artistName = song.getArtist().getName();

            // 3. Xây dựng query tìm kiếm trên YouTube: tên bài hát + tên nghệ sĩ
            String query = songTitle + " " + artistName;
            String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);

            // 4. Tạo URL gọi YouTube API
            String url = "https://www.googleapis.com/youtube/v3/search?part=snippet"
                    + "&q=" + encodedQuery
                    + "&type=video"
                    + "&maxResults=1"
                    + "&regionCode=VN"
                    + "&key=" + YOUTUBE_API_KEY
                    + "&random=" + System.currentTimeMillis();

            // Log the URL for debugging
            System.out.println("YouTube API URL: " + url);

            // 5. Gọi YouTube API
            HttpHeaders headers = new HttpHeaders();
            headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0");
            headers.set("Accept", "application/json, text/plain, */*");
            headers.set("Referer", "https://www.youtube.com/");
            headers.set("Cache-Control", "no-cache");
            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            if (response.getStatusCode() != HttpStatus.OK || response.getBody() == null) {
                throw new RuntimeException("Không lấy được dữ liệu từ YouTube API");
            }

            // Log the response body for debugging
            System.out.println("Response Headers: " + response.getHeaders());
            System.out.println("YouTube API Response: " + response.getBody());

            // 6. Phân tích JSON trả về sử dụng JsonNode
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());
            JsonNode itemsNode = root.path("items");

            if (itemsNode.isArray() && itemsNode.size() > 0) {
                JsonNode firstItem = itemsNode.get(0);
                JsonNode videoIdNode = firstItem.path("id").path("videoId");
                if (!videoIdNode.isMissingNode()) {
                    return videoIdNode.asText();
                }
            } else {
                // Log if no items are found
                System.out.println("No items found in YouTube API response.");
            }
            return null;
        } catch (IOException e) {
            // Log lỗi hoặc xử lý theo cách bạn muốn
            throw new RuntimeException("Lỗi khi xử lý dữ liệu từ YouTube API", e);
        }
    }

    public Optional<SongDTO> getSongBySpotifyId(String spotifyId) {
        return songRepository.findBySpotifyId(spotifyId)
                .map(SongMapper::toSongDTO);
    }
}
