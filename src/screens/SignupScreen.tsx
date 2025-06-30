import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { AuthInput } from '../components/AuthInput';
import { AuthButton } from '../components/AuthButton';
import { SuccessMessage } from '../components/SuccessMessage';
import { useAuth } from '../hooks/useAuth';

interface SignupScreenProps {
  navigation: any;
}

export const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { handleSignUp } = useAuth();

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }
    
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await handleSignUp(email, password, name || undefined);
      // Show success message
      setLoading(false);
      setShowSuccess(true);
    } catch (error: any) {
      console.error('Signup error:', error);
      Alert.alert('Signup Error', error.message || 'Failed to create account');
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
            Create Account
          </Text>
          <Text className="text-gray-600 text-center">
            Join AI Fitness Pal and start your fitness journey
          </Text>
        </View>

        <View className="mb-6">
          <AuthInput
            label="Name (Optional)"
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
          
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
            placeholder="Create a password (min 6 characters)"
            secureTextEntry
            autoCapitalize="none"
          />
          
          <AuthInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <View className="mb-6">
          <AuthButton
            title="Create Account"
            onPress={handleSignup}
            loading={loading}
          />
        </View>

        <View className="flex-row justify-center">
          <Text className="text-gray-600">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-blue-600 font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Success Message Overlay */}
      {showSuccess && (
        <SuccessMessage
          message="Account Created!"
          subMessage="Welcome to AI Fitness Pal. You're now signed in."
          onComplete={handleSuccessComplete}
          duration={2000}
        />
      )}
    </KeyboardAvoidingView>
  );
};