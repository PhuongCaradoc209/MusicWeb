package com.example.demo.cache;

import com.example.demo.model.Song;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostRemove;
import jakarta.persistence.PostUpdate;
import org.springframework.stereotype.Component;

@Component
public class Top50SongsCacheListener {
    private final Top50SongsCacheManager cacheManager;
    public Top50SongsCacheListener(Top50SongsCacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }

    @PostUpdate
    @PostPersist
    @PostRemove
    public void clearCache(Song song) {
        cacheManager.refreshTop10Cache();
    }
}