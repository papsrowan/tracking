package com.transit.tracking.service;

import com.transit.tracking.dto.ParcelDTO;
import com.transit.tracking.dto.ShipmentHistoryDTO;
import com.transit.tracking.entity.Parcel;
import com.transit.tracking.entity.ShipmentHistory;
import com.transit.tracking.repository.ParcelRepository;
import com.transit.tracking.repository.ShipmentHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParcelService {
    
    private final ParcelRepository parcelRepository;
    private final ShipmentHistoryRepository shipmentHistoryRepository;
    
    @Transactional(readOnly = true)
    public ParcelDTO getParcelByTrackingNumber(String trackingNumber) {
        Parcel parcel = parcelRepository.findByTrackingNumber(trackingNumber)
            .orElseThrow(() -> new RuntimeException("Parcel not found with tracking number: " + trackingNumber));
        return convertToDTO(parcel);
    }
    
    @Transactional(readOnly = true)
    public List<ParcelDTO> getAllParcels() {
        return parcelRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    @Transactional
    public ParcelDTO createParcel(ParcelDTO parcelDTO) {
        Parcel parcel = convertToEntity(parcelDTO);
        parcel.setTrackingNumber(generateTrackingNumber());
        parcel.setStatus(Parcel.ParcelStatus.PROCESSING);
        parcel.setCreatedAt(LocalDateTime.now());
        
        Parcel savedParcel = parcelRepository.save(parcel);
        
        // Add initial shipment history
        ShipmentHistory history = ShipmentHistory.builder()
            .parcel(savedParcel)
            .location(parcel.getOriginCountry())
            .description("Package received at warehouse")
            .timestamp(LocalDateTime.now())
            .build();
        shipmentHistoryRepository.save(history);
        
        return convertToDTO(savedParcel);
    }
    
    @Transactional
    public ParcelDTO updateParcelStatus(Long parcelId, Parcel.ParcelStatus newStatus, String location, String description) {
        Parcel parcel = parcelRepository.findById(parcelId)
            .orElseThrow(() -> new RuntimeException("Parcel not found with id: " + parcelId));
        
        parcel.setStatus(newStatus);
        if (newStatus == Parcel.ParcelStatus.DELIVERED) {
            parcel.setActualDeliveryDate(LocalDateTime.now());
        }
        parcel.setUpdatedAt(LocalDateTime.now());
        
        Parcel updatedParcel = parcelRepository.save(parcel);
        
        // Add shipment history entry with fallback for optional fields
        String historyLocation = (location != null && !location.trim().isEmpty()) ? location : "Mise à jour système";
        String historyDescription = (description != null && !description.trim().isEmpty()) ? description : "Statut mis à jour: " + newStatus.name();
        
        ShipmentHistory history = ShipmentHistory.builder()
            .parcel(updatedParcel)
            .location(historyLocation)
            .description(historyDescription)
            .timestamp(LocalDateTime.now())
            .build();
        shipmentHistoryRepository.save(history);
        
        return convertToDTO(updatedParcel);
    }
    
    private String generateTrackingNumber() {
        return "TRK" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
    
    private ParcelDTO convertToDTO(Parcel parcel) {
        List<ShipmentHistoryDTO> historyDTOs = parcel.getShipmentHistory() != null ? 
            parcel.getShipmentHistory().stream()
                .map(h -> ShipmentHistoryDTO.builder()
                    .id(h.getId())
                    .location(h.getLocation())
                    .description(h.getDescription())
                    .timestamp(h.getTimestamp())
                    .createdAt(h.getCreatedAt())
                    .build())
                .collect(Collectors.toList()) : null;
        
        return ParcelDTO.builder()
            .id(parcel.getId())
            .trackingNumber(parcel.getTrackingNumber())
            .senderName(parcel.getSenderName())
            .senderAddress(parcel.getSenderAddress())
            .senderPhone(parcel.getSenderPhone())
            .receiverName(parcel.getReceiverName())
            .receiverAddress(parcel.getReceiverAddress())
            .receiverPhone(parcel.getReceiverPhone())
            .originCountry(parcel.getOriginCountry())
            .destinationCountry(parcel.getDestinationCountry())
            .weight(parcel.getWeight())
            .packageType(parcel.getPackageType())
            .shippingMethod(parcel.getShippingMethod())
            .status(parcel.getStatus())
            .shippingCost(parcel.getShippingCost())
            .customsFee(parcel.getCustomsFee())
            .insuranceFee(parcel.getInsuranceFee())
            .handlingFee(parcel.getHandlingFee())
            .tax(parcel.getTax())
            .totalCost(parcel.getTotalCost())
            .estimatedDeliveryDate(parcel.getEstimatedDeliveryDate())
            .actualDeliveryDate(parcel.getActualDeliveryDate())
            .shipmentHistory(historyDTOs)
            .createdAt(parcel.getCreatedAt())
            .build();
    }
    
    private Parcel convertToEntity(ParcelDTO dto) {
        return Parcel.builder()
            .senderName(dto.getSenderName())
            .senderAddress(dto.getSenderAddress())
            .senderPhone(dto.getSenderPhone())
            .receiverName(dto.getReceiverName())
            .receiverAddress(dto.getReceiverAddress())
            .receiverPhone(dto.getReceiverPhone())
            .originCountry(dto.getOriginCountry())
            .destinationCountry(dto.getDestinationCountry())
            .weight(dto.getWeight())
            .packageType(dto.getPackageType())
            .shippingMethod(dto.getShippingMethod())
            .shippingCost(dto.getShippingCost())
            .customsFee(dto.getCustomsFee())
            .insuranceFee(dto.getInsuranceFee())
            .handlingFee(dto.getHandlingFee())
            .tax(dto.getTax())
            .totalCost(dto.getTotalCost())
            .estimatedDeliveryDate(dto.getEstimatedDeliveryDate())
            .build();
    }
}
