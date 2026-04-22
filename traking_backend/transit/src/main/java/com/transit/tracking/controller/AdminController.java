package com.transit.tracking.controller;

import com.transit.tracking.dto.BlogPostDTO;
import com.transit.tracking.dto.ParcelDTO;
import com.transit.tracking.dto.PartnerDTO;
import com.transit.tracking.dto.StatusUpdateRequest;
import com.transit.tracking.entity.Parcel;
import com.transit.tracking.service.BlogPostService;
import com.transit.tracking.service.ParcelService;
import com.transit.tracking.service.PartnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "${app.cors.allowed-origins}")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    
    private final ParcelService parcelService;
    private final BlogPostService blogPostService;
    private final PartnerService partnerService;
    
    // Parcel Management
    @PostMapping("/parcels")
    public ResponseEntity<ParcelDTO> createParcel(@RequestBody ParcelDTO parcelDTO) {
        return ResponseEntity.ok(parcelService.createParcel(parcelDTO));
    }
    
    @PutMapping("/parcels/{id}/status")
    public ResponseEntity<ParcelDTO> updateParcelStatus(
            @PathVariable Long id,
            @RequestBody StatusUpdateRequest request) {
        Parcel.ParcelStatus newStatus = Parcel.ParcelStatus.valueOf(request.getStatus());
        String location = request.getLocation();
        String description = request.getDescription();
        return ResponseEntity.ok(parcelService.updateParcelStatus(id, newStatus, location, description));
    }
    
    @GetMapping("/parcels")
    public ResponseEntity<List<ParcelDTO>> getAllParcels() {
        return ResponseEntity.ok(parcelService.getAllParcels());
    }
    
    // Blog Management
    @PostMapping("/blog")
    public ResponseEntity<BlogPostDTO> createBlogPost(@RequestBody BlogPostDTO blogPostDTO) {
        return ResponseEntity.ok(blogPostService.createPost(blogPostDTO));
    }
    
    @PutMapping("/blog/{id}")
    public ResponseEntity<BlogPostDTO> updateBlogPost(@PathVariable Long id, @RequestBody BlogPostDTO blogPostDTO) {
        return ResponseEntity.ok(blogPostService.updatePost(id, blogPostDTO));
    }
    
    @PutMapping("/blog/{id}/publish")
    public ResponseEntity<BlogPostDTO> publishBlogPost(@PathVariable Long id) {
        return ResponseEntity.ok(blogPostService.publishPost(id));
    }
    
    @DeleteMapping("/blog/{id}")
    public ResponseEntity<Void> deleteBlogPost(@PathVariable Long id) {
        blogPostService.deletePost(id);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/blog")
    public ResponseEntity<List<BlogPostDTO>> getAllBlogPosts() {
        return ResponseEntity.ok(blogPostService.getAllPosts());
    }
    
    // Partner Management
    @PostMapping("/partners")
    public ResponseEntity<PartnerDTO> createPartner(@RequestBody PartnerDTO partnerDTO) {
        return ResponseEntity.ok(partnerService.createPartner(partnerDTO));
    }
    
    @PutMapping("/partners/{id}")
    public ResponseEntity<PartnerDTO> updatePartner(@PathVariable Long id, @RequestBody PartnerDTO partnerDTO) {
        return ResponseEntity.ok(partnerService.updatePartner(id, partnerDTO));
    }
    
    @DeleteMapping("/partners/{id}")
    public ResponseEntity<Void> deletePartner(@PathVariable Long id) {
        partnerService.deletePartner(id);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/partners")
    public ResponseEntity<List<PartnerDTO>> getAllPartners() {
        return ResponseEntity.ok(partnerService.getAllPartners());
    }
}
