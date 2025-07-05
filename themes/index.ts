/**
 * SplitBill Theme System - Enterprise Design System
 * 
 * @description Centralized theme configuration for consistent design
 */

import { extendTheme } from 'native-base';
import colors from './colors';
import typography from './typography';

/**
 * SplitBill Enterprise Theme Configuration
 * 
 * @description Comprehensive theme configuration for NativeBase
 */
export const theme = extendTheme({
  colors,
  typography,
  
  // Component-specific theme overrides
  components: {
    Button: {
      defaultProps: {
        rounded: 'lg',
      },
      variants: {
        solid: {
          bg: 'primary.500',
          _pressed: { bg: 'primary.600' },
          _text: { color: 'white' },
        },
        outline: {
          bg: 'transparent',
          borderWidth: 1,
          borderColor: 'primary.500',
          _pressed: { bg: 'primary.50' },
          _text: { color: 'primary.500' },
        },
        ghost: {
          bg: 'transparent',
          _pressed: { bg: 'gray.100' },
          _text: { color: 'primary.500' },
        },
      },
    },
    Input: {
      defaultProps: {
        rounded: 'lg',
        bg: 'gray.50',
        borderWidth: 1,
        borderColor: 'gray.200',
      },
    },
    Card: {
      defaultProps: {
        rounded: 'lg',
        shadow: 2,
        bg: 'white',
      },
    },
  },

  // Global configuration
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export default theme;

// Type definitions for theme
export type CustomThemeType = typeof theme; 