export interface Parcel {
  id: number;
  trackingNumber: string;
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  originCountry: string;
  destinationCountry: string;
  weight: number;
  packageType: 'DOCUMENT' | 'STANDARD' | 'FRAGILE' | 'EXPRESS';
  shippingMethod: 'STANDARD' | 'EXPRESS' | 'OVERNIGHT' | 'ECONOMY';
  status: 'PROCESSING' | 'IN_TRANSIT' | 'CUSTOMS_CLEARANCE' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
  shippingCost: number;
  customsFee: number;
  insuranceFee: number;
  handlingFee: number;
  tax: number;
  totalCost: number;
  estimatedDeliveryDate: string;
  actualDeliveryDate: string | null;
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
