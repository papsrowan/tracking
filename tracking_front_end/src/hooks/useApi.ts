'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { parcelApi, shippingApi, blogApi, partnerApi } from '@/services/api';
import { ShippingCalculationRequest } from '@/types';

export const useParcel = (trackingNumber: string) => {
  return useQuery({
    queryKey: ['parcel', trackingNumber],
    queryFn: () => parcelApi.getParcel(trackingNumber),
    enabled: !!trackingNumber,
  });
};

export const useCalculateShipping = () => {
  return useMutation({
    mutationFn: (request: ShippingCalculationRequest) => shippingApi.calculateShipping(request),
  });
};

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blogPosts'],
    queryFn: () => blogApi.getAllPosts(),
  });
};

export const usePartners = () => {
  return useQuery({
    queryKey: ['partners'],
    queryFn: () => partnerApi.getAllPartners(),
  });
};
