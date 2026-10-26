import React, { createContext, useContext, useState, useEffect } from 'react';
import { SettingsService } from '../services/settings.service';
import { CONTACT_INFO } from '../mocks/products.mock';

const SettingsContext = createContext(CONTACT_INFO);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(CONTACT_INFO);

  useEffect(() => {
    SettingsService.getSettings().then((liveSettings) => {
      if (liveSettings) {
        setSettings(liveSettings);
      }
    });
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
