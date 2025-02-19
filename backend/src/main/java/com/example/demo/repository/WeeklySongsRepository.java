package com.example.demo.repository;

import com.example.demo.model.WeeklySong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WeeklySongsRepository extends JpaRepository<WeeklySong, Integer> {
    List<WeeklySong> findTop10ByOrderByRankAsc();  // Lấy top 10 bài hát
}
