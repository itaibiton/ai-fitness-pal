import React from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingStack';
import { OnboardingWizard } from '../../components/onboarding/OnboardingWizard';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'PersonalInfo'>;

export const PersonalInfoScreen: React.FC<Props> = ({ navigation }) => {
  const stepTitles = ['Personal Info', 'Fitness Profile', 'Measurements', 'Goals'];
  
  return (
    <OnboardingWizard
      currentStep={1}
      totalSteps={4}
      stepTitles={stepTitles}
    >
      <View className="flex-1 px-6 py-8">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Let's get to know you
          </Text>
          <Text className="text-gray-600 text-lg">
            Tell us a bit about yourself to personalize your fitness journey
          </Text>
        </View>

        {/* Content Area - To be implemented in Phase 2 */}
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-center mb-4">
            🏗️ Personal Info Form Coming Soon
          </Text>
          <Text className="text-gray-400 text-sm text-center">
            Name, age, gender, height, and units preference will be collected here
          </Text>
        </View>

        {/* Navigation Buttons */}
        <View className="mt-6">
          <Text className="text-center text-gray-500 mb-4">Step 1 of 4</Text>
          
          {/* Temporary navigation for testing */}
          <View className="bg-blue-50 p-4 rounded-lg">
            <Text className="text-blue-700 text-sm text-center mb-2">
              🚧 Development Navigation
            </Text>
            <Text 
              className="text-blue-600 text-center font-semibold"
              onPress={() => navigation.navigate('Profile')}
            >
              Next: Profile →
            </Text>
          </View>
        </View>
      </View>
    </OnboardingWizard>
  );
};