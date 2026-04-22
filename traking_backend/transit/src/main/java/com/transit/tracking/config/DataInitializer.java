package com.transit.tracking.config;

import com.transit.tracking.entity.*;
import com.transit.tracking.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final ParcelRepository parcelRepository;
    private final ShipmentHistoryRepository shipmentHistoryRepository;
    private final ShippingRateRepository shippingRateRepository;
    private final BlogPostRepository blogPostRepository;
    private final PartnerRepository partnerRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            // Create admin user
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .email("admin@transit.com")
                    .firstName("Admin")
                    .lastName("User")
                    .role(User.Role.ADMIN)
                    .enabled(true)
                    .build();
                userRepository.save(admin);
            }

            // Create shipping rates
            if (shippingRateRepository.count() == 0) {
                createShippingRates();
            }

            // Create sample partners
            if (partnerRepository.count() == 0) {
                createPartners();
            }

            // Create sample blog posts
            if (blogPostRepository.count() == 0) {
                createBlogPosts();
            }

            // Create sample parcels
            if (parcelRepository.count() == 0) {
                createSampleParcels();
            }
        };
    }

    private void createShippingRates() {
        ShippingRate usToFr = ShippingRate.builder()
            .originCountry("United States")
            .destinationCountry("France")
            .packageType(Parcel.PackageType.STANDARD)
            .shippingMethod(Parcel.ShippingMethod.STANDARD)
            .baseRate(new BigDecimal("25.00"))
            .ratePerKg(new BigDecimal("5.00"))
            .customsFeeRate(new BigDecimal("0.05"))
            .insuranceRate(new BigDecimal("0.02"))
            .handlingFee(new BigDecimal("5.00"))
            .taxRate(new BigDecimal("0.08"))
            .active(true)
            .build();

        ShippingRate frToUs = ShippingRate.builder()
            .originCountry("France")
            .destinationCountry("United States")
            .packageType(Parcel.PackageType.STANDARD)
            .shippingMethod(Parcel.ShippingMethod.STANDARD)
            .baseRate(new BigDecimal("28.00"))
            .ratePerKg(new BigDecimal("5.50"))
            .customsFeeRate(new BigDecimal("0.05"))
            .insuranceRate(new BigDecimal("0.02"))
            .handlingFee(new BigDecimal("5.00"))
            .taxRate(new BigDecimal("0.08"))
            .active(true)
            .build();

        shippingRateRepository.saveAll(Arrays.asList(usToFr, frToUs));
    }

    private void createPartners() {
        Partner fedex = Partner.builder()
            .name("FedEx")
            .logoUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/FedEx_Express.svg/1200px-FedEx_Express.svg.png")
            .websiteUrl("https://www.fedex.com")
            .description("Global logistics and delivery services")
            .displayOrder(1)
            .active(true)
            .build();

        Partner dhl = Partner.builder()
            .name("DHL")
            .logoUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/DHL_Logo.svg/1200px-DHL_Logo.svg.png")
            .websiteUrl("https://www.dhl.com")
            .description("International express mail services")
            .displayOrder(2)
            .active(true)
            .build();

        Partner ups = Partner.builder()
            .name("UPS")
            .logoUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/United_Parcel_Service_logo_2014.svg/1200px-United_Parcel_Service_logo_2014.svg.png")
            .websiteUrl("https://www.ups.com")
            .description("Package delivery and supply chain management")
            .displayOrder(3)
            .active(true)
            .build();

        partnerRepository.saveAll(Arrays.asList(fedex, dhl, ups));
    }

    private void createBlogPosts() {
        BlogPost post1 = BlogPost.builder()
            .title("Welcome to Transit Tracking")
            .slug("welcome-to-transit-tracking")
            .content("Transit Tracking is your reliable partner for international shipping and logistics. We offer real-time tracking, competitive rates, and excellent customer service.")
            .summary("Introduction to our logistics platform")
            .author("Transit Team")
            .published(true)
            .publishedAt(LocalDateTime.now())
            .build();

        BlogPost post2 = BlogPost.builder()
            .title("New Express Shipping Options")
            .slug("new-express-shipping-options")
            .content("We are excited to announce new express shipping options for urgent deliveries. Get your packages delivered within 24-48 hours to major destinations worldwide.")
            .summary("Faster delivery options now available")
            .author("Operations Team")
            .published(true)
            .publishedAt(LocalDateTime.now().minusDays(1))
            .build();

        BlogPost post3 = BlogPost.builder()
            .title("Tips for Safe Packaging")
            .slug("tips-for-safe-packaging")
            .content("Proper packaging is essential for safe delivery. Learn best practices for packaging fragile items, documents, and heavy goods for international shipping.")
            .summary("Best practices for packaging your shipments")
            .author("Safety Team")
            .published(true)
            .publishedAt(LocalDateTime.now().minusDays(3))
            .build();

        blogPostRepository.saveAll(Arrays.asList(post1, post2, post3));
    }

    private void createSampleParcels() {
        Parcel parcel1 = Parcel.builder()
            .trackingNumber("TRKABC123")
            .senderName("John Doe")
            .senderAddress("123 Main St, New York, NY 10001")
            .senderPhone("+1-555-0123")
            .receiverName("Marie Dubois")
            .receiverAddress("45 Rue de la Paix, 75002 Paris, France")
            .receiverPhone("+33-1-42-60-00-00")
            .originCountry("United States")
            .destinationCountry("France")
            .weight(new BigDecimal("2.5"))
            .packageType(Parcel.PackageType.STANDARD)
            .shippingMethod(Parcel.ShippingMethod.EXPRESS)
            .status(Parcel.ParcelStatus.IN_TRANSIT)
            .shippingCost(new BigDecimal("35.00"))
            .customsFee(new BigDecimal("1.75"))
            .insuranceFee(new BigDecimal("0.70"))
            .handlingFee(new BigDecimal("5.00"))
            .tax(new BigDecimal("2.80"))
            .totalCost(new BigDecimal("45.25"))
            .estimatedDeliveryDate(LocalDateTime.now().plusDays(3))
            .build();

        Parcel savedParcel1 = parcelRepository.save(parcel1);

        // Add shipment history
        ShipmentHistory h1 = ShipmentHistory.builder()
            .parcel(savedParcel1)
            .location("New York, USA")
            .description("Package received at warehouse")
            .timestamp(LocalDateTime.now().minusDays(2))
            .build();

        ShipmentHistory h2 = ShipmentHistory.builder()
            .parcel(savedParcel1)
            .location("New York, USA")
            .description("Package departed from origin facility")
            .timestamp(LocalDateTime.now().minusDays(1))
            .build();

        shipmentHistoryRepository.saveAll(Arrays.asList(h1, h2));
    }
}
