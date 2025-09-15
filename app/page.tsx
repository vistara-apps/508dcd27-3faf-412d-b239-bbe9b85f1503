'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/minikit';
import { AppShell } from '../components/AppShell';
import { EmergencyButton } from '../components/EmergencyButton';
import { HealthStatus } from '../components/HealthStatus';
import { ContactManager } from '../components/ContactManager';
import { AlertHistory } from '../components/AlertHistory';
import { SubscriptionTier } from '../components/SubscriptionTier';
import { FallDetectionService } from '../lib/fallDetection';
import { useGuardianStore } from '../lib/store';

export default function HomePage() {
  const { context } = useMiniKit();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'contacts' | 'history' | 'settings'>('dashboard');
  const [isMonitoring, setIsMonitoring] = useState(false);
  const { user, alerts, addAlert } = useGuardianStore();

  useEffect(() => {
    // Initialize fall detection service
    const fallDetection = new FallDetectionService();
    
    if (isMonitoring) {
      fallDetection.startMonitoring((alertData) => {
        addAlert({
          id: Date.now().toString(),
          userId: user?.userId || 'anonymous',
          timestamp: new Date(),
          type: alertData.type,
          status: 'pending',
          recipientsNotified: [],
          location: alertData.location,
          severity: alertData.severity,
        });
      });
    } else {
      fallDetection.stopMonitoring();
    }

    return () => {
      fallDetection.stopMonitoring();
    };
  }, [isMonitoring, addAlert, user]);

  const handleEmergencyTrigger = () => {
    addAlert({
      id: Date.now().toString(),
      userId: user?.userId || 'anonymous',
      timestamp: new Date(),
      type: 'manual',
      status: 'pending',
      recipientsNotified: [],
      location: null,
      severity: 'high',
    });
  };

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-br from-background to-background-subtle">
        {/* Header */}
        <div className="px-6 pt-8 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Guardian AI</h1>
              <p className="text-sm text-foreground-muted">Your AI-powered safety net</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-sm text-foreground-muted">
                {isMonitoring ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          {/* Emergency Button */}
          <div className="mb-8">
            <EmergencyButton
              onTrigger={handleEmergencyTrigger}
              isActive={isMonitoring}
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 mb-6">
          <div className="flex space-x-1 bg-background-subtle rounded-lg p-1">
            {[
              { key: 'dashboard', label: 'Dashboard' },
              { key: 'contacts', label: 'Contacts' },
              { key: 'history', label: 'History' },
              { key: 'settings', label: 'Settings' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-surface text-primary shadow-sm'
                    : 'text-foreground-muted hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-6 pb-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <HealthStatus
                isMonitoring={isMonitoring}
                onToggleMonitoring={toggleMonitoring}
                recentAlerts={alerts.slice(0, 3)}
              />
              <SubscriptionTier />
            </div>
          )}

          {activeTab === 'contacts' && (
            <ContactManager />
          )}

          {activeTab === 'history' && (
            <AlertHistory alerts={alerts} />
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <SubscriptionTier />
              <div className="bg-surface rounded-lg p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-4">Monitoring Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Fall Detection</p>
                      <p className="text-sm text-foreground-muted">AI-powered fall detection using device sensors</p>
                    </div>
                    <button
                      onClick={toggleMonitoring}
                      className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                        isMonitoring ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                          isMonitoring ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
