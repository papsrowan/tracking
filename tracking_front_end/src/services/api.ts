import axios from 'axios';
import { Parcel, ShippingCalculationRequest, ShippingCalculationResponse, BlogPost, Partner } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const parcelApi = {
  getParcel: async (trackingNumber: string): Promise<Parcel> => {
    const response = await api.get(`/parcels/${trackingNumber}`);
    return response.data;
  },

  getAllParcels: async (): Promise<Parcel[]> => {
    const response = await api.get('/parcels');
    return response.data;
  },
};

export const shippingApi = {
  calculateShipping: async (request: ShippingCalculationRequest): Promise<ShippingCalculationResponse> => {
    const response = await api.post('/shipping/calculate', request);
    return response.data;
  },
};

export const blogApi = {
  getAllPosts: async (): Promise<BlogPost[]> => {
    const response = await api.get('/blog');
    return response.data;
  },

  getPostBySlug: async (slug: string): Promise<BlogPost> => {
    const response = await api.get(`/blog/${slug}`);
    return response.data;
  },
};

export const partnerApi = {
  getAllPartners: async (): Promise<Partner[]> => {
    const response = await api.get('/partners');
    return response.data;
  },
};

// Admin API with authentication
const getAdminAuth = () => {
  const auth = localStorage.getItem('adminAuth');
  return auth ? JSON.parse(auth) : null;
};

const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth header to admin requests
adminApi.interceptors.request.use((config) => {
  const auth = getAdminAuth();
  if (auth) {
    config.headers.Authorization = `Basic ${btoa(`${auth.username}:${auth.password}`)}`;
  }
  return config;
});

export const adminApiService = {
  createParcel: async (parcelData: any): Promise<Parcel> => {
    const response = await adminApi.post('/admin/parcels', parcelData);
    return response.data;
  },

  updateParcelStatus: async (parcelId: string, status: string, location?: string, description?: string, latitude?: number | null, longitude?: number | null): Promise<Parcel> => {
    const response = await adminApi.put(`/admin/parcels/${parcelId}/status`, {
      status,
      location,
      description,
      latitude,
      longitude,
    });
    return response.data;
  },

  getAllParcelsAdmin: async (): Promise<Parcel[]> => {
    const response = await adminApi.get('/admin/parcels');
    return response.data;
  },
};
