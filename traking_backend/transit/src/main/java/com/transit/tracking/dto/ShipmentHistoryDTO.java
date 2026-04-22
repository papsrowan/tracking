package com.transit.tracking.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShipmentHistoryDTO {
    private Long id;
    private String location;
    private String description;
    private LocalDateTime timestamp;
    private LocalDateTime createdAt;
}
