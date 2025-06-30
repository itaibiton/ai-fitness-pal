import React from 'react';
import { View, Text } from 'react-native';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepTitles,
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <View className="w-full">
      {/* Step Counter */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-sm font-medium text-gray-600">
          Step {currentStep} of {totalSteps}
        </Text>
        <Text className="text-sm font-medium text-blue-600">
          {Math.round(progressPercentage)}% Complete
        </Text>
      </View>

      {/* Progress Bar */}
      <View className="w-full h-2 bg-gray-200 rounded-full mb-4">
        <View 
          className="h-2 bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </View>

      {/* Step Dots */}
      <View className="flex-row justify-between items-center">
        {stepTitles.map((title, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <View key={index} className="flex-1 items-center">
              {/* Dot */}
              <View
                className={`w-8 h-8 rounded-full border-2 items-center justify-center mb-2 ${
                  isCompleted
                    ? 'bg-blue-600 border-blue-600'
                    : isCurrent
                    ? 'bg-blue-100 border-blue-600'
                    : 'bg-gray-100 border-gray-300'
                }`}
              >
                {isCompleted ? (
                  <Text className="text-white text-sm font-bold">✓</Text>
                ) : (
                  <Text
                    className={`text-sm font-bold ${
                      isCurrent ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  >
                    {stepNumber}
                  </Text>
                )}
              </View>

              {/* Step Title */}
              <Text
                className={`text-xs text-center ${
                  isCompleted || isCurrent
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-400'
                }`}
                numberOfLines={2}
              >
                {title}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};