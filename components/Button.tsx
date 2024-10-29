import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  title?: string;
}

function Button({ variant = 'primary', size = 'md', title, disabled, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      className={`
        items-center justify-center
        ${size === 'sm' ? 'px-3 py-2' : size === 'md' ? 'px-4 py-3' : 'px-6 py-4'}
        ${
          variant === 'primary'
            ? 'bg-primary'
            : variant === 'secondary'
              ? 'bg-secondary'
              : 'border-primary border bg-transparent'
        }
        ${disabled ? 'opacity-50' : 'active:opacity-90'}
        rounded-xl
      `}
      {...props}>
      <Text
        className={`
          font-medium
          ${size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'}
          ${variant === 'outline' ? 'text-primary' : 'text-#1A2138'}
 
        `}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;
