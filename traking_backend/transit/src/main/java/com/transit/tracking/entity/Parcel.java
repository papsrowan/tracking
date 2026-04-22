package com.transit.tracking.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "parcels")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Parcel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Column(unique = true)
    private String trackingNumber;
    
    @NotBlank
    private String senderName;
    
    @NotBlank
    private String senderAddress;
    
    @NotBlank
    private String senderPhone;
    
    @NotBlank
    private String receiverName;
    
    @NotBlank
    private String receiverAddress;
    
    @NotBlank
    private String receiverPhone;
    
    @NotBlank
    private String originCountry;
    
    @NotBlank
    private String destinationCountry;
    
    @NotNull
    @Positive
    private BigDecimal weight;
    
    @Enumerated(EnumType.STRING)
    private PackageType packageType;
    
    @Enumerated(EnumType.STRING)
    private ShippingMethod shippingMethod;
    
    @Enumerated(EnumType.STRING)
    private ParcelStatus status = ParcelStatus.PROCESSING;
    
    private BigDecimal shippingCost;
    
    private BigDecimal customsFee;
    
    private BigDecimal insuranceFee;
    
    private BigDecimal handlingFee;
    
    private BigDecimal tax;
    
    private BigDecimal totalCost;
    
    private LocalDateTime estimatedDeliveryDate;
    
    private LocalDateTime actualDeliveryDate;
    
    @OneToMany(mappedBy = "parcel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ShipmentHistory> shipmentHistory;
    
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    public enum PackageType {
        DOCUMENT, STANDARD, FRAGILE, EXPRESS
    }
    
    public enum ShippingMethod {
        STANDARD, EXPRESS, OVERNIGHT, ECONOMY
    }
    
    public enum ParcelStatus {
        PROCESSING, IN_TRANSIT, CUSTOMS_CLEARANCE, OUT_FOR_DELIVERY, DELIVERED, CANCELLED
    }
}
