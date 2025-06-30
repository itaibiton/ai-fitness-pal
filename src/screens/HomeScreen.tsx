import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { AuthButton } from '../components/AuthButton';

export const HomeScreen: React.FC = () => {
  const { user, handleSignOut } = useAuth();

  const handleLogout = async () => {
    try {
      await handleSignOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 py-8">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            AI Fitness Pal
          </Text>
          <Text className="text-xl text-gray-700">
            Welcome, {user?.email}! 👋
          </Text>
          {user?.name && (
            <Text className="text-gray-600 mt-1">
              {user.name}
            </Text>
          )}
        </View>

        {/* Quick Stats/Info */}
        <View className="bg-blue-50 rounded-lg p-6 mb-6">
          <Text className="text-lg font-semibold text-blue-900 mb-2">
            Ready to get started?
          </Text>
          <Text className="text-blue-700">
            Your AI-powered fitness journey begins here. Soon you'll be able to:
          </Text>
          <Text className="text-blue-700 mt-2">
            • Log your workouts {'\n'}
            • Get AI-generated workout plans {'\n'}
            • Track your progress {'\n'}
            • Achieve your fitness goals
          </Text>
        </View>

        {/* Placeholder for future features */}
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-center mb-4">
            More features coming soon...
          </Text>
          <Text className="text-gray-400 text-sm text-center">
            This is your fitness dashboard. Workout logging, AI plan generation, 
            and progress tracking will be added here.
          </Text>
        </View>

        {/* Logout Button */}
        <View className="mt-6">
          <AuthButton
            title="Sign Out"
            onPress={handleLogout}
            variant="secondary"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};