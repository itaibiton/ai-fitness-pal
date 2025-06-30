import React from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingStack';
import { OnboardingWizard } from '../../components/onboarding/OnboardingWizard';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Profile'>;

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const stepTitles = ['Personal Info', 'Fitness Profile', 'Measurements', 'Goals'];
  
  return (
    <OnboardingWizard
      currentStep={2}
      totalSteps={4}
      stepTitles={stepTitles}
    >
      <View className="flex-1 px-6 py-8">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Your fitness profile
          </Text>
          <Text className="text-gray-600 text-lg">
            Help us understand your experience and preferences
          </Text>
        </View>

        {/* Content Area - To be implemented in Phase 3 */}
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-center mb-4">
            🏋️ Fitness Profile Form Coming Soon
          </Text>
          <Text className="text-gray-400 text-sm text-center">
            Experience level, workout frequency, equipment, and preferences
          </Text>
        </View>

        {/* Navigation Buttons */}
        <View className="mt-6">
          <Text className="text-center text-gray-500 mb-4">Step 2 of 4</Text>
          
          {/* Temporary navigation for testing */}
          <View className="bg-blue-50 p-4 rounded-lg">
            <Text className="text-blue-700 text-sm text-center mb-2">
              🚧 Development Navigation
            </Text>
            <View className="flex-row justify-between">
              <Text 
                className="text-blue-600 font-semibold"
                onPress={() => navigation.goBack()}
              >
                ← Back
              </Text>
              <Text 
                className="text-blue-600 font-semibold"
                onPress={() => navigation.navigate('Measurements')}
              >
                Next: Measurements →
              </Text>
            </View>
          </View>
        </View>
      </View>
    </OnboardingWizard>
  );
};