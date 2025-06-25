import React from 'react';

interface WatermarkBackgroundProps {
  children: React.ReactNode;
  watermarkText?: string;
  opacity?: number;
}

const WatermarkBackground: React.FC<WatermarkBackgroundProps> = ({ 
  children, 
  watermarkText = 'NGUESSBEAUTY',
  opacity = 0.03
}) => {
  return (
    <div className="relative min-h-screen">
      {/* Watermark Background */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%25' y='50%25' font-family='Inter, sans-serif' font-size='24' font-weight='bold' text-anchor='middle' dominant-baseline='middle' fill='%23000000' opacity='${opacity}' transform='rotate(-45 100 100)'%3E${watermarkText}%3C/text%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default WatermarkBackground;