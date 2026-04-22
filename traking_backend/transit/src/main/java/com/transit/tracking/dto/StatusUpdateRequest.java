package com.transit.tracking.dto;

import lombok.Data;

@Data
public class StatusUpdateRequest {
    private String status;
    private String location;
    private String description;
}
