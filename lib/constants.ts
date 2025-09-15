export const APP_CONFIG = {
  name: 'Guardian AI',
  tagline: 'Your AI-powered safety net, always vigilant.',
  version: '1.0.0',
  supportEmail: 'support@guardian-ai.app',
} as const;

export const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Free',
    price: 0,
    features: [
      'Basic fall detection',
      'Manual emergency alerts',
      'Up to 3 emergency contacts',
      'SMS notifications',
    ],
    limits: {
      contacts: 3,
      alertsPerMonth: 10,
    },
  },
  premium: {
    name: 'Premium',
    price: 5,
    features: [
      'Advanced AI health monitoring',
      'Incapacitation detection',
      'Unlimited emergency contacts',
      'Custom alert messages',
      'Multiple notification methods',
      'Priority support',
      'Location tracking',
    ],
    limits: {
      contacts: Infinity,
      alertsPerMonth: Infinity,
    },
  },
} as const;

export const ALERT_TYPES = {
  fall: {
    name: 'Fall Detection',
    description: 'AI detected a potential fall event',
    icon: '🤕',
    priority: 'high',
  },
  incapacitation: {
    name: 'Incapacitation',
    description: 'Sudden loss of consciousness or severe distress detected',
    icon: '😵',
    priority: 'critical',
  },
  manual: {
    name: 'Manual Alert',
    description: 'User manually triggered emergency alert',
    icon: '🆘',
    priority: 'high',
  },
} as const;

export const CONTACT_METHODS = {
  sms: {
    name: 'SMS',
    description: 'Text message',
    icon: '💬',
  },
  whatsapp: {
    name: 'WhatsApp',
    description: 'WhatsApp message',
    icon: '📱',
  },
  farcaster: {
    name: 'Farcaster',
    description: 'Farcaster direct message',
    icon: '🟣',
  },
} as const;

export const MONITORING_SETTINGS = {
  fallDetection: {
    sensitivity: {
      low: 0.6,
      medium: 0.7,
      high: 0.8,
    },
    cooldownPeriod: 30000, // 30 seconds
  },
  incapacitationDetection: {
    inactivityThreshold: 300000, // 5 minutes
    heartRateThreshold: {
      low: 50,
      high: 120,
    },
  },
} as const;
