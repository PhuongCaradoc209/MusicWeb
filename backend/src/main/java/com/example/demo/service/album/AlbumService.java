package com.example.demo.service.album;

import com.example.demo.model.Album;
import com.example.demo.repository.AlbumRepository;
import com.example.demo.service.spotify.SpotifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class AlbumService implements IAlbumService {
    private final AlbumRepository albumRepository;
    private final SpotifyService spotifyService;

    @Autowired
    public AlbumService(AlbumRepository albumRepository, SpotifyService spotifyService) {
        this.albumRepository = albumRepository;
        this.spotifyService = spotifyService;
    }

    /**
     * Kiểm tra tồn tại Album theo spotifyAlbumId, nếu chưa có thì tạo mới.
     */
    public Album findOrCreate(String spotifyAlbumId, String name, String imageUrl, String artist) {
        return albumRepository.findBySpotifyAlbumId(spotifyAlbumId)
                .map(existingAlbum -> {
                    // 🔥 Kiểm tra xem có thay đổi dữ liệu không
                    boolean needsUpdate = !Objects.equals(existingAlbum.getName(), name) ||
                            !Objects.equals(existingAlbum.getImageUrl(), imageUrl) ||
                            !Objects.equals(existingAlbum.getArtist(), artist);

                    if (needsUpdate) {
                        System.out.println("🔄 Cập nhật album: " + spotifyAlbumId);
                        existingAlbum.setName(name);
                        existingAlbum.setImageUrl(imageUrl);
                        existingAlbum.setArtist(artist);
                        return albumRepository.save(existingAlbum); // ✅ Cập nhật album
                    }

                    return existingAlbum; // ✅ Không cần cập nhật nếu không có thay đổi
                })
                .orElseGet(() -> {
                    System.out.println("🆕 Tạo mới album: " + spotifyAlbumId);
                    return albumRepository.save(new Album(spotifyAlbumId, name, imageUrl, artist));
                });
    }

    public List<Album> saveNewReleaseAlbumsAndReturn() {
        List<Map<String, String>> newAlbums = spotifyService.getNewReleaseAlbums();
        System.out.println(newAlbums);

        return newAlbums.stream()
                .map(album -> findOrCreate(album.get("id"), album.get("name"), album.get("image"), album.get("artist")))
                .collect(Collectors.toList());
    }
}
