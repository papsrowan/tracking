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
public class BlogPostDTO {
    private Long id;
    private String title;
    private String slug;
    private String content;
    private String summary;
    private String imageUrl;
    private String author;
    private Boolean published;
    private LocalDateTime publishedAt;
    private LocalDateTime createdAt;
}
