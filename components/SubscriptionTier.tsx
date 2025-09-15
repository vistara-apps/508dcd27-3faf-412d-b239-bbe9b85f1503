'use client';

import { Crown, Shield, Zap, Check } from 'lucide-react';
import { useGuardianStore } from '../lib/store';

export function SubscriptionTier() {
  const { user, updateUser } = useGuardianStore();

  const handleUpgrade = () => {
    if (!user) return;
    
    updateUser({
      ...user,
      subscriptionTier: 'premium',
    });
  };

  const handleDowngrade = () => {
    if (!user) return;
    
    updateUser({
      ...user,
      subscriptionTier: 'free',
    });
  };

  const isPremium = user?.subscriptionTier === 'premium';

  return (
    <div className="space-y-4">
      {/* Current Plan */}
      <div className={`bg-surface rounded-xl p-6 shadow-card border-2 ${
        isPremium ? 'border-accent' : 'border-transparent'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isPremium ? 'bg-accent/10' : 'bg-gray-100'
            }`}>
              {isPremium ? (
                <Crown className="w-6 h-6 text-accent" />
              ) : (
                <Shield className="w-6 h-6 text-gray-500" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {isPremium ? 'Premium Plan' : 'Free Plan'}
              </h3>
              <p className="text-sm text-foreground-muted">
                {isPremium ? '$5/month' : 'No cost'}
              </p>
            </div>
          </div>
          {isPremium && (
            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
              Active
            </span>
          )}
        </div>

        {/* Features */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-sm text-foreground">Basic fall detection</span>
          </div>
          <div className="flex items-center space-x-3">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-sm text-foreground">Manual emergency alerts</span>
          </div>
          <div className="flex items-center space-x-3">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-sm text-foreground">Up to 3 emergency contacts</span>
          </div>
          
          {isPremium && (
            <>
              <div className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-accent" />
                <span className="text-sm text-foreground">Advanced incapacitation detection</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-accent" />
                <span className="text-sm text-foreground">Unlimited emergency contacts</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-accent" />
                <span className="text-sm text-foreground">Custom alert messages</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-accent" />
                <span className="text-sm text-foreground">Priority support</span>
              </div>
            </>
          )}
        </div>

        {/* Action Button */}
        {!isPremium ? (
          <button
            onClick={handleUpgrade}
            className="w-full bg-accent text-white py-3 px-4 rounded-lg font-medium hover:bg-accent/90 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Zap className="w-4 h-4" />
            <span>Upgrade to Premium</span>
          </button>
        ) : (
          <button
            onClick={handleDowngrade}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
          >
            Downgrade to Free
          </button>
        )}
      </div>

      {/* Premium Benefits Preview */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Crown className="w-6 h-6 text-accent" />
            <h4 className="text-lg font-semibold text-foreground">Premium Benefits</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-foreground-muted">AI-powered health monitoring</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-foreground-muted">Unlimited contacts</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-foreground-muted">Custom alert messages</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-foreground-muted">24/7 priority support</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
