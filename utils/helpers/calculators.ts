/**
 * SplitBill Calculators - Enterprise Business Logic Utilities
 * 
 * @description Utility functions for business calculations and logic
 */

import { CartItem } from '../../stores/cartStore';

/**
 * Calculate total amount from cart items
 * @param items - Array of cart items
 * @returns Total amount
 */
export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.totalPrice, 0);
};

/**
 * Calculate total quantity from cart items
 * @param items - Array of cart items
 * @returns Total quantity
 */
export const calculateCartQuantity = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Calculate discount amount
 * @param originalPrice - Original price
 * @param discountPercentage - Discount percentage (0-100)
 * @returns Discount amount
 */
export const calculateDiscount = (originalPrice: number, discountPercentage: number): number => {
  return (originalPrice * discountPercentage) / 100;
};

/**
 * Calculate final price after discount
 * @param originalPrice - Original price
 * @param discountPercentage - Discount percentage (0-100)
 * @returns Final price
 */
export const calculateFinalPrice = (originalPrice: number, discountPercentage: number): number => {
  const discount = calculateDiscount(originalPrice, discountPercentage);
  return originalPrice - discount;
};

/**
 * Calculate tax amount
 * @param amount - Amount before tax
 * @param taxRate - Tax rate percentage (default: 18 for Turkish KDV)
 * @returns Tax amount
 */
export const calculateTax = (amount: number, taxRate: number = 18): number => {
  return (amount * taxRate) / 100;
};

/**
 * Calculate amount with tax
 * @param amount - Amount before tax
 * @param taxRate - Tax rate percentage (default: 18 for Turkish KDV)
 * @returns Amount with tax
 */
export const calculateAmountWithTax = (amount: number, taxRate: number = 18): number => {
  return amount + calculateTax(amount, taxRate);
};

/**
 * Calculate tip amount
 * @param amount - Base amount
 * @param tipPercentage - Tip percentage (0-100)
 * @returns Tip amount
 */
export const calculateTip = (amount: number, tipPercentage: number): number => {
  return (amount * tipPercentage) / 100;
};

/**
 * Calculate split amount for group orders
 * @param totalAmount - Total order amount
 * @param numberOfPeople - Number of people to split between
 * @returns Amount per person
 */
export const calculateSplitAmount = (totalAmount: number, numberOfPeople: number): number => {
  if (numberOfPeople <= 0) return totalAmount;
  return Math.round((totalAmount / numberOfPeople) * 100) / 100;
};

/**
 * Calculate estimated delivery time
 * @param baseTime - Base preparation time in minutes
 * @param orderSize - Number of items in order
 * @param isPeakHour - Whether it's peak hour
 * @returns Estimated time in minutes
 */
export const calculateEstimatedTime = (
  baseTime: number,
  orderSize: number,
  isPeakHour: boolean = false
): number => {
  let estimatedTime = baseTime;
  
  // Add time for each additional item
  estimatedTime += (orderSize - 1) * 2;
  
  // Add extra time during peak hours
  if (isPeakHour) {
    estimatedTime += 10;
  }
  
  return estimatedTime;
};

/**
 * Calculate order priority score
 * @param orderValue - Order total value
 * @param orderTime - Time since order was placed (minutes)
 * @param isVIP - Whether customer is VIP
 * @returns Priority score (higher = more priority)
 */
export const calculateOrderPriority = (
  orderValue: number,
  orderTime: number,
  isVIP: boolean = false
): number => {
  let priority = orderValue * 0.1; // Base priority from order value
  priority += orderTime * 0.5; // Priority increases with waiting time
  
  if (isVIP) {
    priority *= 1.5; // VIP customers get 50% priority boost
  }
  
  return Math.round(priority);
};

/**
 * Calculate loyalty points
 * @param orderAmount - Order amount
 * @param pointsRate - Points per currency unit (default: 1 point per 1 TL)
 * @returns Loyalty points earned
 */
export const calculateLoyaltyPoints = (orderAmount: number, pointsRate: number = 1): number => {
  return Math.floor(orderAmount * pointsRate);
};

/**
 * Calculate points value
 * @param points - Number of points
 * @param pointsValue - Value per point in currency (default: 0.01 TL per point)
 * @returns Points value in currency
 */
export const calculatePointsValue = (points: number, pointsValue: number = 0.01): number => {
  return points * pointsValue;
};

/**
 * Calculate commission for restaurant
 * @param orderAmount - Order amount
 * @param commissionRate - Commission rate percentage (default: 5%)
 * @returns Commission amount
 */
export const calculateCommission = (orderAmount: number, commissionRate: number = 5): number => {
  return (orderAmount * commissionRate) / 100;
};

/**
 * Calculate profit margin
 * @param revenue - Revenue amount
 * @param cost - Cost amount
 * @returns Profit margin percentage
 */
export const calculateProfitMargin = (revenue: number, cost: number): number => {
  if (revenue === 0) return 0;
  return ((revenue - cost) / revenue) * 100;
};

/**
 * Calculate average order value
 * @param totalRevenue - Total revenue
 * @param numberOfOrders - Number of orders
 * @returns Average order value
 */
export const calculateAverageOrderValue = (totalRevenue: number, numberOfOrders: number): number => {
  if (numberOfOrders === 0) return 0;
  return totalRevenue / numberOfOrders;
};

/**
 * Calculate conversion rate
 * @param conversions - Number of conversions
 * @param totalVisits - Total number of visits
 * @returns Conversion rate percentage
 */
export const calculateConversionRate = (conversions: number, totalVisits: number): number => {
  if (totalVisits === 0) return 0;
  return (conversions / totalVisits) * 100;
}; 