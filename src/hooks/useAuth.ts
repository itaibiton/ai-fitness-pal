import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { User } from "../types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

const SESSION_TOKEN_KEY = 'sessionToken';

export const useAuth = () => {
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Load session token from storage on mount
  useEffect(() => {
    const loadSessionToken = async () => {
      try {
        const token = await AsyncStorage.getItem(SESSION_TOKEN_KEY);
        setSessionToken(token);
      } catch (error) {
        console.error("Error loading session token:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSessionToken();
  }, []);

  // Get current user with session token
  const user = useQuery(api.auth.getCurrentUser, 
    sessionToken ? { sessionToken } : "skip"
  );
  
  const signUpAction = useAction(api.auth.signUp);
  const signInAction = useAction(api.auth.signIn);
  const signOutMutation = useMutation(api.auth.signOut);

  // Check if user is authenticated
  const isAuthenticated = !!user && !!sessionToken;
  
  // Debug logging
  console.log('Auth State:', { 
    sessionToken: !!sessionToken, 
    user: !!user, 
    isAuthenticated, 
    isLoading, 
    isAuthenticating,
    userEmail: user?.email 
  });

  // Store session token
  const storeSessionToken = async (token: string) => {
    try {
      await AsyncStorage.setItem(SESSION_TOKEN_KEY, token);
      setSessionToken(token);
    } catch (error) {
      console.error("Error storing session token:", error);
    }
  };

  // Clear session token
  const clearSessionToken = async () => {
    try {
      await AsyncStorage.removeItem(SESSION_TOKEN_KEY);
      setSessionToken(null);
    } catch (error) {
      console.error("Error clearing session token:", error);
    }
  };

  // Sign up with email and password
  const handleSignUp = async (email: string, password: string, name?: string) => {
    try {
      setIsAuthenticating(true);
      console.log('Starting signup process...');
      const result = await signUpAction({ email, password, name });
      console.log('Signup successful, storing token...');
      await storeSessionToken(result.sessionToken);
      console.log('Token stored, authentication should update...');
      
      // Add a small delay to allow query to refetch
      setTimeout(() => {
        setIsAuthenticating(false);
      }, 1000);
      
      return result;
    } catch (error: any) {
      console.error("Sign up error:", error);
      setIsAuthenticating(false);
      throw new Error(error.message || "Failed to create account");
    }
  };

  // Sign in with email and password
  const handleSignIn = async (email: string, password: string) => {
    try {
      setIsAuthenticating(true);
      console.log('Starting signin process...');
      const result = await signInAction({ email, password });
      console.log('Signin successful, storing token...');
      await storeSessionToken(result.sessionToken);
      console.log('Token stored, authentication should update...');
      
      // Add a small delay to allow query to refetch
      setTimeout(() => {
        setIsAuthenticating(false);
      }, 1000);
      
      return result;
    } catch (error: any) {
      console.error("Sign in error:", error);
      setIsAuthenticating(false);
      throw new Error(error.message || "Failed to sign in");
    }
  };

  // Sign out
  const handleSignOut = async () => {
    try {
      if (sessionToken) {
        await signOutMutation({ sessionToken });
      }
      await clearSessionToken();
    } catch (error) {
      console.error("Sign out error:", error);
      // Clear token even if server call fails
      await clearSessionToken();
    }
  };

  return {
    isAuthenticated,
    isLoading: isLoading || (sessionToken && user === undefined) || isAuthenticating,
    user: user as User | null | undefined,
    handleSignIn,
    handleSignUp,
    handleSignOut,
  };
};