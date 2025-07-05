import { Button, IButtonProps } from 'native-base';
import React from 'react';

/**
 * SplitButton - Enterprise-level button component with multiple variants
 * 
 * @component
 * @description A customizable button component with consistent design system
 * @example
 * ```tsx
 * <SplitButton variant="primary" size="lg" onPress={handlePress}>
 *   Click Me
 * </SplitButton>
 * ```
 */
interface SplitButtonProps extends IButtonProps {
  /** Button variant style */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Button size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Button content */
  children: React.ReactNode;
}

export const SplitButton: React.FC<SplitButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  ...props
}) => {
  /**
   * Get variant-specific styling properties
   */
  const getVariantProps = () => {
    switch (variant) {
      case 'primary':
        return {
          bg: 'primary.500',
          _pressed: { bg: 'primary.600' },
          _text: { color: 'white' },
        };
      case 'secondary':
        return {
          bg: 'secondary.500',
          _pressed: { bg: 'secondary.600' },
          _text: { color: 'white' },
        };
      case 'outline':
        return {
          bg: 'transparent',
          borderWidth: 1,
          borderColor: 'primary.500',
          _pressed: { bg: 'primary.50' },
          _text: { color: 'primary.500' },
        };
      case 'ghost':
        return {
          bg: 'transparent',
          _pressed: { bg: 'gray.100' },
          _text: { color: 'primary.500' },
        };
      case 'danger':
        return {
          bg: 'error.500',
          _pressed: { bg: 'error.600' },
          _text: { color: 'white' },
        };
      default:
        return {};
    }
  };

  /**
   * Get size-specific styling properties
   */
  const getSizeProps = () => {
    switch (size) {
      case 'sm':
        return { px: 3, py: 2, _text: { fontSize: 'sm' } };
      case 'md':
        return { px: 4, py: 3, _text: { fontSize: 'md' } };
      case 'lg':
        return { px: 6, py: 4, _text: { fontSize: 'lg' } };
      case 'xl':
        return { px: 8, py: 5, _text: { fontSize: 'xl' } };
      default:
        return {};
    }
  };

  return (
    <Button
      {...getVariantProps()}
      {...getSizeProps()}
      isLoading={loading}
      isDisabled={disabled || loading}
      rounded="lg"
      _disabled={{
        opacity: 0.6,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SplitButton; 