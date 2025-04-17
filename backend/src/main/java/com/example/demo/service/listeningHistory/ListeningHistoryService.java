package com.example.demo.service.listeningHistory;

import com.example.demo.dto.ListeningHistoryDTO;
import com.example.demo.dto.SongDTO;
import com.example.demo.mapper.ListeningHistoryMapper;
import com.example.demo.model.ListeningHistory;
import com.example.demo.model.Song;
import com.example.demo.model.User;
import com.example.demo.repository.ListeningHistoryRepository;
import com.example.demo.repository.SongRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.song.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ListeningHistoryService implements IListeningHistoryService {
    @Autowired
    private ListeningHistoryRepository listeningHistoryRepository;
    @Autowired
    private SongService songService;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SongRepository songRepository;

    @Override
    public List<ListeningHistoryDTO> getUserHistoryDTO() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user với email: " + email));

        List<ListeningHistory> histories = listeningHistoryRepository.findByUserOrderByPlayedAtDesc(user);
        return histories.stream()
                .map(ListeningHistoryMapper::toDto)
                .toList();
    }

    @Override
    @Transactional
    public void save(ListeningHistoryDTO dto) {
        // 🔐 Lấy user từ SecurityContext
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("👤 Email từ security context: " + email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user với email: " + email));

        // 🎧 Lấy hoặc tạo bài hát từ Spotify ID
        Song song = songRepository.findBySpotifyId(dto.getSpotifyId())
                .orElseGet(() -> {
                    System.out.println("🆕 Bài hát chưa có, gọi Spotify API để tạo mới: " + dto.getSpotifyId());
                    SongDTO songDTO = songService.saveSongFromSpotify(dto.getSpotifyId());
                    return songRepository.findBySpotifyId(dto.getSpotifyId())
                            .orElseThrow(() -> new RuntimeException("Lưu song thất bại sau khi gọi Spotify API"));
                });

        // 🔁 Kiểm tra nếu đã có lịch sử
        Optional<ListeningHistory> existingHistoryOpt = listeningHistoryRepository.findByUserAndSong(user, song);

        ListeningHistory history;
        if (existingHistoryOpt.isPresent()) {
            history = existingHistoryOpt.get();
            history.setPlayedAt(dto.getPlayedAt());
            history.setListenDuration(dto.getDuration());
            System.out.println("🔄 Cập nhật lịch sử đã có");
        } else {
            history = new ListeningHistory();
            history.setUser(user);
            history.setSong(song);
            history.setPlayedAt(dto.getPlayedAt());
            history.setListenDuration(dto.getDuration());
            System.out.println("🆕 Tạo mới lịch sử nghe");
        }

        listeningHistoryRepository.save(history);
    }
}
