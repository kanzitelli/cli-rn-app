import React from 'react';

import NavigationService from './navigation';
import AppUpdatesService from './appUpdates';
import TranslateService from './translate';
import NotificationsService from './notifications';
import YandexService from './yandex';

export const services = {
  appUpdates: AppUpdatesService,
  nav: NavigationService,
  t: TranslateService,
  notifications: NotificationsService,
  yandex: YandexService,
};

const servicesContext = React.createContext(services);

export const withServicesProvider = (C: React.FC) => (props: any) => {
  return (
    <servicesContext.Provider value={services}>
      <C {...props} />
    </servicesContext.Provider>
  );
};

export const useServices = () => React.useContext(servicesContext);

export const initServices = async () => {
  for (const key in services) {
    if (Object.prototype.hasOwnProperty.call(services, key)) {
      const s = services[key];

      if (s.init) {
        await s.init();
      }
    }
  }
};