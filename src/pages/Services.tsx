import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePageTitle } from '../hooks/usePageTitle';
import WatermarkBackground from '../components/Layout/WatermarkBackground';
import ServicesMenu from '../components/Services/ServicesMenu';

const Services: React.FC = () => {
  const { t } = useTranslation();
  usePageTitle('pages.services.title');

  return (
    <WatermarkBackground watermarkText="NGUESSBEAUTY SERVICES">
      <div className="min-h-screen bg-gray-50">
        <ServicesMenu />
      </div>
    </WatermarkBackground>
  );
};

export default Services;