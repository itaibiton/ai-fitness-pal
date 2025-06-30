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
        console.log('📱 Loading session token from AsyncStorage...');
        const token = await AsyncStorage.getItem(SESSION_TOKEN_KEY);
        console.log('📱 AsyncStorage result:', {
          hasToken: !!token,
          tokenPreview: token ? `${token.substring(0, 8)}...` : 'none',
          tokenLength: token?.length || 0
        });
        setSessionToken(token);
      } catch (error) {
        console.error("❌ Error loading session token:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSessionToken();
  }, []);

  // Get current user with session token
  const queryArgs = sessionToken ? { sessionToken } : "skip";
  
  const user = useQuery(api.auth.getCurrentUser, queryArgs);

  // Debug query results
  useEffect(() => {
    console.log('🔍 getCurrentUser query result:', {
      hasSessionToken: !!sessionToken,
      userResult: user === undefined ? 'loading' : user === null ? 'null' : 'loaded',
      userEmail: user?.email,
      userId: user?._id,
      timestamp: new Date().toISOString()
    });
  }, [user, sessionToken]);
  
  const signUpAction = useAction(api.auth.signUp);
  const signInAction = useAction(api.auth.signIn);
  const signOutMutation = useMutation(api.auth.signOut);

  // Check if user is authenticated
  const isAuthenticated = !!user && !!sessionToken;
  
  // Debug authentication calculation
  useEffect(() => {
    console.log('🔐 Authentication state calculation:', {
      hasUser: !!user,
      hasSessionToken: !!sessionToken,
      isAuthenticated,
      userEmail: user?.email,
      isLoading: isLoading || (sessionToken && user === undefined),
      timestamp: new Date().toISOString()
    });
  }, [user, sessionToken, isAuthenticated, isLoading]);

  // Store session token
  const storeSessionToken = async (token: string) => {
    try {
      console.log('💾 Storing session token...');
      await AsyncStorage.setItem(SESSION_TOKEN_KEY, token);
      console.log('📱 AsyncStorage updated, setting state...');
      setSessionToken(token);
      console.log('🔄 SessionToken state updated, should trigger query refetch');
    } catch (error) {
      console.error("❌ Error storing session token:", error);
      throw error;
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
      console.log('🚀 Starting signup process...');
      const result = await signUpAction({ email, password, name });
      console.log('✅ Signup successful, storing token...');
      await storeSessionToken(result.sessionToken);
      console.log('💾 Token stored successfully');
      
      // Use a simpler approach - just wait a reasonable time for query to refetch
      setTimeout(() => {
        console.log('⏰ Clearing isAuthenticating after timeout');
        setIsAuthenticating(false);
      }, 2000); // Give more time for query to complete
      
      return result;
    } catch (error: any) {
      console.error("❌ Sign up error:", error);
      setIsAuthenticating(false);
      throw new Error(error.message || "Failed to create account");
    }
  };

  // Sign in with email and password
  const handleSignIn = async (email: string, password: string) => {
    try {
      setIsAuthenticating(true);
      console.log('🚀 Starting signin process...');
      const result = await signInAction({ email, password });
      console.log('✅ Signin successful, storing token...');
      await storeSessionToken(result.sessionToken);
      console.log('💾 Token stored successfully');
      
      // Use a simpler approach - just wait a reasonable time for query to refetch
      setTimeout(() => {
        console.log('⏰ Clearing isAuthenticating after timeout');
        setIsAuthenticating(false);
      }, 2000); // Give more time for query to complete
      
      return result;
    } catch (error: any) {
      console.error("❌ Sign in error:", error);
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
    isLoading: isLoading || (sessionToken && user === undefined),
    user: user as User | null | undefined,
    sessionToken,
    isAuthenticating, // Expose this separately for UI feedback
    handleSignIn,
    handleSignUp,
    handleSignOut,
  };
};