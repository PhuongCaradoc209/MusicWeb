package com.example.demo.controller;

import com.example.demo.dto.ListeningHistoryDTO;
import com.example.demo.service.listeningHistory.ListeningHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/listening-history")
public class ListeningHistory {
    @Autowired
    private ListeningHistoryService listeningHistoryService;

    @PostMapping("/save")
    public ResponseEntity<?> saveListeningHistory(@RequestBody ListeningHistoryDTO dto) {
        listeningHistoryService.save(dto);
        return ResponseEntity.ok().build();
    }
}
