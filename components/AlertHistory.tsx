'use client';

import { Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Alert } from '../lib/types';

interface AlertHistoryProps {
  alerts: Alert[];
}

export function AlertHistory({ alerts }: AlertHistoryProps) {
  const getAlertIcon = (type: string, status: string) => {
    if (status === 'resolved') return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status === 'error') return <XCircle className="w-5 h-5 text-danger" />;
    return <AlertTriangle className="w-5 h-5 text-orange-500" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-600';
      case 'sent': return 'bg-blue-100 text-blue-600';
      case 'resolved': return 'bg-green-100 text-green-600';
      case 'error': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'high': return 'border-l-danger';
      case 'medium': return 'border-l-orange-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No alerts yet</h3>
        <p className="text-foreground-muted">
          Your alert history will appear here when events are detected
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-2">Alert History</h2>
        <p className="text-sm text-foreground-muted">
          Track all emergency alerts and their status
        </p>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`bg-surface rounded-lg p-4 shadow-card border-l-4 ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getAlertIcon(alert.type, alert.status)}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-foreground capitalize">
                      {alert.type} Alert
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                  </div>
                  <p className="text-sm text-foreground-muted mb-2">
                    {alert.timestamp.toLocaleString()}
                  </p>
                  {alert.location && (
                    <p className="text-xs text-foreground-muted">
                      Location: {alert.location.latitude.toFixed(4)}, {alert.location.longitude.toFixed(4)}
                    </p>
                  )}
                  {alert.recipientsNotified.length > 0 && (
                    <p className="text-xs text-foreground-muted mt-1">
                      Notified: {alert.recipientsNotified.join(', ')}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                {alert.severity && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-600' :
                    alert.severity === 'medium' ? 'bg-orange-100 text-orange-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {alert.severity} priority
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
