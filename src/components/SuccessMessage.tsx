import React, { useEffect } from 'react';
import { View, Text, Animated } from 'react-native';

interface SuccessMessageProps {
  message: string;
  subMessage?: string;
  onComplete?: () => void;
  duration?: number;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  subMessage,
  onComplete,
  duration = 2000,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto complete after duration
    const timer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, onComplete, duration]);

  return (
    <View className="absolute inset-0 justify-center items-center bg-white z-50">
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
        className="items-center px-8"
      >
        {/* Success Checkmark */}
        <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-6">
          <View className="w-12 h-12 bg-green-500 rounded-full items-center justify-center">
            <Text className="text-white text-2xl font-bold">✓</Text>
          </View>
        </View>

        {/* Success Message */}
        <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
          {message}
        </Text>

        {/* Sub Message */}
        {subMessage && (
          <Text className="text-gray-600 text-center text-base">
            {subMessage}
          </Text>
        )}

        {/* Loading indicator */}
        <View className="mt-6">
          <Text className="text-gray-500 text-sm">Redirecting...</Text>
        </View>
      </Animated.View>
    </View>
  );
};