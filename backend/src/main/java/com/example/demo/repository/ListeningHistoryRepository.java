package com.example.demo.repository;

import com.example.demo.model.ListeningHistory;
import com.example.demo.model.Song;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ListeningHistoryRepository extends JpaRepository<ListeningHistory, Long> {
    List<ListeningHistory> findByUserOrderByPlayedAtDesc(User user);
    Optional<ListeningHistory> findByUserAndSong(User user, Song song);
}
