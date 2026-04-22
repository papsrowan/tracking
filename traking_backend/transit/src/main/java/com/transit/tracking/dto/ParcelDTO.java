package com.transit.tracking.dto;

import com.transit.tracking.entity.Parcel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParcelDTO {
    private Long id;
    private String trackingNumber;
    private String senderName;
    private String senderAddress;
    private String senderPhone;
    private String receiverName;
    private String receiverAddress;
    private String receiverPhone;
    private String originCountry;
    private String destinationCountry;
    private BigDecimal weight;
    private Parcel.PackageType packageType;
    private Parcel.ShippingMethod shippingMethod;
    private Parcel.ParcelStatus status;
    private BigDecimal shippingCost;
    private BigDecimal customsFee;
    private BigDecimal insuranceFee;
    private BigDecimal handlingFee;
    private BigDecimal tax;
    private BigDecimal totalCost;
    private LocalDateTime estimatedDeliveryDate;
    private LocalDateTime actualDeliveryDate;
    private List<ShipmentHistoryDTO> shipmentHistory;
    private LocalDateTime createdAt;
}
