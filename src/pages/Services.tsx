import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { usePageTitle } from '../hooks/usePageTitle';
import ServicesMenu from '../components/Services/ServicesMenu';
import bannerImage from '../assets/banniere.jpg'; // <-- ajoute un visuel ici

const Services: React.FC = () => {
    const { t } = useTranslation();
    usePageTitle('pages.services.title');

    const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);

    useEffect(() => {
        const img = new Image();
        img.src = bannerImage;
        img.onload = () => {
            setImageSize({ width: img.width, height: img.height });
        };
    }, []);

    return (
        <div className="bg-white bg-opacity-80 min-h-screen">
            {/* Thumbnail avec background image */}
            <div className="relative">
                <img
                    src={bannerImage}
                    alt="Services banner"
                    className="w-full object-cover"
                    style={{maxHeight: '500px'}}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center z-10">
                        <h1 className="text-3xl lg:text-9xl font-bold text-white mb-4 drop-shadow-lg">
                            {t('services.title')}
                        </h1>
                        <p className="text-xl text-white max-w-2xl mx-auto drop-shadow">
                            {t('services.description')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ServicesMenu/>
            </div>
        </div>
    );
};

export default Services;