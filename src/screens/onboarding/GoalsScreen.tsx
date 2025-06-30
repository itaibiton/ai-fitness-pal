import React from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingStack';
import { OnboardingWizard } from '../../components/onboarding/OnboardingWizard';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Goals'>;

export const GoalsScreen: React.FC<Props> = ({ navigation }) => {
  const stepTitles = ['Personal Info', 'Fitness Profile', 'Measurements', 'Goals'];
  
  return (
    <OnboardingWizard
      currentStep={4}
      totalSteps={4}
      stepTitles={stepTitles}
    >
      <View className="flex-1 px-6 py-8">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Your fitness goals
          </Text>
          <Text className="text-gray-600 text-lg">
            What do you want to achieve? Let's set you up for success
          </Text>
        </View>

        {/* Content Area - To be implemented in Phase 5 */}
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-center mb-4">
            🎯 Goals Setting Form Coming Soon
          </Text>
          <Text className="text-gray-400 text-sm text-center">
            Primary goals, targets, timeline, and motivation assessment
          </Text>
        </View>

        {/* Navigation Buttons */}
        <View className="mt-6">
          <Text className="text-center text-gray-500 mb-4">Step 4 of 4</Text>
          
          {/* Temporary navigation for testing */}
          <View className="bg-green-50 p-4 rounded-lg">
            <Text className="text-green-700 text-sm text-center mb-2">
              🚧 Development Navigation
            </Text>
            <View className="flex-row justify-between">
              <Text 
                className="text-green-600 font-semibold"
                onPress={() => navigation.goBack()}
              >
                ← Back
              </Text>
              <Text className="text-green-600 font-semibold text-center">
                🎉 Complete Onboarding
                {'\n'}(Main app integration in Phase 6)
              </Text>
            </View>
          </View>
        </View>
      </View>
    </OnboardingWizard>
  );
};