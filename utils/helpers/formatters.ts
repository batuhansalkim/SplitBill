/**
 * SplitBill Formatters - Enterprise Data Formatting Utilities
 * 
 * @description Utility functions for consistent data formatting across the application
 */

/**
 * Format currency values
 * @param amount - Amount to format
 * @param currency - Currency code (default: 'TRY')
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency: string = 'TRY'): string => {
  const formatter = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  return formatter.format(amount);
};

/**
 * Format price with Turkish Lira symbol
 * @param price - Price to format
 * @returns Formatted price string
 */
export const formatPrice = (price: number): string => {
  return `₺${price.toFixed(2)}`;
};

/**
 * Format date to Turkish locale
 * @param date - Date to format
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('tr-TR', options).format(dateObj);
};

/**
 * Format time to Turkish locale
 * @param date - Date to format
 * @returns Formatted time string
 */
export const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
};

/**
 * Format phone number
 * @param phoneNumber - Phone number to format
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Format Turkish phone numbers
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
  }
  
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return `(${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9)}`;
  }
  
  return phoneNumber;
};

/**
 * Format credit card number (masked)
 * @param cardNumber - Card number to format
 * @returns Formatted card number with asterisks
 */
export const formatCardNumber = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\D/g, '');
  if (cleaned.length <= 4) return cleaned;
  
  const lastFour = cleaned.slice(-4);
  const masked = '*'.repeat(cleaned.length - 4);
  
  return `${masked}${lastFour}`;
};

/**
 * Format order ID
 * @param orderId - Order ID to format
 * @returns Formatted order ID
 */
export const formatOrderId = (orderId: string): string => {
  return `#${orderId.slice(-8).toUpperCase()}`;
};

/**
 * Format table number
 * @param tableId - Table ID to format
 * @returns Formatted table number
 */
export const formatTableNumber = (tableId: string): string => {
  const match = tableId.match(/table-(\d+)/i);
  return match ? `Masa ${match[1]}` : tableId;
};

/**
 * Format quantity with unit
 * @param quantity - Quantity to format
 * @param unit - Unit of measurement
 * @returns Formatted quantity string
 */
export const formatQuantity = (quantity: number, unit: string = 'adet'): string => {
  return `${quantity} ${unit}`;
};

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Capitalize first letter
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Format file size
 * @param bytes - Size in bytes
 * @returns Formatted file size
 */
export const formatFileSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
}; 