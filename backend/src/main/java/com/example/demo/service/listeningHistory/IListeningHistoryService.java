package com.example.demo.service.listeningHistory;

import com.example.demo.dto.ListeningHistoryDTO;

import java.util.List;

public interface IListeningHistoryService {
    List<ListeningHistoryDTO> getUserHistoryDTO();
    void save(ListeningHistoryDTO dto);
}
