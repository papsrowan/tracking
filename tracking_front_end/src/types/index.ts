export interface Parcel {
  id: number;
  trackingNumber: string;

  // Expéditeur
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  senderEmail?: string;

  // Destinataire
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  receiverEmail?: string;

  // Itinéraire
  originCountry: string;
  destinationCountry: string;

  // Informations d'expédition
  carrier?: string;
  typeOfShipment?: string;
  shipmentMode?: string;
  carrierRefNo?: string;
  paymentMode?: string;
  product?: string;
  comments?: string;
  packageQty?: number;
  totalFreight?: number;
  pickupDate?: string;
  pickupTime?: string;
  departureTime?: string;

  // Dimensions & Poids
  weight: number;
  length?: number;
  width?: number;
  height?: number;
  packageType: 'DOCUMENT' | 'STANDARD' | 'FRAGILE' | 'EXPRESS';
  shippingMethod: 'STANDARD' | 'EXPRESS' | 'OVERNIGHT' | 'ECONOMY';

  // Statut
  status: 'PROCESSING' | 'PENDING' | 'IN_TRANSIT' | 'CUSTOMS_CLEARANCE' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

  // Coûts
  shippingCost: number;
  customsFee: number;
  insuranceFee: number;
  handlingFee: number;
  tax: number;
  totalCost: number;

  // Dates
  estimatedDeliveryDate: string;
  actualDeliveryDate: string | null;

  // GPS
  latitude?: number;
  longitude?: number;

  // Historique
  shipmentHistory: ShipmentHistory[];
  createdAt: string;
}

export interface ShipmentHistory {
  id: number;
  location: string;
  description: string;
  timestamp: string;
  createdAt: string;
}

export interface ShippingCalculationRequest {
  originCountry: string;
  destinationCountry: string;
  weight: number;
  packageType: 'DOCUMENT' | 'STANDARD' | 'FRAGILE' | 'EXPRESS';
}

export interface ShippingCalculationResponse {
  baseCost: number;
  customsFee: number;
  insuranceFee: number;
  handlingFee: number;
  tax: number;
  totalPrice: number;
  currency: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  summary: string;
  imageUrl: string | null;
  author: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
}

export interface Partner {
  id: number;
  name: string;
  logoUrl: string | null;
  websiteUrl: string | null;
  description: string | null;
  displayOrder: number;
  active: boolean;
  createdAt: string;
}
