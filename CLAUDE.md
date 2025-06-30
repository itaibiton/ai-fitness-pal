# AI Fitness Pal - Claude Development Guide

## 🎯 Project Overview

**AI Fitness Pal** is a comprehensive React Native fitness application that combines modern mobile development with AI-powered features to create an exceptional user experience. Think **Hevy meets AI** - a powerful workout tracking app with intelligent planning and personalized recommendations.

### Tech Stack
- **Frontend**: React Native with Expo
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Backend**: Convex (Real-time database with TypeScript)
- **Authentication**: Custom Convex Auth with bcrypt
- **Language**: TypeScript throughout
- **Navigation**: React Navigation v6

---

## ✅ Completed Foundation (Current State)

We've successfully built a solid foundation with all core systems in place:

### 🏗️ App Infrastructure
- ✅ **React Native + Expo** setup with proper configuration
- ✅ **NativeWind styling** system fully integrated
- ✅ **TypeScript** configuration with strict type checking
- ✅ **Navigation system** with AuthStack and AppStack
- ✅ **Component architecture** with reusable UI components

### 🔐 Authentication System
- ✅ **Complete auth flow**: Signup, Signin, Signout
- ✅ **Secure password hashing** with bcrypt (using Convex Actions)
- ✅ **Session management** with AsyncStorage
- ✅ **Success UI animations** with smooth transitions
- ✅ **Automatic redirection** between auth and authenticated states
- ✅ **Error handling** with user-friendly alerts

### 🗄️ Database & Backend
- ✅ **Convex backend** with real-time capabilities
- ✅ **Database schema** for users, sessions, and future fitness data
- ✅ **Type-safe queries** and mutations
- ✅ **Optional field handling** for flexible user data

### 🎨 UI/UX Components
- ✅ **AuthInput** component with proper styling
- ✅ **AuthButton** component with loading states
- ✅ **SuccessMessage** component with animations
- ✅ **Responsive design** with TailwindCSS classes
- ✅ **Loading states** throughout the app
- ✅ **Success UI animations** with smooth transitions
- ✅ **Authentication redirect fixes** - no more login page returns
- ✅ **Debug logging** for authentication state tracking

---

## 🚀 Future Vision & Roadmap

### Phase 1: Onboarding Process (Current Task)
**Goal**: Collect user data for personalized experience

**Features to Build**:
- 📏 **Body Measurements**
  - Height, weight, age
  - Body composition goals
  - Current fitness level assessment

- 🎯 **Fitness Goals**
  - Primary goal (weight loss, muscle gain, maintenance, strength)
  - Target timeline
  - Specific targets (target weight, muscle gain amount)

- ⚙️ **Preferences Setup**
  - Units (metric/imperial)
  - Workout frequency preferences
  - Available equipment
  - Preferred workout duration
  - Fitness experience level (beginner/intermediate/advanced)

- 🏁 **Onboarding Flow**
  - Multi-step wizard with progress indicator
  - Skip options for optional fields
  - Data validation and error handling
  - Smooth animations between steps

### Phase 2: Live Workout App (Hevy-Style)
**Goal**: Create the best workout tracking experience

**Features to Build**:
- 🏋️ **Exercise Database**
  - Comprehensive exercise library with categories
  - Custom exercise creation
  - Exercise instructions and form tips
  - Muscle group targeting

- 💪 **Live Workout Interface**
  - Start/pause/finish workout sessions
  - Rest timer with customizable intervals
  - Weight/reps/sets tracking
  - RPE (Rate of Perceived Exertion) logging
  - Progress photos integration

- 🎬 **Exercise Animations**
  - 3D exercise demonstrations
  - Form correction guidance
  - Proper breathing techniques
  - Common mistakes highlighting

- 📊 **Workout Analytics**
  - Real-time performance metrics
  - Volume progression tracking
  - Personal records detection
  - Workout duration and intensity

### Phase 3: AI Workout Planner
**Goal**: Intelligent, personalized workout programming

**Features to Build**:
- 🤖 **AI-Generated Programs**
  - Personalized workout plans based on goals
  - Progressive overload algorithms
  - Deload week planning
  - Exercise variation suggestions

- 📈 **Adaptive Programming**
  - Performance-based adjustments
  - Recovery monitoring integration
  - Plateau detection and solutions
  - Injury prevention algorithms

- 🎯 **Specialized Programs**
  - Strength training (5/3/1, Starting Strength, etc.)
  - Hypertrophy focus programs
  - Athletic performance training
  - Rehabilitation protocols

### Phase 4: Diet Planner & Nutrition
**Goal**: Complete nutrition tracking and meal planning

**Features to Build**:
- 🍎 **Nutrition Tracking**
  - Calorie and macro counting
  - Food database with barcode scanning
  - Meal planning and prep
  - Hydration tracking

- 🥗 **AI Meal Planning**
  - Personalized meal suggestions
  - Dietary restriction handling
  - Shopping list generation
  - Recipe recommendations

- 📊 **Nutrition Analytics**
  - Micronutrient tracking
  - Progress correlation with workouts
  - Body composition changes
  - Energy level monitoring

### Phase 5: Advanced Features
**Goal**: Premium fitness coaching experience

**Features to Build**:
- 📈 **Advanced Analytics**
  - Body composition tracking
  - Performance prediction models
  - Long-term trend analysis
  - Goal achievement probability

- 🏆 **Gamification**
  - Achievement system
  - Streak tracking
  - Social challenges
  - Progress sharing

- 👥 **Community Features**
  - Workout sharing
  - Form check videos
  - Progress celebrations
  - Expert coaching integration

---

## 🎯 Current Goals & Objectives

### **Primary Goal: Complete Onboarding Foundation (Phase 1)**
**Timeline:** Week 1 | **Priority:** High | **Tasks:** 5

#### **Phase 1 Objectives:**
1. ✅ Create navigation infrastructure for 4-step onboarding wizard
2. ✅ Build reusable wizard container with progress tracking
3. ✅ Implement step-by-step flow with data persistence
4. ✅ Update database schema for onboarding data
5. ✅ Create state management system for form data

#### **Success Criteria:**
- [ ] Functional navigation between onboarding steps
- [ ] Progress indicator showing current step
- [ ] Data persistence across navigation
- [ ] TypeScript compilation passes
- [ ] Foundation ready for content screens

---

## 🚧 Current Task: Onboarding Process Implementation

### **Complete Task Breakdown (27 Tasks | 6 Phases | 6 Weeks)**

> 📋 **Detailed task list available in:** `ONBOARDING_NOTION.md`

#### **Phase 1: Foundation & Navigation** (Week 1 - 5 tasks)
- [ ] **Task 1.1:** Create OnboardingStack navigation with 4 screens
- [ ] **Task 1.2:** Design OnboardingWizard container component  
- [ ] **Task 1.3:** Create ProgressIndicator with step visualization
- [ ] **Task 1.4:** Update database schema with onboarding fields
- [ ] **Task 1.5:** Implement useOnboarding hook for state management

#### **Phase 2: Personal Info Screen** (Week 2 - 4 tasks)
- Personal details collection (name, age, gender, height)
- Units system (metric/imperial)
- Input validation and accessibility

#### **Phase 3: Profile Screen** (Week 3 - 5 tasks)  
- Fitness experience level assessment
- Workout preferences and frequency
- Available equipment selection

#### **Phase 4: Measurements Screen** (Week 4 - 4 tasks)
- Current weight and body composition
- BMI calculation and health guidelines  
- Optional progress photos

#### **Phase 5: Goals Screen** (Week 5 - 5 tasks)
- Primary fitness goal selection
- Target setting and timeline planning
- Motivation and commitment assessment

#### **Phase 6: Completion & Integration** (Week 6 - 4 tasks)
- Summary and review screen
- Data submission to backend
- Main app integration and routing

### **Database Schema Extension**

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

### **Implementation Timeline**

| Week | Phase | Focus | Deliverables |
|------|-------|-------|--------------|
| **Week 1** | Foundation | Navigation & Infrastructure | OnboardingStack, Wizard, Progress, Schema, State |
| **Week 2** | Personal Info | Demographics Collection | Name, Age, Gender, Height, Units |
| **Week 3** | Profile | Fitness Assessment | Experience, Frequency, Equipment, Preferences |
| **Week 4** | Measurements | Body Metrics | Weight, BMI, Body Composition, Photos |
| **Week 5** | Goals | Objective Setting | Goal Selection, Targets, Timeline, Motivation |
| **Week 6** | Integration | Completion Flow | Summary, Submission, Welcome, App Routing |

---

## 🏗️ Technical Architecture

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── AuthButton.tsx
│   ├── AuthInput.tsx
│   └── SuccessMessage.tsx
├── screens/             # Screen components
│   ├── LoginScreen.tsx
│   ├── SignupScreen.tsx
│   └── HomeScreen.tsx
├── navigation/          # Navigation configuration
│   ├── RootNavigator.tsx
│   ├── AuthStack.tsx
│   └── AppStack.tsx
├── hooks/              # Custom React hooks
│   └── useAuth.ts
└── types/              # TypeScript type definitions
    └── index.ts

convex/
├── schema.ts           # Database schema
├── auth.ts            # Authentication functions
├── users.ts           # User management
└── sessions.ts        # Session handling
```

### Key Patterns
- **Component Composition**: Reusable, single-responsibility components
- **Custom Hooks**: Business logic abstraction (useAuth, future: useWorkout, useDiet)
- **Type Safety**: Comprehensive TypeScript coverage
- **Real-time Data**: Convex queries for live updates
- **Responsive Design**: NativeWind for consistent styling

---

## 🔧 Development Commands

### Essential Commands
```bash
# Start development
npm start

# Clear cache and restart
npx expo start --clear

# TypeScript check
npx tsc --noEmit

# Deploy Convex
npx convex deploy

# Generate Convex types
npx convex dev
```

### Environment Setup
```bash
# Install dependencies
npm install

# Set up Convex
npx convex dev

# Configure environment variables in Convex dashboard:
# - JWT_PRIVATE_KEY
# - SITE_URL
```

---

## 🧠 Development Notes for Claude

### Current Working State
- ✅ **Authentication fully functional** with success UI and smooth transitions
- ✅ **Database schema** supports current features with optional fields
- ✅ **TypeScript compilation** passes without circular dependency issues
- ✅ **Success UI animations** working perfectly with auto-redirect
- ✅ **Authentication redirect bug** fixed - no more login page returns
- ✅ **Onboarding task breakdown** completed with 27 detailed tasks
- ✅ **Notion-ready documentation** created for project management

### Progress Tracking
- **Foundation Phase:** Authentication ✅ | Success UI ✅ | Planning ✅
- **Current Phase:** Onboarding Foundation (Phase 1) - 5 tasks pending
- **Next Milestone:** Complete Phase 1 by end of Week 1

### Debugging Helpers
- Console logging in useAuth for authentication state tracking
- Success/error UI provides clear user feedback
- Convex dashboard for real-time database inspection
- ONBOARDING_NOTION.md for detailed task tracking

### Immediate Next Session Goals
1. **Start Phase 1:** Create OnboardingStack navigation (Task 1.1)
2. **Build Foundation:** OnboardingWizard container component (Task 1.2)
3. **Add Progress UI:** ProgressIndicator component (Task 1.3)
4. **Extend Schema:** Add onboarding fields to database (Task 1.4)
5. **State Management:** Implement useOnboarding hook (Task 1.5)

### Code Quality Standards
- Always use TypeScript with strict typing
- Follow existing component patterns established in auth screens
- Use NativeWind for all styling (consistent with current UI)
- Implement loading states for async operations
- Add proper error handling with user feedback
- Reference ONBOARDING_NOTION.md for detailed task specifications

### Task Management
- Use todo list to track Phase 1 progress
- Mark tasks complete as they're finished
- Reference database schema extension for implementation
- Follow 6-week timeline for full onboarding completion

### Key Files for Onboarding
- `ONBOARDING_NOTION.md` - Complete task breakdown and specifications
- `CLAUDE.md` - This file for development guidance and current status
- `src/navigation/OnboardingStack.tsx` - To be created (Task 1.1)
- `convex/schema.ts` - To be extended (Task 1.4)

---

*This document is maintained by Claude AI assistant and updated as development progresses. Last updated: Current session.*