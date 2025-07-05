/**
 * SplitBill Typography System - Enterprise Design System
 * 
 * @description Comprehensive typography system for consistent text styling
 */

export const typography = {
  // Font Families
  fonts: {
    heading: 'System',
    body: 'System',
    mono: 'SpaceMono',
  },

  // Font Sizes
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },

  // Font Weights
  fontWeights: {
    hairline: '100',
    thin: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Line Heights
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: -0.8,
    tight: -0.4,
    normal: 0,
    wide: 0.4,
    wider: 0.8,
    widest: 1.6,
  },

  // Text Styles
  textStyles: {
    // Heading Styles
    h1: {
      fontSize: '4xl',
      fontWeight: 'bold',
      lineHeight: 'tight',
      letterSpacing: 'tight',
    },
    h2: {
      fontSize: '3xl',
      fontWeight: 'bold',
      lineHeight: 'tight',
      letterSpacing: 'tight',
    },
    h3: {
      fontSize: '2xl',
      fontWeight: 'semibold',
      lineHeight: 'snug',
    },
    h4: {
      fontSize: 'xl',
      fontWeight: 'semibold',
      lineHeight: 'snug',
    },
    h5: {
      fontSize: 'lg',
      fontWeight: 'medium',
      lineHeight: 'normal',
    },
    h6: {
      fontSize: 'md',
      fontWeight: 'medium',
      lineHeight: 'normal',
    },

    // Body Text Styles
    body1: {
      fontSize: 'md',
      fontWeight: 'normal',
      lineHeight: 'relaxed',
    },
    body2: {
      fontSize: 'sm',
      fontWeight: 'normal',
      lineHeight: 'relaxed',
    },
    caption: {
      fontSize: 'xs',
      fontWeight: 'normal',
      lineHeight: 'normal',
    },

    // Button Text Styles
    button: {
      fontSize: 'md',
      fontWeight: 'medium',
      lineHeight: 'normal',
      letterSpacing: 'wide',
    },
    buttonSmall: {
      fontSize: 'sm',
      fontWeight: 'medium',
      lineHeight: 'normal',
      letterSpacing: 'wide',
    },
    buttonLarge: {
      fontSize: 'lg',
      fontWeight: 'medium',
      lineHeight: 'normal',
      letterSpacing: 'wide',
    },

    // Special Text Styles
    overline: {
      fontSize: 'xs',
      fontWeight: 'medium',
      lineHeight: 'normal',
      letterSpacing: 'wider',
      textTransform: 'uppercase',
    },
    subtitle1: {
      fontSize: 'lg',
      fontWeight: 'normal',
      lineHeight: 'relaxed',
    },
    subtitle2: {
      fontSize: 'md',
      fontWeight: 'medium',
      lineHeight: 'relaxed',
    },
  },
};

export default typography; 