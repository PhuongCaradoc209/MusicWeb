package com.example.demo.mapper;

import com.example.demo.dto.ListeningHistoryDTO;
import com.example.demo.model.ListeningHistory;

import java.util.List;
import java.util.stream.Collectors;

public class ListeningHistoryMapper {
    public static ListeningHistoryDTO toDto(ListeningHistory history) {
        if (history == null) return null;

        return new ListeningHistoryDTO(
                history.getSong().getSpotifyId(),
                history.getSong().getTitle(),
                history.getSong().getArtist().getName(),
                history.getSong().getAlbum().getImageUrl(),
                history.getSong().getDuration(),
                history.getPlayedAt()
        );
    }

    public static List<ListeningHistoryDTO> toDtoList(List<ListeningHistory> historyList) {
        return historyList.stream()
                .map(ListeningHistoryMapper::toDto)
                .collect(Collectors.toList());
    }
}
