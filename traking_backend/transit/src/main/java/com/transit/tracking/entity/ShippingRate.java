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

@Entity
@Table(name = "shipping_rates")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class ShippingRate {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    private String originCountry;
    
    @NotBlank
    private String destinationCountry;
    
    @NotNull
    @Positive
    private BigDecimal baseRate;
    
    @NotNull
    @Positive
    private BigDecimal ratePerKg;
    
    @NotNull
    @Positive
    private BigDecimal customsFeeRate;
    
    @NotNull
    @Positive
    private BigDecimal insuranceRate;
    
    @NotNull
    @Positive
    private BigDecimal handlingFee;
    
    @NotNull
    @Positive
    private BigDecimal taxRate;
    
    private Parcel.PackageType packageType;
    
    private Parcel.ShippingMethod shippingMethod;
    
    @Builder.Default
    private Boolean active = true;
    
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
