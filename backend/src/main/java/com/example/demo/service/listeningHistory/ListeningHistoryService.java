package com.example.demo.service.listeningHistory;

import com.example.demo.dto.ListeningHistoryDTO;
import com.example.demo.mapper.ListeningHistoryMapper;
import com.example.demo.model.ListeningHistory;
import com.example.demo.model.Song;
import com.example.demo.model.User;
import com.example.demo.repository.ListeningHistoryRepository;
import com.example.demo.repository.SongRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ListeningHistoryService implements IListeningHistoryService {
    @Autowired
    private ListeningHistoryRepository listeningHistoryRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SongRepository songRepository;

    @Override
    public List<ListeningHistoryDTO> getUserHistoryDTO(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<ListeningHistory> histories = listeningHistoryRepository.findByUserOrderByPlayedAtDesc(user);

        return ListeningHistoryMapper.toDtoList(histories);
    }

    @Override
    public void save(ListeningHistoryDTO dto) {
        // 🔐 Lấy email từ SecurityContext
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("👤 Email từ security context: " + email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user với email: " + email));

        // 🎧 Lấy bài hát theo Spotify ID
        Song song = songRepository.findBySpotifyId(dto.getSpotifyId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bài hát với spotifyId: " + dto.getSpotifyId()));

        // 📜 Lưu lịch sử
        ListeningHistory history = new ListeningHistory();
        history.setUser(user);
        history.setSong(song);
        history.setPlayedAt(dto.getPlayedAt());
        history.setListenDuration(dto.getListenDuration());

        listeningHistoryRepository.save(history);
    }


}
