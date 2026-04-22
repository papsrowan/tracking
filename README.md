# Transit Tracking - Logistics Platform

A complete production-ready logistics web application for parcel tracking and shipping cost calculation.

## 🚀 Features

- **Parcel Tracking**: Real-time package tracking with detailed timeline and status updates
- **Shipping Calculator**: Dynamic cost calculation with detailed price breakdown (base cost, customs, insurance, handling, tax)
- **Company Website**: Modern company presentation with blog posts and partner showcase
- **Admin Dashboard**: Secure admin panel for managing parcels, blog posts, and partners
- **Mobile-First Design**: Fully responsive UI optimized for all devices

## 🛠 Tech Stack

### Backend (Spring Boot)
- Java 17 with Spring Boot 3.2
- Spring Security with JWT authentication
- Spring Data JPA with PostgreSQL
- RESTful API architecture
- Lombok for boilerplate reduction
- Flyway for database migrations

### Frontend (Next.js)
- Next.js 16 with React 19
- TypeScript for type safety
- Tailwind CSS for styling
- React Query for API state management
- Framer Motion for animations
- Lucide React for icons

### Infrastructure
- Docker & Docker Compose
- PostgreSQL database
- Environment-based configuration

## 📁 Project Structure

```
windsurf-project/
├── traking_backend/transit/     # Spring Boot API
│   ├── src/main/java/com/transit/tracking/
│   │   ├── controller/         # REST controllers
│   │   ├── service/           # Business logic
│   │   ├── repository/        # Data access
│   │   ├── entity/            # JPA entities
│   │   ├── dto/               # Data transfer objects
│   │   └── config/            # Configuration classes
│   └── Dockerfile
│
├── tracking_front_end/         # Next.js frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── app/               # Next.js app router
│   │   ├── hooks/             # React Query hooks
│   │   ├── services/          # API services
│   │   └── types/             # TypeScript types
│   └── Dockerfile
│
├── docker-compose.yml          # Docker orchestration
└── .env.example               # Environment template
```

## 🚀 Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed
- Ports 3000 (frontend), 8080 (backend), and 5432 (PostgreSQL) available

### Running the Application

1. **Clone and navigate to the project:**
```bash
cd windsurf-project
```

2. **Start all services:**
```bash
docker-compose up -d
```

3. **Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api
- Admin credentials: admin / admin123

4. **Stop the services:**
```bash
docker-compose down
```

To remove all data including the database:
```bash
docker-compose down -v
```

## 💻 Local Development

### Backend Development

1. **Navigate to backend:**
```bash
cd traking_backend/transit
```

2. **Ensure PostgreSQL is running** (via Docker or local installation)

3. **Run the application:**
```bash
./mvnw spring-boot:run
```

Or on Windows:
```bash
mvnw.cmd spring-boot:run
```

The backend will start on http://localhost:8080

### Frontend Development

1. **Navigate to frontend:**
```bash
cd tracking_front_end
```

2. **Install dependencies:**
```bash
npm install --legacy-peer-deps
```

3. **Run the development server:**
```bash
npm run dev
```

The frontend will start on http://localhost:3000

## 📊 Database Schema

### Entities
- **User**: Admin users with Spring Security
- **Parcel**: Package information with tracking number
- **ShipmentHistory**: Timeline of parcel status changes
- **ShippingRate**: Cost calculation rules
- **BlogPost**: Company blog articles
- **Partner**: Company partners and logistics providers

### Sample Data
The application includes sample data initialization:
- Admin user (admin / admin123)
- Sample shipping rates (US ↔ France)
- Sample partners (FedEx, DHL, UPS)
- Sample blog posts
- Sample parcel (TRKABC123 for testing)

## 🔌 API Endpoints

### Public Endpoints
```
GET  /api/parcels/{trackingNumber}     # Track a parcel
GET  /api/parcels                       # List all parcels
POST /api/shipping/calculate           # Calculate shipping cost
GET  /api/blog                         # List published blog posts
GET  /api/blog/{slug}                  # Get blog post by slug
GET  /api/partners                     # List active partners
```

### Admin Endpoints (requires authentication)
```
POST   /api/admin/parcels               # Create new parcel
PUT    /api/admin/parcels/{id}/status  # Update parcel status
GET    /api/admin/parcels               # List all parcels
POST   /api/admin/blog                  # Create blog post
PUT    /api/admin/blog/{id}            # Update blog post
PUT    /api/admin/blog/{id}/publish    # Publish blog post
DELETE /api/admin/blog/{id}            # Delete blog post
POST   /api/admin/partners              # Create partner
PUT    /api/admin/partners/{id}        # Update partner
DELETE /api/admin/partners/{id}        # Delete partner
```

## 🎨 UI Components

### Main Components
- **Header**: Navigation with mobile menu
- **Hero**: Landing section with company value proposition
- **TrackingSearch**: Parcel tracking form with results display
- **ShippingCalculator**: Interactive cost calculator
- **BlogPosts**: Blog post grid display
- **Partners**: Partner logo showcase
- **Footer**: Contact information and links

### Design Features
- Modern, minimalist design
- Clean cards with rounded corners
- Subtle shadows and hover effects
- Smooth Framer Motion animations
- Mobile-first responsive layout
- Professional color scheme (blues, grays, whites)

## 🔐 Security

- Spring Security with HTTP Basic authentication
- BCrypt password encoding
- CORS configuration for cross-origin requests
- Role-based access control (ADMIN, USER)
- Input validation with Bean Validation

## 🧪 Testing the Application

1. **Track a sample parcel:**
   - Visit http://localhost:3000
   - Enter tracking number: `TRKABC123`
   - View tracking details and shipment history

2. **Calculate shipping costs:**
   - Select origin and destination countries
   - Enter package weight
   - Choose package type
   - View detailed cost breakdown

3. **Access admin panel:**
   - Use API client (Postman, curl) with Basic Auth
   - Username: `admin`, Password: `admin123`
   - Access admin endpoints at `/api/admin/**`

## 📝 Environment Variables

Create a `.env` file in the project root:

```env
# Database
POSTGRES_DB=logistics_platform
POSTGRES_USER=logistics_user
POSTGRES_PASSWORD=logistics_pass

# Backend
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/logistics_platform
SPRING_JPA_HIBERNATE_DDL_AUTO=update

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## 🐛 Troubleshooting

### Port Conflicts
If ports 3000, 8080, or 5432 are in use, modify the `docker-compose.yml` to use different ports:
```yaml
ports:
  - "3001:3000"  # Frontend on port 3001
  - "8081:8080"  # Backend on port 8081
  - "5433:5432"  # Database on port 5433
```

### Database Connection Issues
Ensure PostgreSQL is healthy before backend starts. The docker-compose includes a healthcheck.

### npm Install Issues
If you encounter peer dependency conflicts:
```bash
npm install --legacy-peer-deps
```

## 📚 Additional Information

- The frontend uses Next.js App Router for improved performance
- React Query handles API caching and state management
- Framer Motion provides smooth animations
- Tailwind CSS ensures consistent, responsive styling
- Spring Boot auto-configuration simplifies setup

## 📄 License

MIT License - Free for personal and commercial use.

---

Built with ❤️ using Spring Boot, Next.js, and modern web technologies.
