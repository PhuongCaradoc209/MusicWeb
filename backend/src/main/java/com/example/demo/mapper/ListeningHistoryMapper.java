package com.example.demo.mapper;

import com.example.demo.dto.ListeningHistoryDTO;
import com.example.demo.model.ListeningHistory;

import java.util.List;
import java.util.stream.Collectors;

public class ListeningHistoryMapper {
    public static ListeningHistoryDTO toDto(ListeningHistory history) {
        if (history == null) return null;

        return new ListeningHistoryDTO(
                history.getId(),
                history.getSong().getSpotifyId(),
                history.getSong().getTitle(),
                history.getPlayedAt(),
                history.getListenDuration()
        );
    }

    public static List<ListeningHistoryDTO> toDtoList(List<ListeningHistory> historyList) {
        return historyList.stream()
                .map(ListeningHistoryMapper::toDto)
                .collect(Collectors.toList());
    }
}
