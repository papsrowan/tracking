package com.transit.tracking.service;

import com.transit.tracking.dto.BlogPostDTO;
import com.transit.tracking.entity.BlogPost;
import com.transit.tracking.repository.BlogPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BlogPostService {
    
    private final BlogPostRepository blogPostRepository;
    
    @Transactional(readOnly = true)
    public List<BlogPostDTO> getAllPublishedPosts() {
        return blogPostRepository.findByPublishedTrueOrderByPublishedAtDesc()
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<BlogPostDTO> getAllPosts() {
        return blogPostRepository.findAll()
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public BlogPostDTO getPostBySlug(String slug) {
        BlogPost post = blogPostRepository.findBySlug(slug)
            .orElseThrow(() -> new RuntimeException("Blog post not found with slug: " + slug));
        return convertToDTO(post);
    }
    
    @Transactional(readOnly = true)
    public BlogPostDTO getPostById(Long id) {
        BlogPost post = blogPostRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Blog post not found with id: " + id));
        return convertToDTO(post);
    }
    
    @Transactional
    public BlogPostDTO createPost(BlogPostDTO dto) {
        BlogPost post = convertToEntity(dto);
        post.setPublished(false);
        post.setCreatedAt(LocalDateTime.now());
        
        BlogPost savedPost = blogPostRepository.save(post);
        return convertToDTO(savedPost);
    }
    
    @Transactional
    public BlogPostDTO updatePost(Long id, BlogPostDTO dto) {
        BlogPost existingPost = blogPostRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Blog post not found with id: " + id));
        
        existingPost.setTitle(dto.getTitle());
        existingPost.setContent(dto.getContent());
        existingPost.setSummary(dto.getSummary());
        existingPost.setImageUrl(dto.getImageUrl());
        existingPost.setAuthor(dto.getAuthor());
        existingPost.setUpdatedAt(LocalDateTime.now());
        
        BlogPost updatedPost = blogPostRepository.save(existingPost);
        return convertToDTO(updatedPost);
    }
    
    @Transactional
    public BlogPostDTO publishPost(Long id) {
        BlogPost post = blogPostRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Blog post not found with id: " + id));
        
        post.setPublished(true);
        post.setPublishedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        
        BlogPost publishedPost = blogPostRepository.save(post);
        return convertToDTO(publishedPost);
    }
    
    @Transactional
    public void deletePost(Long id) {
        blogPostRepository.deleteById(id);
    }
    
    private BlogPostDTO convertToDTO(BlogPost post) {
        return BlogPostDTO.builder()
            .id(post.getId())
            .title(post.getTitle())
            .slug(post.getSlug())
            .content(post.getContent())
            .summary(post.getSummary())
            .imageUrl(post.getImageUrl())
            .author(post.getAuthor())
            .published(post.getPublished())
            .publishedAt(post.getPublishedAt())
            .createdAt(post.getCreatedAt())
            .build();
    }
    
    private BlogPost convertToEntity(BlogPostDTO dto) {
        return BlogPost.builder()
            .title(dto.getTitle())
            .slug(dto.getSlug())
            .content(dto.getContent())
            .summary(dto.getSummary())
            .imageUrl(dto.getImageUrl())
            .author(dto.getAuthor())
            .build();
    }
}
