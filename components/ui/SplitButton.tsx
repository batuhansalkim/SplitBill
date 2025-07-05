import { Button, IButtonProps } from 'native-base';
import React from 'react';

interface SplitButtonProps extends IButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const SplitButton: React.FC<SplitButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  ...props
}) => {
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
      default:
        return {};
    }
  };

  const getSizeProps = () => {
    switch (size) {
      case 'sm':
        return { px: 3, py: 2, _text: { fontSize: 'sm' } };
      case 'md':
        return { px: 4, py: 3, _text: { fontSize: 'md' } };
      case 'lg':
        return { px: 6, py: 4, _text: { fontSize: 'lg' } };
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