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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

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
        String imageUrl = "";
        List<Map<String, Object>> images = (List<Map<String, Object>>) albumData.get("images");
        if (images != null && !images.isEmpty()) {
            imageUrl = images.get(0).get("url").toString();
        }
        Album album = albumService.findOrCreate(spotifyAlbumId, albumName, imageUrl);

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
        List<Map<String, Object>> tracks = spotifyService.getGlobalTop50Tracks(country);
        return tracks.stream().map(trackData -> {
            // Lấy trackId từ dữ liệu track
            String trackId = trackData.get("id").toString();
            // Gọi phương thức saveSongFromSpotify để lưu hoặc lấy song đã tồn tại
            return saveSongFromSpotify(trackId);
        }).collect(Collectors.toList());
    }
}
