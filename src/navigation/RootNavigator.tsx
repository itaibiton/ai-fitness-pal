import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import { OnboardingStack } from './OnboardingStack';

export const RootNavigator: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Show loading spinner while checking authentication state
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  // Determine which stack to show
  const getActiveStack = () => {
    if (!isAuthenticated) {
      return <AuthStack />;
    }
    
    // For now, always show onboarding for authenticated users during development
    // TODO: In Phase 1.4, we'll add onboardingCompleted check to user data
    const onboardingCompleted = false; // user?.onboardingCompleted || false;
    
    if (!onboardingCompleted) {
      return <OnboardingStack />;
    }
    
    return <AppStack />;
  };

  return (
    <NavigationContainer>
      {getActiveStack()}
    </NavigationContainer>
  );
};