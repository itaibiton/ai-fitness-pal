import { useState, useCallback } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuth } from './useAuth';

// Type definitions for onboarding data
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  height: number;
  units: 'metric' | 'imperial';
}

export interface FitnessProfile {
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  workoutFrequency: '1-2' | '3-4' | '5-6' | 'daily';
  workoutDuration: '15-30' | '30-45' | '45-60' | '60+';
  preferredWorkoutTypes: ('strength' | 'cardio' | 'flexibility' | 'sports' | 'functional' | 'bodyweight')[];
  availableEquipment: ('none' | 'dumbbells' | 'barbell' | 'resistance_bands' | 'kettlebells' | 'pull_up_bar' | 'gym_access')[];
  workoutLocation: 'home' | 'gym' | 'outdoor' | 'mixed';
}

export interface Measurements {
  weight: number;
  bodyFatPercentage?: number;
  muscleMass?: number;
  bmi?: number;
  bodyType?: 'ectomorph' | 'mesomorph' | 'endomorph';
  progressPhotos?: string[];
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    biceps?: number;
    thighs?: number;
  };
}

export interface Goals {
  primaryGoal: 'lose_weight' | 'gain_muscle' | 'improve_endurance' | 'increase_strength' | 'improve_flexibility' | 'maintain_fitness' | 'sport_specific' | 'general_health';
  targetWeight?: number;
  targetTimeframe: '1_month' | '3_months' | '6_months' | '1_year' | 'ongoing';
  motivationLevel: number;
  specificTargets?: string[];
  weeklyGoals?: {
    workoutSessions: number;
    targetCalories?: number;
    stepCount?: number;
  };
}

export interface OnboardingData {
  personalInfo?: PersonalInfo;
  fitnessProfile?: FitnessProfile;
  measurements?: Measurements;
  goals?: Goals;
  currentStep: number;
  isCompleted: boolean;
}

export const useOnboarding = () => {
  const { user, sessionToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Queries
  const userData = useQuery(
    api.users.getCurrentUserBySession, 
    sessionToken ? { sessionToken } : 'skip'
  );
  
  // Mutations
  const updateOnboardingStepMutation = useMutation(api.users.updateOnboardingStep);
  const updatePersonalInfoMutation = useMutation(api.users.updatePersonalInfo);
  const updateFitnessProfileMutation = useMutation(api.users.updateFitnessProfile);
  const updateMeasurementsMutation = useMutation(api.users.updateMeasurements);
  const updateGoalsMutation = useMutation(api.users.updateGoals);
  const completeOnboardingMutation = useMutation(api.users.completeOnboarding);

  // Current onboarding data
  const onboardingData: OnboardingData = {
    personalInfo: userData?.personalInfo,
    fitnessProfile: userData?.fitnessProfile,
    measurements: userData?.measurements,
    goals: userData?.goals,
    currentStep: userData?.onboardingStep || 1,
    isCompleted: userData?.onboardingCompleted || false,
  };

  // Helper functions
  const calculateBMI = useCallback((weight: number, height: number, units: 'metric' | 'imperial'): number => {
    if (units === 'metric') {
      // weight in kg, height in cm
      const heightInMeters = height / 100;
      return weight / (heightInMeters * heightInMeters);
    } else {
      // weight in lbs, height in inches
      return (weight / (height * height)) * 703;
    }
  }, []);

  // Step handlers
  const savePersonalInfo = useCallback(async (data: PersonalInfo) => {
    if (!sessionToken) {
      throw new Error('Not authenticated');
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await updatePersonalInfoMutation({ sessionToken, personalInfo: data });
      await updateOnboardingStepMutation({ sessionToken, step: 2 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save personal information');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [updatePersonalInfoMutation, updateOnboardingStepMutation, sessionToken]);

  const saveFitnessProfile = useCallback(async (data: FitnessProfile) => {
    if (!sessionToken) {
      throw new Error('Not authenticated');
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await updateFitnessProfileMutation({ sessionToken, fitnessProfile: data });
      await updateOnboardingStepMutation({ sessionToken, step: 3 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save fitness profile');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [updateFitnessProfileMutation, updateOnboardingStepMutation, sessionToken]);

  const saveMeasurements = useCallback(async (data: Measurements) => {
    if (!sessionToken) {
      throw new Error('Not authenticated');
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Calculate BMI if weight and height are available
      if (data.weight && onboardingData.personalInfo?.height && onboardingData.personalInfo?.units) {
        data.bmi = calculateBMI(
          data.weight,
          onboardingData.personalInfo.height,
          onboardingData.personalInfo.units
        );
      }
      
      await updateMeasurementsMutation({ sessionToken, measurements: data });
      await updateOnboardingStepMutation({ sessionToken, step: 4 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save measurements');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [updateMeasurementsMutation, updateOnboardingStepMutation, sessionToken, onboardingData.personalInfo, calculateBMI]);

  const saveGoals = useCallback(async (data: Goals) => {
    if (!sessionToken) {
      throw new Error('Not authenticated');
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await updateGoalsMutation({ sessionToken, goals: data });
      await completeOnboardingMutation({ sessionToken });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save goals');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [updateGoalsMutation, completeOnboardingMutation, sessionToken]);

  const goToStep = useCallback(async (step: number) => {
    if (!sessionToken) {
      throw new Error('Not authenticated');
    }
    
    if (step < 1 || step > 4) {
      throw new Error('Invalid step number. Must be between 1 and 4.');
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await updateOnboardingStepMutation({ sessionToken, step });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update step');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [updateOnboardingStepMutation, sessionToken]);

  const resetOnboarding = useCallback(async () => {
    if (!sessionToken) {
      throw new Error('Not authenticated');
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await updateOnboardingStepMutation({ sessionToken, step: 1 });
      // Note: This doesn't clear existing data, just resets the step
      // Full data clearing would require additional mutations
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset onboarding');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [updateOnboardingStepMutation, sessionToken]);

  // Validation helpers
  const isStepComplete = useCallback((step: number): boolean => {
    switch (step) {
      case 1:
        return !!(onboardingData.personalInfo?.firstName && 
                 onboardingData.personalInfo?.lastName &&
                 onboardingData.personalInfo?.age &&
                 onboardingData.personalInfo?.gender &&
                 onboardingData.personalInfo?.height &&
                 onboardingData.personalInfo?.units);
      case 2:
        return !!(onboardingData.fitnessProfile?.experienceLevel &&
                 onboardingData.fitnessProfile?.workoutFrequency &&
                 onboardingData.fitnessProfile?.workoutDuration &&
                 onboardingData.fitnessProfile?.preferredWorkoutTypes?.length &&
                 onboardingData.fitnessProfile?.availableEquipment?.length &&
                 onboardingData.fitnessProfile?.workoutLocation);
      case 3:
        return !!(onboardingData.measurements?.weight);
      case 4:
        return !!(onboardingData.goals?.primaryGoal &&
                 onboardingData.goals?.targetTimeframe &&
                 typeof onboardingData.goals?.motivationLevel === 'number');
      default:
        return false;
    }
  }, [onboardingData]);

  const getCompletionPercentage = useCallback((): number => {
    let completedSteps = 0;
    for (let i = 1; i <= 4; i++) {
      if (isStepComplete(i)) {
        completedSteps++;
      }
    }
    return (completedSteps / 4) * 100;
  }, [isStepComplete]);

  return {
    // Data
    onboardingData,
    isLoading: isLoading || !userData,
    error,
    
    // Step handlers
    savePersonalInfo,
    saveFitnessProfile,
    saveMeasurements,
    saveGoals,
    goToStep,
    resetOnboarding,
    
    // Validation
    isStepComplete,
    getCompletionPercentage,
    
    // Utilities
    calculateBMI,
  };
};