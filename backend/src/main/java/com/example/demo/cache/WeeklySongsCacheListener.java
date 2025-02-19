package com.example.demo.cache;
import com.example.demo.model.WeeklySong;
import com.example.demo.cache.WeeklySongsCacheManager;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostRemove;
import jakarta.persistence.PostUpdate;
import org.springframework.stereotype.Component;

@Component
public class WeeklySongsCacheListener {

    private final WeeklySongsCacheManager cacheManager;

    public WeeklySongsCacheListener(WeeklySongsCacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }

    @PostUpdate
    @PostPersist
    @PostRemove
    public void clearCache(WeeklySong song) {
        cacheManager.refreshTop10Cache();
    }
}
