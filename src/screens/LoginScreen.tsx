import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { AuthInput } from '../components/AuthInput';
import { AuthButton } from '../components/AuthButton';
import { SuccessMessage } from '../components/SuccessMessage';
import { useAuth } from '../hooks/useAuth';

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { handleSignIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await handleSignIn(email, password);
      // Show success message
      setLoading(false);
      setShowSuccess(true);
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Login Error', error.message || 'Failed to login');
      setLoading(false);
    }
  };

  const handleSuccessComplete = () => {
    // The RootNavigator will automatically redirect to the authenticated app
    // when the authentication state updates
    setShowSuccess(false);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <View className="flex-1 justify-center px-6">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
            Welcome Back
          </Text>
          <Text className="text-gray-600 text-center">
            Sign in to your AI Fitness Pal account
          </Text>
        </View>

        <View className="mb-6">
          <AuthInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <AuthInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <View className="mb-6">
          <AuthButton
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
          />
        </View>

        <View className="flex-row justify-center">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text className="text-blue-600 font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Success Message Overlay */}
      {showSuccess && (
        <SuccessMessage
          message="Welcome Back!"
          subMessage="Successfully signed in to AI Fitness Pal."
          onComplete={handleSuccessComplete}
          duration={2000}
        />
      )}
    </KeyboardAvoidingView>
  );
};