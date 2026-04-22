package com.transit.tracking.service;

import com.transit.tracking.dto.PartnerDTO;
import com.transit.tracking.entity.Partner;
import com.transit.tracking.repository.PartnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PartnerService {
    
    private final PartnerRepository partnerRepository;
    
    @Transactional(readOnly = true)
    public List<PartnerDTO> getAllActivePartners() {
        return partnerRepository.findByActiveTrueOrderByDisplayOrderAsc()
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<PartnerDTO> getAllPartners() {
        return partnerRepository.findAll()
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public PartnerDTO getPartnerById(Long id) {
        Partner partner = partnerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Partner not found with id: " + id));
        return convertToDTO(partner);
    }
    
    @Transactional
    public PartnerDTO createPartner(PartnerDTO dto) {
        Partner partner = convertToEntity(dto);
        partner.setCreatedAt(LocalDateTime.now());
        
        Partner savedPartner = partnerRepository.save(partner);
        return convertToDTO(savedPartner);
    }
    
    @Transactional
    public PartnerDTO updatePartner(Long id, PartnerDTO dto) {
        Partner existingPartner = partnerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Partner not found with id: " + id));
        
        existingPartner.setName(dto.getName());
        existingPartner.setLogoUrl(dto.getLogoUrl());
        existingPartner.setWebsiteUrl(dto.getWebsiteUrl());
        existingPartner.setDescription(dto.getDescription());
        existingPartner.setDisplayOrder(dto.getDisplayOrder());
        existingPartner.setActive(dto.getActive());
        existingPartner.setUpdatedAt(LocalDateTime.now());
        
        Partner updatedPartner = partnerRepository.save(existingPartner);
        return convertToDTO(updatedPartner);
    }
    
    @Transactional
    public void deletePartner(Long id) {
        partnerRepository.deleteById(id);
    }
    
    private PartnerDTO convertToDTO(Partner partner) {
        return PartnerDTO.builder()
            .id(partner.getId())
            .name(partner.getName())
            .logoUrl(partner.getLogoUrl())
            .websiteUrl(partner.getWebsiteUrl())
            .description(partner.getDescription())
            .displayOrder(partner.getDisplayOrder())
            .active(partner.getActive())
            .createdAt(partner.getCreatedAt())
            .build();
    }
    
    private Partner convertToEntity(PartnerDTO dto) {
        return Partner.builder()
            .name(dto.getName())
            .logoUrl(dto.getLogoUrl())
            .websiteUrl(dto.getWebsiteUrl())
            .description(dto.getDescription())
            .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
            .active(dto.getActive() != null ? dto.getActive() : true)
            .build();
    }
}
