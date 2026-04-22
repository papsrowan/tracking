package com.transit.tracking.controller;

import com.transit.tracking.dto.PartnerDTO;
import com.transit.tracking.service.PartnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/partners")
@RequiredArgsConstructor
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class PartnerController {
    
    private final PartnerService partnerService;
    
    @GetMapping
    public ResponseEntity<List<PartnerDTO>> getAllActivePartners() {
        return ResponseEntity.ok(partnerService.getAllActivePartners());
    }
}
