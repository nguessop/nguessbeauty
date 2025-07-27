import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePageTitle } from '../hooks/usePageTitle';
import bannerImage from '../assets/banniere.jpg';
import { serviceService } from '../services/serviceService';
import { Phone, MessageCircle, Calendar, Search, Star, Filter } from 'lucide-react';

interface Service {
    id: number;
    name: string;
    description?: string;
    price?: string;
    image?: string;
    location?: string; // lieu du salon
    average_rating?: number; // moyenne des avis
    total_reviews?: number;  // nombre total d'avis
    phone?: string;
    whatsapp?: string;
    salon?: {
        id: number;
        name: string;
        address?: string;
    };
}

const Services: React.FC = () => {
    const { t } = useTranslation();
    usePageTitle('pages.services.title');

    const [services, setServices] = useState<any>([]);
    const [filteredServices, setFilteredServices] = useState<any>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState(true);

    const [minRating, setMinRating] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await serviceService.getAllServices();
                console.log('Services API:', response.data);
                setServices(response.data);
                setFilteredServices(response.data);
            } catch (error) {
                console.error('Erreur lors du chargement des services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    // Filtrage
    useEffect(() => {
        let filtered = [...services];

        // Recherche par mot-clé
        const lowerSearch = searchTerm.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter((service) =>
                service.name.toLowerCase().includes(lowerSearch) ||
                service.salon?.address?.toLowerCase().includes(lowerSearch) ||
                service.price?.toString().includes(lowerSearch)
            );
        }

        // Filtrage par note
        if (minRating > 0) {
            filtered = filtered.filter((service) =>
                (service.average_rating ?? 0) >= minRating
            );
        }

        // Filtrage par prix
        if (maxPrice) {
            filtered = filtered.filter((service) =>
                parseFloat(service.price ?? '0') <= maxPrice
            );
        }

        setFilteredServices(filtered);
    }, [searchTerm, services, minRating, maxPrice]);

    // Fonction pour afficher les étoiles
    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={`full-${i}`} size={16} className="text-yellow-400 fill-yellow-400" />);
        }
        if (halfStar) {
            stars.push(<Star key="half" size={16} className="text-yellow-400 fill-yellow-400 opacity-50" />);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
        }
        return stars;
    };

    return (
        <div className="bg-white bg-opacity-80 min-h-screen">
            {/* Thumbnail */}
            <div className="relative">
                <img
                    src={bannerImage}
                    alt="Services banner"
                    className="w-full object-cover"
                    style={{ maxHeight: '500px' }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center z-10">
                        <h1 className="text-3xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                            {t('services.title')}
                        </h1>
                        <p className="text-xl text-white max-w-2xl mx-auto drop-shadow">
                            {t('services.description')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Contenu principal avec Sidebar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <aside className="lg:col-span-1 bg-gray-50 border rounded-2xl p-4 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Filter size={18} /> Filtres
                    </h3>

                    {/* Recherche */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Recherche</label>
                        <input
                            type="text"
                            placeholder="Service, lieu, prix..."
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Filtre par note */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Note minimale</label>
                        <select
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            value={minRating}
                            onChange={(e) => setMinRating(parseInt(e.target.value))}
                        >
                            <option value={0}>Toutes</option>
                            <option value={1}>1 étoile et +</option>
                            <option value={2}>2 étoiles et +</option>
                            <option value={3}>3 étoiles et +</option>
                            <option value={4}>4 étoiles et +</option>
                            <option value={5}>5 étoiles</option>
                        </select>
                    </div>

                    {/* Filtre par prix */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Prix max (FCFA)</label>
                        <input
                            type="number"
                            placeholder="Ex: 10000"
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            value={maxPrice ?? ''}
                            onChange={(e) => setMaxPrice(e.target.value ? parseInt(e.target.value) : undefined)}
                        />
                    </div>
                </aside>

                {/* Liste des services */}
                <section className="lg:col-span-3">
                    {loading ? (
                        <p className="text-center text-secondary-500">Chargement des services...</p>
                    ) : filteredServices.length === 0 ? (
                        <p className="text-center text-secondary-500">Aucun service trouvé.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredServices.map((service) => (
                                <div
                                    key={service.id}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                >
                                    {/* Image */}
                                    <div className="h-56 overflow-hidden relative">
                                        <img
                                            src={service.image || 'https://via.placeholder.com/400x300'}
                                            alt={service.name}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                        <span className="absolute top-3 right-3 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                                            {service.price ? `${service.price} FCFA` : 'Prix sur demande'}
                                        </span>
                                    </div>

                                    {/* Infos */}
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold text-secondary-900 mb-1">
                                            {service.name}
                                        </h2>
                                        <p className="text-secondary-600 mb-2 text-sm">
                                            {service.salon?.address || 'Adresse non définie'}
                                        </p>

                                        {/* Avis en étoiles */}
                                        <div className="flex items-center gap-1">
                                            {renderStars(service.average_rating ?? 0)}
                                            <span className="text-xs text-gray-500 ml-2">
                                                ({service.total_reviews ?? 0} avis)
                                            </span>
                                        </div>

                                        {/* Boutons */}
                                        <div className="flex justify-between gap-2 mt-4">
                                            <a
                                                href={`tel:${service.phone}`}
                                                className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-600 text-white text-sm py-2 rounded-lg hover:bg-primary-700 transition-colors"
                                            >
                                                <Phone size={16} /> Appeler
                                            </a>
                                            <a
                                                href={`https://wa.me/${service.whatsapp}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 text-white text-sm py-2 rounded-lg hover:bg-green-700 transition-colors"
                                            >
                                                <MessageCircle size={16} /> WhatsApp
                                            </a>
                                            <button
                                                className="flex-1 inline-flex items-center justify-center gap-2 bg-accent-600 text-white text-sm py-2 rounded-lg hover:bg-accent-700 transition-colors"
                                            >
                                                <Calendar size={16} /> Réserver
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Services;