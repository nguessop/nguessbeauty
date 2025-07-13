import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { serviceService } from '../../services/serviceService';

const ServicesResults: React.FC = () => {
    const location = useLocation();
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const city = searchParams.get('city') || '';
        const serviceName = searchParams.get('service_name') || '';
        const query = searchParams.get('query') || '';
        console.log("query", city, serviceName);

        const fetchServices = async () => {
            try {
                const results = await serviceService.filterServicesByCityAndName(
                    city,
                    serviceName || query
                );
                console.log("results_filterServicesByCityAndName", results);
                setServices(results);
            } catch (error) {
                console.error('Erreur lors de la recherche', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [location.search]);

    if (loading) return <div>Chargement...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Résultats de votre recherche</h1>

            {services.length === 0 ? (
                <p>Aucun service trouvé pour votre recherche.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map(service => (
                        <div key={service.id} className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold">{service.name}</h2>
                            <p className="text-gray-600">{service.description}</p>
                            <p className="text-primary-600 font-medium mt-2">
                                {service.price} FCFA - {service.duration} min
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                {service.salon_name}, {service.city}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ServicesResults;