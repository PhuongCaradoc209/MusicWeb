package com.example.demo.cache;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Component;

@Component
public class Top50SongsCacheManager {
    @CacheEvict(value = "globalTop50", key = "'globalTop50'")
    public void refreshTop10Cache() {

    }
}
