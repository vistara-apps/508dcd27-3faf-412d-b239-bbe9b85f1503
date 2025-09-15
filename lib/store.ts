'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GuardianStore, User, Alert } from './types';

export const useGuardianStore = create<GuardianStore>()(
  persist(
    (set, get) => ({
      user: {
        userId: 'demo-user',
        emergencyContacts: [],
        subscriptionTier: 'free',
        activeAlerts: [],
      },
      alerts: [],
      isMonitoring: false,

      updateUser: (user: User) => {
        set({ user });
      },

      addAlert: (alert: Alert) => {
        set((state) => ({
          alerts: [alert, ...state.alerts],
        }));
      },

      updateAlert: (alertId: string, updates: Partial<Alert>) => {
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === alertId ? { ...alert, ...updates } : alert
          ),
        }));
      },

      setMonitoring: (monitoring: boolean) => {
        set({ isMonitoring: monitoring });
      },
    }),
    {
      name: 'guardian-ai-storage',
      partialize: (state) => ({
        user: state.user,
        alerts: state.alerts,
      }),
    }
  )
);
