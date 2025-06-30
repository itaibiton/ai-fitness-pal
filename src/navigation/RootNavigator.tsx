import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import { OnboardingStack } from './OnboardingStack';

export const RootNavigator: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Track every render to see if RootNavigator is re-rendering
  console.log('🔄 RootNavigator render:', {
    isAuthenticated,
    isLoading,
    hasUser: !!user,
    userEmail: user?.email,
    timestamp: new Date().toISOString()
  });

  // Log navigation state changes with more dependencies
  useEffect(() => {
    console.log('🎯 RootNavigator navigation state change detected:', {
      isAuthenticated,
      isLoading,
      hasUser: !!user,
      userEmail: user?.email,
      timestamp: new Date().toISOString()
    });
  }, [isAuthenticated, isLoading, user]);

  // Show loading spinner while checking authentication state
  if (isLoading) {
    console.log('RootNavigator: Showing loading spinner');
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  // Determine which stack to show
  const getActiveStack = () => {
    console.log('🎮 getActiveStack called:', {
      isAuthenticated,
      isLoading,
      hasUser: !!user,
      userEmail: user?.email,
      timestamp: new Date().toISOString()
    });

    if (!isAuthenticated) {
      console.log('🚫 RootNavigator: User not authenticated, showing AuthStack');
      return <AuthStack />;
    }
    
    console.log('✅ RootNavigator: User authenticated, showing OnboardingStack');
    // For now, always show onboarding for authenticated users during development
    // TODO: In Phase 1.4, we'll add onboardingCompleted check to user data
    const onboardingCompleted = false; // user?.onboardingCompleted || false;
    
    if (!onboardingCompleted) {
      return <OnboardingStack />;
    }
    
    return <AppStack />;
  };

  // Create a key that changes when auth state changes to force re-render
  const navigationKey = `nav-${isAuthenticated ? 'auth' : 'unauth'}-${user?._id || 'no-user'}`;

  console.log('🔑 NavigationContainer key:', navigationKey);

  return (
    <NavigationContainer key={navigationKey}>
      {getActiveStack()}
    </NavigationContainer>
  );
};