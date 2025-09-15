import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX for US numbers
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
}

export function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  return date.toLocaleDateString();
}

export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

export function generateAlertMessage(
  type: 'fall' | 'incapacitation' | 'manual',
  userName: string,
  location?: { latitude: number; longitude: number }
): string {
  const baseMessage = `🚨 EMERGENCY ALERT from Guardian AI\n\n${userName} needs immediate assistance.`;
  
  const typeMessages = {
    fall: 'A fall has been detected.',
    incapacitation: 'Sudden incapacitation detected.',
    manual: 'Manual emergency alert triggered.',
  };
  
  let message = `${baseMessage}\n\nReason: ${typeMessages[type]}`;
  
  if (location) {
    message += `\n\nLocation: https://maps.google.com/?q=${location.latitude},${location.longitude}`;
  }
  
  message += '\n\nPlease check on them immediately or contact emergency services if needed.';
  
  return message;
}
