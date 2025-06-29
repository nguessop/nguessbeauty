import React from 'react';
import watermarkImage from '../../assets/banniere.jpg';

interface WatermarkBackgroundProps {
    children: React.ReactNode;
    opacity?: number;
}

const WatermarkBackground: React.FC<WatermarkBackgroundProps> = ({
                                                                     children,
                                                                     opacity = 0.05,
                                                                 }) => {
    return (
        <div className="relative min-h-screen bg-white overflow-hidden">
            {/* Watermark Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${watermarkImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity,
                    pointerEvents: 'none'
                }}
            />

            {/* Contenu affiché au-dessus */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default WatermarkBackground;