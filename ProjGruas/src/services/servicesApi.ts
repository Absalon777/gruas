import { httpGet, httpPost } from './http';
import type { Service, PaymentMethod } from '../types/models';

export const servicesApi = {
  async getServices(): Promise<Service[]> {
    return httpGet<Service[]>('/services');
  },

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    return httpGet<PaymentMethod[]>('/payment-methods');
  },

  async createServiceRequest(payload: { serviceId: string; userId?: string; notes?: string }) {
    return httpPost<{ success: boolean; requestId: string; estimatedArrival: string }>(
      '/requests',
      payload,
    );
  },
};
