import React from 'react';
import { View, SafeAreaView, Text, Alert } from 'react-native';
import { ProgressIndicator } from './ProgressIndicator';
import { useAuth } from '../../hooks/useAuth';

interface OnboardingWizardProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  showProgress?: boolean;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  children,
  currentStep,
  totalSteps,
  stepTitles,
  showProgress = true,
}) => {
  const { handleSignOut } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout? This will return you to the login screen.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await handleSignOut();
            } catch (error) {
              console.error('Logout error:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Progress Indicator with Logout */}
      {showProgress && (
        <View className="px-6 py-4 border-b border-gray-100">
          <View className="flex-row justify-between items-start mb-2">
            <View className="flex-1">
              <ProgressIndicator
                currentStep={currentStep}
                totalSteps={totalSteps}
                stepTitles={stepTitles}
              />
            </View>
            
            {/* Logout Button */}
            <Text 
              className="text-gray-500 text-sm font-medium ml-4 mt-1"
              onPress={handleLogout}
            >
              Logout
            </Text>
          </View>
        </View>
      )}
      
      {/* Main Content Area */}
      <View className="flex-1">
        {children}
      </View>
    </SafeAreaView>
  );
};