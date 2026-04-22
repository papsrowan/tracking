package com.transit.tracking.controller;

import com.transit.tracking.dto.ShippingCalculationRequest;
import com.transit.tracking.dto.ShippingCalculationResponse;
import com.transit.tracking.service.ShippingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shipping")
@RequiredArgsConstructor
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class ShippingController {
    
    private final ShippingService shippingService;
    
    @PostMapping("/calculate")
    public ResponseEntity<ShippingCalculationResponse> calculateShipping(@RequestBody ShippingCalculationRequest request) {
        return ResponseEntity.ok(shippingService.calculateShipping(request));
    }
}
