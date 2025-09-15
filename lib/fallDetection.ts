'use client';

import { FallDetectionData } from './types';

export class FallDetectionService {
  private isActive = false;
  private intervalId: NodeJS.Timeout | null = null;
  private callback: ((data: FallDetectionData) => void) | null = null;

  constructor() {
    // Initialize sensor access if available
    this.initializeSensors();
  }

  private async initializeSensors() {
    // In a real implementation, this would request device sensor permissions
    // and set up accelerometer/gyroscope listeners
    if (typeof window !== 'undefined' && 'DeviceMotionEvent' in window) {
      try {
        // Request permission for iOS devices
        if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
          const permission = await (DeviceMotionEvent as any).requestPermission();
          if (permission !== 'granted') {
            console.warn('Device motion permission denied');
          }
        }
      } catch (error) {
        console.warn('Device motion not supported:', error);
      }
    }
  }

  startMonitoring(callback: (data: FallDetectionData) => void) {
    this.callback = callback;
    this.isActive = true;

    // Simulate fall detection with random events for demo purposes
    this.intervalId = setInterval(() => {
      if (this.isActive && Math.random() < 0.01) { // 1% chance per interval
        this.simulateFallDetection();
      }
    }, 5000); // Check every 5 seconds

    // In a real implementation, this would set up actual sensor listeners
    this.setupRealSensorListeners();
  }

  stopMonitoring() {
    this.isActive = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.callback = null;
  }

  private setupRealSensorListeners() {
    if (typeof window === 'undefined') return;

    // Real sensor implementation would go here
    window.addEventListener('devicemotion', this.handleDeviceMotion.bind(this));
  }

  private handleDeviceMotion(event: DeviceMotionEvent) {
    if (!this.isActive || !this.callback) return;

    const acceleration = event.accelerationIncludingGravity;
    if (!acceleration) return;

    // Simple fall detection algorithm
    const totalAcceleration = Math.sqrt(
      (acceleration.x || 0) ** 2 +
      (acceleration.y || 0) ** 2 +
      (acceleration.z || 0) ** 2
    );

    // Detect sudden changes in acceleration (potential fall)
    if (totalAcceleration > 20 || totalAcceleration < 2) {
      this.triggerFallAlert('fall', 0.8);
    }
  }

  private simulateFallDetection() {
    const eventTypes: Array<'fall' | 'incapacitation'> = ['fall', 'incapacitation'];
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const confidence = 0.7 + Math.random() * 0.3; // 70-100% confidence
    
    this.triggerFallAlert(type, confidence);
  }

  private triggerFallAlert(type: 'fall' | 'incapacitation', confidence: number) {
    if (!this.callback) return;

    // Get location if available
    navigator.geolocation?.getCurrentPosition(
      (position) => {
        const alertData: FallDetectionData = {
          type,
          confidence,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          severity: confidence > 0.9 ? 'high' : confidence > 0.7 ? 'medium' : 'low',
        };
        this.callback!(alertData);
      },
      () => {
        // Location not available
        const alertData: FallDetectionData = {
          type,
          confidence,
          severity: confidence > 0.9 ? 'high' : confidence > 0.7 ? 'medium' : 'low',
        };
        this.callback!(alertData);
      }
    );
  }

  isMonitoring() {
    return this.isActive;
  }
}
