package com.example.demo.service.album;

import com.example.demo.model.Album;
import com.example.demo.repository.AlbumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlbumService implements IAlbumService {
    private final AlbumRepository albumRepository;

    @Autowired
    public AlbumService(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    /**
     * Kiểm tra tồn tại Album theo spotifyAlbumId, nếu chưa có thì tạo mới.
     */
    public Album findOrCreate(String spotifyAlbumId, String name, String imageUrl) {
        return albumRepository.findBySpotifyAlbumId(spotifyAlbumId)
                .orElseGet(() -> albumRepository.save(new Album(spotifyAlbumId, name, imageUrl)));
    }
}
