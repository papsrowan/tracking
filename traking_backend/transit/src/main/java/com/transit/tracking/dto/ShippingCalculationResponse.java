package com.transit.tracking.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShippingCalculationResponse {
    private BigDecimal baseCost;
    private BigDecimal customsFee;
    private BigDecimal insuranceFee;
    private BigDecimal handlingFee;
    private BigDecimal tax;
    private BigDecimal totalPrice;
    @Builder.Default
    private String currency = "USD";
}
