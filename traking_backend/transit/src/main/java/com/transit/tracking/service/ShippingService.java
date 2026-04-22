package com.transit.tracking.service;

import com.transit.tracking.dto.ShippingCalculationRequest;
import com.transit.tracking.dto.ShippingCalculationResponse;
import com.transit.tracking.entity.Parcel;
import com.transit.tracking.entity.ShippingRate;
import com.transit.tracking.repository.ShippingRateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShippingService {
    
    private final ShippingRateRepository shippingRateRepository;
    
    public ShippingCalculationResponse calculateShipping(ShippingCalculationRequest request) {
        // Find appropriate shipping rate
        Optional<ShippingRate> rateOpt = shippingRateRepository
            .findByOriginCountryAndDestinationCountryAndPackageTypeAndShippingMethod(
                request.getOriginCountry(),
                request.getDestinationCountry(),
                request.getPackageType(),
                Parcel.ShippingMethod.STANDARD
            );
        
        ShippingRate rate = rateOpt.orElseGet(() -> createDefaultRate(request));
        
        // Calculate costs
        BigDecimal weight = request.getWeight();
        BigDecimal baseCost = rate.getBaseRate().add(rate.getRatePerKg().multiply(weight));
        BigDecimal customsFee = baseCost.multiply(rate.getCustomsFeeRate());
        BigDecimal insuranceFee = baseCost.multiply(rate.getInsuranceRate());
        BigDecimal handlingFee = rate.getHandlingFee();
        BigDecimal tax = baseCost.multiply(rate.getTaxRate());
        
        BigDecimal totalPrice = baseCost.add(customsFee).add(insuranceFee).add(handlingFee).add(tax);
        
        return ShippingCalculationResponse.builder()
            .baseCost(round(baseCost))
            .customsFee(round(customsFee))
            .insuranceFee(round(insuranceFee))
            .handlingFee(round(handlingFee))
            .tax(round(tax))
            .totalPrice(round(totalPrice))
            .currency("USD")
            .build();
    }
    
    private ShippingRate createDefaultRate(ShippingCalculationRequest request) {
        // Default rates if no specific rate found
        BigDecimal baseRate = new BigDecimal("10.00");
        BigDecimal ratePerKg = new BigDecimal("2.50");
        
        // Adjust rates based on countries
        if (!request.getOriginCountry().equals(request.getDestinationCountry())) {
            baseRate = new BigDecimal("25.00");
            ratePerKg = new BigDecimal("5.00");
        }
        
        // Adjust for package type
        switch (request.getPackageType()) {
            case EXPRESS:
                baseRate = baseRate.multiply(new BigDecimal("2.0"));
                break;
            case FRAGILE:
                baseRate = baseRate.multiply(new BigDecimal("1.5"));
                break;
            case DOCUMENT:
                baseRate = baseRate.multiply(new BigDecimal("0.8"));
                break;
            default:
                break;
        }
        
        return ShippingRate.builder()
            .originCountry(request.getOriginCountry())
            .destinationCountry(request.getDestinationCountry())
            .packageType(request.getPackageType())
            .baseRate(baseRate)
            .ratePerKg(ratePerKg)
            .customsFeeRate(new BigDecimal("0.05"))
            .insuranceRate(new BigDecimal("0.02"))
            .handlingFee(new BigDecimal("5.00"))
            .taxRate(new BigDecimal("0.08"))
            .build();
    }
    
    private BigDecimal round(BigDecimal value) {
        return value.setScale(2, RoundingMode.HALF_UP);
    }
}
