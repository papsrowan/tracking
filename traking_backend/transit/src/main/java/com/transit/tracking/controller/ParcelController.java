package com.transit.tracking.controller;

import com.transit.tracking.dto.ParcelDTO;
import com.transit.tracking.service.ParcelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parcels")
@RequiredArgsConstructor
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class ParcelController {
    
    private final ParcelService parcelService;
    
    @GetMapping("/{trackingNumber}")
    public ResponseEntity<ParcelDTO> getParcelByTrackingNumber(@PathVariable String trackingNumber) {
        return ResponseEntity.ok(parcelService.getParcelByTrackingNumber(trackingNumber));
    }
    
    @GetMapping
    public ResponseEntity<List<ParcelDTO>> getAllParcels() {
        return ResponseEntity.ok(parcelService.getAllParcels());
    }
}
