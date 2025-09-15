export interface User {
  userId: string;
  walletAddress?: string;
  emergencyContacts: EmergencyContact[];
  subscriptionTier: 'free' | 'premium';
  activeAlerts: string[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  preferredMethod: 'sms' | 'whatsapp' | 'farcaster';
}

export interface Alert {
  id: string;
  userId: string;
  timestamp: Date;
  type: 'fall' | 'incapacitation' | 'manual';
  status: 'pending' | 'sent' | 'resolved' | 'error';
  recipientsNotified: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
  severity?: 'low' | 'medium' | 'high';
}

export interface FallDetectionData {
  type: 'fall' | 'incapacitation';
  confidence: number;
  location?: {
    latitude: number;
    longitude: number;
  };
  severity: 'low' | 'medium' | 'high';
}

export interface GuardianStore {
  user: User | null;
  alerts: Alert[];
  isMonitoring: boolean;
  updateUser: (user: User) => void;
  addAlert: (alert: Alert) => void;
  updateAlert: (alertId: string, updates: Partial<Alert>) => void;
  setMonitoring: (monitoring: boolean) => void;
}
