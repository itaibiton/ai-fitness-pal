# 🚀 AI Fitness Pal - Onboarding Process Implementation

> **Project Goal:** Create a comprehensive 4-step onboarding wizard that collects essential user data for personalized fitness experience

---

## 📊 Quick Stats

> 💡 **Total Tasks:** 27
> ⏱️ **Estimated Timeline:** 6 weeks
> 🎯 **Current Phase:** Foundation Setup
> 📱 **Target:** React Native + NativeWind + Convex

---

## 🏗️ Phase Overview

### Phase 1: Foundation & Navigation (Week 1)
**5 tasks** - Core infrastructure and navigation setup

### Phase 2: Personal Info Screen (Week 2) 
**4 tasks** - Basic demographics collection

### Phase 3: Profile Screen (Week 3)
**5 tasks** - Fitness experience and preferences

### Phase 4: Measurements Screen (Week 4)
**4 tasks** - Body metrics and composition

### Phase 5: Goals Screen (Week 5)
**5 tasks** - Fitness objectives and targets

### Phase 6: Completion & Integration (Week 6)
**4 tasks** - Final integration and app routing

---

## ✅ Detailed Task Breakdown

### 🏗️ PHASE 1: Foundation & Navigation

- [ ] **Task 1.1: Create Onboarding Navigation Structure**
  - Create `OnboardingStack.tsx` with 4 screens
  - Add step indicator/progress bar component  
  - Implement next/back/skip navigation logic
  - Add onboarding completion routing
  - **Priority:** High | **Estimate:** 2 hours

- [ ] **Task 1.2: Design Onboarding Wizard Container**
  - Create `OnboardingWizard.tsx` wrapper component
  - Add shared layout and styling
  - Implement step management state
  - Add progress persistence between steps
  - **Priority:** High | **Estimate:** 2 hours

- [ ] **Task 1.3: Create Progress Indicator Component**
  - Build `ProgressIndicator.tsx` with step visualization
  - Add current step highlighting
  - Include step names and completion status
  - Responsive design for different screen sizes
  - **Priority:** High | **Estimate:** 1.5 hours

- [ ] **Task 1.4: Update Database Schema**
  - Extend user schema with onboarding fields
  - Add `onboardingCompleted` boolean flag
  - Create validation rules for required fields
  - Add indexes for efficient queries
  - **Priority:** High | **Estimate:** 1 hour

- [ ] **Task 1.5: Implement Onboarding State Management**
  - Create `useOnboarding` custom hook
  - Add form data persistence across steps
  - Implement data validation logic
  - Add error handling and recovery
  - **Priority:** High | **Estimate:** 2 hours

### 👤 PHASE 2: Personal Info Screen

- [ ] **Task 2.1: Create Personal Info Screen UI**
  - Build `PersonalInfoScreen.tsx` with form fields
  - Add name, age, gender, height input components
  - Implement proper keyboard handling
  - Add field validation with real-time feedback
  - **Priority:** Medium | **Estimate:** 2 hours

- [ ] **Task 2.2: Create Input Components**
  - Build `NumberInput.tsx` for age/height
  - Create `GenderSelector.tsx` with radio buttons
  - Add `NameInput.tsx` with proper validation
  - Implement accessibility features
  - **Priority:** Medium | **Estimate:** 2 hours

- [ ] **Task 2.3: Add Units System**
  - Create imperial/metric toggle
  - Implement height conversion (ft/in ↔ cm)
  - Add weight units selection
  - Store unit preferences
  - **Priority:** Medium | **Estimate:** 1.5 hours

- [ ] **Task 2.4: Implement Data Validation**
  - Add age range validation (13-120)
  - Height range validation by gender
  - Name format validation
  - Error messages and field highlighting
  - **Priority:** Medium | **Estimate:** 1 hour

### 🏋️ PHASE 3: Profile Screen

- [ ] **Task 3.1: Create Profile Screen UI**
  - Build `ProfileScreen.tsx` with selection cards
  - Add fitness experience level selector
  - Create workout frequency picker
  - Add available equipment checklist
  - **Priority:** Medium | **Estimate:** 2 hours

- [ ] **Task 3.2: Create Selection Components**
  - Build `ExperienceSelector.tsx` (beginner/intermediate/advanced)
  - Create `FrequencyPicker.tsx` with days per week
  - Add `EquipmentChecklist.tsx` with common equipment
  - Implement `WorkoutTimeSelector.tsx` for session duration
  - **Priority:** Medium | **Estimate:** 2.5 hours

- [ ] **Task 3.3: Add Equipment Database**
  - Create equipment categories (cardio, strength, etc.)
  - Add equipment icons and descriptions
  - Implement "gym" vs "home" presets
  - Add custom equipment entry option
  - **Priority:** Low | **Estimate:** 2 hours

- [ ] **Task 3.4: Implement Activity Level Assessment**
  - Create quick fitness assessment questions
  - Add current activity level evaluation
  - Implement experience level recommendations
  - Add helpful tips for each level
  - **Priority:** Medium | **Estimate:** 1.5 hours

- [ ] **Task 3.5: Add Preferences Collection**
  - Workout time preferences (morning/evening)
  - Rest day preferences
  - Notification preferences
  - Social sharing preferences
  - **Priority:** Low | **Estimate:** 1 hour

### 📏 PHASE 4: Measurements Screen

- [ ] **Task 4.1: Create Measurements Screen UI**
  - Build `MeasurementsScreen.tsx` with weight/body composition
  - Add current weight input with unit conversion
  - Create body fat percentage selector (optional)
  - Add progress photo upload option
  - **Priority:** Medium | **Estimate:** 2 hours

- [ ] **Task 4.2: Create Measurement Components**
  - Build `WeightInput.tsx` with kg/lbs conversion
  - Create `BodyCompositionSlider.tsx` for body fat %
  - Add `MeasurementHistory.tsx` for tracking
  - Implement `PhotoUpload.tsx` component
  - **Priority:** Medium | **Estimate:** 2.5 hours

- [ ] **Task 4.3: Add Body Composition Tools**
  - Visual body composition estimator
  - BMI calculation and interpretation
  - Body fat percentage guidelines
  - Measurement tips and best practices
  - **Priority:** Low | **Estimate:** 2 hours

- [ ] **Task 4.4: Implement Measurement Validation**
  - Weight range validation by age/height
  - Body fat percentage realistic ranges
  - Photo upload size/format validation
  - Optional field handling
  - **Priority:** Medium | **Estimate:** 1 hour

### 🎯 PHASE 5: Goals Screen

- [ ] **Task 5.1: Create Goals Screen UI**
  - Build `GoalsScreen.tsx` with goal selection cards
  - Add primary goal selector (weight loss/gain/maintain/strength)
  - Create target weight/timeline inputs
  - Add goal priority ranking
  - **Priority:** High | **Estimate:** 2 hours

- [ ] **Task 5.2: Create Goal Components**
  - Build `GoalSelector.tsx` with visual goal cards
  - Create `TargetWeightInput.tsx` with validation
  - Add `TimelineSelector.tsx` for realistic timelines
  - Implement `GoalPriorityRanker.tsx`
  - **Priority:** High | **Estimate:** 2.5 hours

- [ ] **Task 5.3: Add Goal Calculation Logic**
  - Calculate recommended calorie deficit/surplus
  - Estimate realistic timeline for goals
  - Add goal difficulty assessment
  - Implement milestone suggestions
  - **Priority:** Medium | **Estimate:** 2 hours

- [ ] **Task 5.4: Create Goal Validation**
  - Validate target weight against current weight
  - Timeline feasibility checking
  - Health guideline compliance
  - Warning for extreme goals
  - **Priority:** High | **Estimate:** 1.5 hours

- [ ] **Task 5.5: Add Motivation & Commitment**
  - "Why" statement for goal motivation
  - Commitment level assessment
  - Success probability calculation
  - Obstacle identification and planning
  - **Priority:** Low | **Estimate:** 1.5 hours

### 🎉 PHASE 6: Completion & Integration

- [ ] **Task 6.1: Create Onboarding Summary Screen**
  - Build `OnboardingSummary.tsx` with data review
  - Add edit capabilities for each section
  - Show personalized recommendations preview
  - Add completion confirmation
  - **Priority:** High | **Estimate:** 2 hours

- [ ] **Task 6.2: Implement Data Submission**
  - Create final data validation
  - Submit all onboarding data to Convex
  - Update user `onboardingCompleted` status
  - Handle submission errors gracefully
  - **Priority:** High | **Estimate:** 1.5 hours

- [ ] **Task 6.3: Add Welcome & Next Steps**
  - Create welcome message with personalization
  - Show next recommended actions
  - Add app tour/tutorial option
  - Implement smooth transition to main app
  - **Priority:** Medium | **Estimate:** 2 hours

- [ ] **Task 6.4: Update Main App Navigation**
  - Modify `RootNavigator` to check onboarding status
  - Add onboarding bypass for existing users
  - Implement onboarding restart option in settings
  - Add analytics tracking for onboarding completion
  - **Priority:** High | **Estimate:** 1.5 hours

---

## 📅 Implementation Timeline

| Week | Phase | Tasks | Focus Area |
|------|-------|-------|------------|
| Week 1 | Foundation | 1.1 - 1.5 | Navigation & Infrastructure |
| Week 2 | Personal Info | 2.1 - 2.4 | Demographics Collection |
| Week 3 | Profile | 3.1 - 3.5 | Fitness Experience & Preferences |
| Week 4 | Measurements | 4.1 - 4.4 | Body Metrics & Composition |
| Week 5 | Goals | 5.1 - 5.5 | Fitness Objectives & Targets |
| Week 6 | Integration | 6.1 - 6.4 | Completion & App Integration |

---

## 🗄️ Database Schema Extension

```typescript
interface UserProfile {
  // Existing fields
  email: string;
  name?: string;
  createdAt?: number;
  
  // New onboarding fields
  onboardingCompleted: boolean;
  
  personalInfo?: {
    age?: number;
    height?: number; // cm
    weight?: number; // kg
    sex?: 'male' | 'female' | 'other';
  };
  
  profile?: {
    experience: 'beginner' | 'intermediate' | 'advanced';
    workoutFrequency?: number; // days per week
    sessionDuration?: number; // minutes
    equipment?: string[];
    workoutTime?: 'morning' | 'afternoon' | 'evening' | 'flexible';
  };
  
  goals?: {
    primary: 'weight_loss' | 'muscle_gain' | 'strength' | 'maintenance';
    targetWeight?: number;
    timeline?: number; // weeks
    motivation?: string;
  };
  
  preferences?: {
    units: 'metric' | 'imperial';
    notifications?: boolean;
    socialSharing?: boolean;
  };
}
```

---

## 🎯 Success Criteria

- [ ] All 4 onboarding screens functional
- [ ] Data persistence across steps
- [ ] Proper validation and error handling
- [ ] Smooth navigation with progress tracking
- [ ] Data submission to Convex backend
- [ ] Main app integration complete
- [ ] TypeScript compilation passes
- [ ] Responsive design on all screen sizes

---

## 📝 Development Notes

**Code Standards:**
- Use TypeScript with strict typing
- Follow existing component patterns
- Use NativeWind for all styling
- Implement loading states for async operations
- Add proper error handling with user feedback

**Testing Focus:**
- Form validation edge cases
- Navigation flow between steps
- Data persistence and recovery
- Unit conversion accuracy
- Error state handling

**Performance Considerations:**
- Lazy load screens for better startup time
- Optimize image uploads for measurements
- Efficient state management across steps
- Minimal re-renders during form input

---

*Last Updated: Current Session | Total Tasks: 27 | Estimated Completion: 6 weeks*