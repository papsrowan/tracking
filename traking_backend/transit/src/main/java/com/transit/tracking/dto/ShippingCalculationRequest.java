package com.transit.tracking.dto;

import com.transit.tracking.entity.Parcel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShippingCalculationRequest {
    private String originCountry;
    private String destinationCountry;
    private BigDecimal weight;
    private Parcel.PackageType packageType;
}
