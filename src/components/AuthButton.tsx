import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  title,
  onPress,
  loading = false,
  variant = 'primary',
  disabled = false,
}) => {
  const baseClasses = "w-full py-4 rounded-lg flex-row justify-center items-center";
  const primaryClasses = "bg-blue-600 active:bg-blue-700";
  const secondaryClasses = "bg-gray-200 active:bg-gray-300";
  const disabledClasses = "opacity-50";

  const buttonClasses = `${baseClasses} ${
    variant === 'primary' ? primaryClasses : secondaryClasses
  } ${(disabled || loading) ? disabledClasses : ''}`;

  const textColor = variant === 'primary' ? 'text-white' : 'text-gray-800';

  return (
    <TouchableOpacity
      className={buttonClasses}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'primary' ? 'white' : 'gray'} />
      ) : (
        <Text className={`${textColor} text-lg font-semibold`}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};