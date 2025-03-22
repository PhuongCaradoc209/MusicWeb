package com.example.demo.controller;

import com.example.demo.model.Album;
import com.example.demo.service.album.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/albums")
public class AlbumController {
    @Autowired
    private  AlbumService albumService;
    /**
     * Lấy danh sách album mới từ Spotify API, lưu vào database và trả về danh sách album đã lưu.
     */
    @GetMapping("/new-releases")
    public ResponseEntity<List<Album>> fetchAndSaveNewReleaseAlbums() {
        List<Album> albums = albumService.saveNewReleaseAlbumsAndReturn();
        return ResponseEntity.ok(albums);
    }
}