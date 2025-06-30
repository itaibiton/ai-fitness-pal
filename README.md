# AI Fitness Pal

A modern React Native fitness app built with Expo, Convex, and AI-powered features.

## 🚀 Features

- **Authentication**: Secure email/password authentication with Convex Auth
- **Modern UI**: Beautiful, responsive design with NativeWind (Tailwind CSS)
- **Type Safety**: Full TypeScript support throughout the app
- **Scalable Architecture**: Clean, organized codebase ready for expansion

### Coming Soon
- Workout logging and tracking
- AI-generated workout plans
- Progress analytics
- Social features

## 🛠 Tech Stack

- **Frontend**: React Native + Expo
- **Backend**: Convex (database, auth, real-time functions)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: React Navigation v6
- **Language**: TypeScript

## 📱 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Convex backend:
   ```bash
   npx convex dev
   ```
   Follow the prompts to create a new Convex project.

4. Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Update `.env.local` with your Convex deployment URL.

5. Start the development server:
   ```bash
   npm start
   ```

## 🏗 Project Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # Screen components
├── navigation/     # Navigation setup
├── hooks/          # Custom hooks (auth, convex)
├── types/          # TypeScript type definitions
└── utils/          # Helper utilities

convex/
├── schema.ts       # Database schema
├── users.ts        # User-related functions
└── auth.config.ts  # Authentication configuration
```

## 🎨 Design System

The app uses a consistent design system built with NativeWind:
- Color palette: Blue primary with gray accents
- Typography: System fonts with clear hierarchy
- Spacing: Consistent padding and margins
- Components: Reusable, accessible UI elements

## 🔒 Authentication Flow

1. **Login/Signup**: Email and password authentication
2. **User Creation**: Automatic user profile creation in Convex
3. **Protected Routes**: Conditional navigation based on auth state
4. **Session Management**: Persistent login state

## 📊 Database Schema

### Users
- Email, name, preferences
- Fitness level and unit preferences

### Workout Plans
- AI-generated and custom workout routines
- Exercise details, difficulty, tags

### Workouts
- Individual workout sessions and logs
- Exercise tracking, sets, reps, weights

## 🚀 Deployment

1. **Deploy Convex backend**:
   ```bash
   npx convex deploy
   ```

2. **Build for production**:
   ```bash
   npm run build
   ```

3. **Deploy to app stores** using EAS Build or your preferred method

## 🤝 Contributing

This is a foundational implementation ready for feature expansion. Key areas for development:
- Workout logging interface
- AI workout plan generation
- Progress tracking and analytics
- Social features and sharing

## 📄 License

MIT License - feel free to use this as a foundation for your own fitness app!