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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
    
    // ── Expéditeur ──────────────────────────────────────────────
    @NotBlank
    private String senderName;
    
    @NotBlank
    private String senderAddress;
    
    private String senderPhone;
    
    private String senderEmail;
    
    // ── Destinataire ─────────────────────────────────────────────
    @NotBlank
    private String receiverName;
    
    @NotBlank
    private String receiverAddress;
    
    private String receiverPhone;
    
    private String receiverEmail;
    
    // ── Itinéraire ───────────────────────────────────────────────
    @NotBlank
    private String originCountry;
    
    @NotBlank
    private String destinationCountry;
    
    // ── Informations d'expédition ────────────────────────────────
    private String carrier;
    
    private String typeOfShipment;
    
    private String shipmentMode;
    
    private String carrierRefNo;
    
    private String paymentMode;
    
    private String product;
    
    private String comments;
    
    private Integer packageQty;
    
    private BigDecimal totalFreight;
    
    private LocalDate pickupDate;
    
    private LocalTime pickupTime;
    
    private LocalTime departureTime;
    
    // ── Dimensions & Poids ───────────────────────────────────────
    @NotNull
    @Positive
    private BigDecimal weight;
    
    private BigDecimal length;
    
    private BigDecimal width;
    
    private BigDecimal height;
    
    @Enumerated(EnumType.STRING)
    private PackageType packageType;
    
    @Enumerated(EnumType.STRING)
    private ShippingMethod shippingMethod;
    
    @Enumerated(EnumType.STRING)
    private ParcelStatus status = ParcelStatus.PROCESSING;
    
    // ── Coûts ────────────────────────────────────────────────────
    private BigDecimal shippingCost;
    
    private BigDecimal customsFee;
    
    private BigDecimal insuranceFee;
    
    private BigDecimal handlingFee;
    
    private BigDecimal tax;
    
    private BigDecimal totalCost;
    
    // ── Dates de livraison ───────────────────────────────────────
    private LocalDateTime estimatedDeliveryDate;
    
    private LocalDateTime actualDeliveryDate;
    
    // ── Coordonnées GPS (pour la carte) ──────────────────────────
    private Double latitude;
    
    private Double longitude;
    
    // ── Historique ───────────────────────────────────────────────
    @OneToMany(mappedBy = "parcel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ShipmentHistory> shipmentHistory;
    
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    // ── Enums ─────────────────────────────────────────────────────
    public enum PackageType {
        DOCUMENT, STANDARD, FRAGILE, EXPRESS
    }
    
    public enum ShippingMethod {
        STANDARD, EXPRESS, OVERNIGHT, ECONOMY
    }
    
    public enum ParcelStatus {
        PROCESSING, PENDING, IN_TRANSIT, CUSTOMS_CLEARANCE, OUT_FOR_DELIVERY, DELIVERED, CANCELLED
    }
}
