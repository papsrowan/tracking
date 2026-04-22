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
public class PartnerDTO {
    private Long id;
    private String name;
    private String logoUrl;
    private String websiteUrl;
    private String description;
    private Integer displayOrder;
    private Boolean active;
    private LocalDateTime createdAt;
}
