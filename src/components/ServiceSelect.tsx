import React from 'react';

interface ServiceSelectProps {
    services: { id: string; name: string }[];
    selectedService: string;
    onServiceChange: (value: string) => void;
}

const ServiceSelect: React.FC<ServiceSelectProps> = ({
                                                         services,
                                                         selectedService,
                                                         onServiceChange
                                                     }) => {
    return (
        <div className="relative">
            <select
                value={selectedService}
                onChange={(e) => onServiceChange(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
            >
                <option value="">Tous les services</option>
                {services.map(service => (
                    <option key={service.name} value={service.name}>
                        🎀 {service.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ServiceSelect;