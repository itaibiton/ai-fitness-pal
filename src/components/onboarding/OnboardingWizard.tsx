import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { ProgressIndicator } from './ProgressIndicator';

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
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Progress Indicator */}
      {showProgress && (
        <View className="px-6 py-4 border-b border-gray-100">
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            stepTitles={stepTitles}
          />
        </View>
      )}
      
      {/* Main Content Area */}
      <View className="flex-1">
        {children}
      </View>
    </SafeAreaView>
  );
};