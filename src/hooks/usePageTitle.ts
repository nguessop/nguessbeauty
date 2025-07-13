import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const usePageTitle = (titleKey: string, params?: Record<string, string>) => {
  const { t } = useTranslation();

  useEffect(() => {
    const title = params ? t(titleKey, params) : t(titleKey);
    document.title = `${title} - NGUESSBEAUTY`;
    
    return () => {
      document.title = 'NGUESSBEAUTY - Réservation Salon de Beauté';
    };
  }, [titleKey, params, t]);
};