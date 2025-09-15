'use client';

import { Activity, Shield, Clock, TrendingUp } from 'lucide-react';
import { Alert } from '../lib/types';

interface HealthStatusProps {
  isMonitoring: boolean;
  onToggleMonitoring: () => void;
  recentAlerts: Alert[];
}

export function HealthStatus({ isMonitoring, onToggleMonitoring, recentAlerts }: HealthStatusProps) {
  const getStatusColor = () => {
    if (!isMonitoring) return 'text-gray-500';
    if (recentAlerts.some(alert => alert.status === 'pending')) return 'text-danger';
    return 'text-green-500';
  };

  const getStatusText = () => {
    if (!isMonitoring) return 'Monitoring Disabled';
    if (recentAlerts.some(alert => alert.status === 'pending')) return 'Alert Active';
    return 'All Systems Normal';
  };

  return (
    <div className="space-y-4">
      {/* Main Status Card */}
      <div className="bg-surface rounded-xl p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isMonitoring ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              <Shield className={`w-6 h-6 ${getStatusColor()}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Health Guard</h3>
              <p className={`text-sm font-medium ${getStatusColor()}`}>
                {getStatusText()}
              </p>
            </div>
          </div>
          <button
            onClick={onToggleMonitoring}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              isMonitoring
                ? 'bg-danger/10 text-danger hover:bg-danger/20'
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            {isMonitoring ? 'Stop' : 'Start'}
          </button>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-xs text-foreground-muted mb-1">Fall Detection</p>
            <p className="text-sm font-semibold text-foreground">
              {isMonitoring ? 'Active' : 'Inactive'}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mx-auto mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-xs text-foreground-muted mb-1">Health Risk</p>
            <p className="text-sm font-semibold text-foreground">Low</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg mx-auto mb-2">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-xs text-foreground-muted mb-1">Response Time</p>
            <p className="text-sm font-semibold text-foreground">~2 min</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      {recentAlerts.length > 0 && (
        <div className="bg-surface rounded-xl p-6 shadow-card">
          <h4 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h4>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.status === 'pending' ? 'bg-danger' :
                    alert.status === 'sent' ? 'bg-orange-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-foreground capitalize">
                      {alert.type} Alert
                    </p>
                    <p className="text-xs text-foreground-muted">
                      {alert.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  alert.status === 'pending' ? 'bg-danger/10 text-danger' :
                  alert.status === 'sent' ? 'bg-orange-100 text-orange-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {alert.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
