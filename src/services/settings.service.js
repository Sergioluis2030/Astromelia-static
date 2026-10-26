import { CONTACT_INFO as DEFAULT_CONTACT_INFO } from '../mocks/products.mock';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002/api';
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

let cachedSettings = { ...DEFAULT_CONTACT_INFO };

export const SettingsService = {
  async getSettings() {
    if (USE_MOCK) {
      return Promise.resolve(cachedSettings);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/settings`);
      if (!response.ok) return cachedSettings;
      const data = await response.json();
      cachedSettings = {
        phoneDisplay: data.phoneDisplay || DEFAULT_CONTACT_INFO.phoneDisplay,
        whatsappNumber: data.whatsappNumber || DEFAULT_CONTACT_INFO.whatsappNumber,
        address: data.address || DEFAULT_CONTACT_INFO.address,
        city: data.city || DEFAULT_CONTACT_INFO.city,
        schedule: data.schedule || DEFAULT_CONTACT_INFO.schedule,
      };
      return cachedSettings;
    } catch {
      return cachedSettings;
    }
  },

  getCurrentSettings() {
    return cachedSettings;
  }
};
