package com.example.demo.cache;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Component;

@Component
public class WeeklySongsCacheManager {

    @CacheEvict(value = "top10songs", key = "'weeklyTop10'")
    public void refreshTop10Cache() {
        System.out.println("📢 Xóa cache top 10 bài hát");
    }
}
