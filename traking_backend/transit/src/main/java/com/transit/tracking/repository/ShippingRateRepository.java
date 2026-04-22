package com.transit.tracking.repository;

import com.transit.tracking.entity.ShippingRate;
import com.transit.tracking.entity.Parcel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShippingRateRepository extends JpaRepository<ShippingRate, Long> {
    
    @Query("SELECT sr FROM ShippingRate sr WHERE sr.originCountry = :origin AND sr.destinationCountry = :destination AND sr.active = true")
    List<ShippingRate> findActiveRatesByCountries(@Param("origin") String origin, @Param("destination") String destination);
    
    Optional<ShippingRate> findByOriginCountryAndDestinationCountryAndPackageTypeAndShippingMethod(
        String originCountry, String destinationCountry, Parcel.PackageType packageType, Parcel.ShippingMethod shippingMethod);
}
