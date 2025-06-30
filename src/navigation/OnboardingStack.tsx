import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PersonalInfoScreen } from '../screens/onboarding/PersonalInfoScreen';
import { ProfileScreen } from '../screens/onboarding/ProfileScreen';
import { MeasurementsScreen } from '../screens/onboarding/MeasurementsScreen';
import { GoalsScreen } from '../screens/onboarding/GoalsScreen';

export type OnboardingStackParamList = {
  PersonalInfo: undefined;
  Profile: undefined;
  Measurements: undefined;
  Goals: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export const OnboardingStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="PersonalInfo"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // Prevent swipe back - force use of our navigation
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen 
        name="PersonalInfo" 
        component={PersonalInfoScreen}
        options={{ title: 'Personal Information' }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Fitness Profile' }}
      />
      <Stack.Screen 
        name="Measurements" 
        component={MeasurementsScreen}
        options={{ title: 'Body Measurements' }}
      />
      <Stack.Screen 
        name="Goals" 
        component={GoalsScreen}
        options={{ title: 'Fitness Goals' }}
      />
    </Stack.Navigator>
  );
};