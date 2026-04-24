package com.transit.tracking.dto;

import com.transit.tracking.entity.Parcel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParcelDTO {
    private Long id;
    private String trackingNumber;

    // ── Expéditeur ──────────────────────────────────────────────
    private String senderName;
    private String senderAddress;
    private String senderPhone;
    private String senderEmail;

    // ── Destinataire ─────────────────────────────────────────────
    private String receiverName;
    private String receiverAddress;
    private String receiverPhone;
    private String receiverEmail;

    // ── Itinéraire ───────────────────────────────────────────────
    private String originCountry;
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
    private BigDecimal weight;
    private BigDecimal length;
    private BigDecimal width;
    private BigDecimal height;
    private Parcel.PackageType packageType;
    private Parcel.ShippingMethod shippingMethod;

    // ── Statut ───────────────────────────────────────────────────
    private Parcel.ParcelStatus status;

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

    // ── Coordonnées GPS ──────────────────────────────────────────
    private Double latitude;
    private Double longitude;

    // ── Historique ───────────────────────────────────────────────
    private List<ShipmentHistoryDTO> shipmentHistory;
    private LocalDateTime createdAt;
}
