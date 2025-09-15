'use client';

import { useState } from 'react';
import { Heart, AlertTriangle } from 'lucide-react';

interface EmergencyButtonProps {
  onTrigger: () => void;
  isActive: boolean;
  variant?: 'primary' | 'danger';
}

export function EmergencyButton({ 
  onTrigger, 
  isActive, 
  variant = 'danger' 
}: EmergencyButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    setShowConfirm(true);
    setTimeout(() => setIsPressed(false), 200);
  };

  const handleConfirm = () => {
    onTrigger();
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const buttonClasses = {
    primary: 'bg-primary hover:bg-primary/90',
    danger: 'bg-danger hover:bg-danger/90',
  };

  if (showConfirm) {
    return (
      <div className="bg-surface rounded-xl p-6 shadow-card">
        <div className="text-center mb-6">
          <AlertTriangle className="w-12 h-12 text-danger mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Confirm Emergency Alert</h3>
          <p className="text-foreground-muted">
            This will immediately notify all your emergency contacts. Are you sure?
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleCancel}
            className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-4 bg-danger text-white rounded-lg font-medium hover:bg-danger/90 transition-colors duration-200"
          >
            Send Alert
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <button
        onClick={handlePress}
        disabled={!isActive}
        className={`
          w-32 h-32 rounded-full text-white font-bold text-lg shadow-float
          transition-all duration-200 transform
          ${buttonClasses[variant]}
          ${isPressed ? 'scale-95' : 'scale-100'}
          ${!isActive ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 emergency-pulse'}
          disabled:hover:scale-100 disabled:emergency-pulse-none
        `}
      >
        <Heart className="w-8 h-8 mx-auto mb-2" />
        <div className="text-sm">EMERGENCY</div>
      </button>
      <p className="text-sm text-foreground-muted mt-4">
        {isActive ? 'Tap to send emergency alert' : 'Enable monitoring to use emergency button'}
      </p>
    </div>
  );
}
