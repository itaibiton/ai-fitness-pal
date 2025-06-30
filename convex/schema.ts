import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table - simple auth
  users: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    passwordHash: v.optional(v.string()),
    
    // Onboarding completion tracking
    onboardingCompleted: v.optional(v.boolean()),
    onboardingStep: v.optional(v.number()), // Current step in onboarding (1-4)
    
    // Personal Information (Step 1)
    personalInfo: v.optional(v.object({
      firstName: v.string(),
      lastName: v.string(),
      age: v.number(),
      gender: v.union(v.literal("male"), v.literal("female"), v.literal("other"), v.literal("prefer_not_to_say")),
      height: v.number(), // in cm or inches based on units
      units: v.union(v.literal("metric"), v.literal("imperial")),
    })),
    
    // Fitness Profile (Step 2)
    fitnessProfile: v.optional(v.object({
      experienceLevel: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced")),
      workoutFrequency: v.union(v.literal("1-2"), v.literal("3-4"), v.literal("5-6"), v.literal("daily")),
      workoutDuration: v.union(v.literal("15-30"), v.literal("30-45"), v.literal("45-60"), v.literal("60+")),
      preferredWorkoutTypes: v.array(v.union(
        v.literal("strength"),
        v.literal("cardio"),
        v.literal("flexibility"),
        v.literal("sports"),
        v.literal("functional"),
        v.literal("bodyweight")
      )),
      availableEquipment: v.array(v.union(
        v.literal("none"),
        v.literal("dumbbells"),
        v.literal("barbell"),
        v.literal("resistance_bands"),
        v.literal("kettlebells"),
        v.literal("pull_up_bar"),
        v.literal("gym_access")
      )),
      workoutLocation: v.union(v.literal("home"), v.literal("gym"), v.literal("outdoor"), v.literal("mixed")),
    })),
    
    // Body Measurements (Step 3)
    measurements: v.optional(v.object({
      weight: v.number(), // in kg or lbs based on units
      bodyFatPercentage: v.optional(v.number()),
      muscleMass: v.optional(v.number()),
      bmi: v.optional(v.number()), // calculated field
      bodyType: v.optional(v.union(v.literal("ectomorph"), v.literal("mesomorph"), v.literal("endomorph"))),
      progressPhotos: v.optional(v.array(v.string())), // URLs to stored photos
      measurements: v.optional(v.object({
        chest: v.optional(v.number()),
        waist: v.optional(v.number()),
        hips: v.optional(v.number()),
        biceps: v.optional(v.number()),
        thighs: v.optional(v.number()),
      })),
    })),
    
    // Fitness Goals (Step 4)
    goals: v.optional(v.object({
      primaryGoal: v.union(
        v.literal("lose_weight"),
        v.literal("gain_muscle"),
        v.literal("improve_endurance"),
        v.literal("increase_strength"),
        v.literal("improve_flexibility"),
        v.literal("maintain_fitness"),
        v.literal("sport_specific"),
        v.literal("general_health")
      ),
      targetWeight: v.optional(v.number()),
      targetTimeframe: v.union(v.literal("1_month"), v.literal("3_months"), v.literal("6_months"), v.literal("1_year"), v.literal("ongoing")),
      motivationLevel: v.number(), // 1-10 scale
      specificTargets: v.optional(v.array(v.string())), // Custom text goals
      weeklyGoals: v.optional(v.object({
        workoutSessions: v.number(),
        targetCalories: v.optional(v.number()),
        stepCount: v.optional(v.number()),
      })),
    })),
    
    // Keep existing preferences for backward compatibility
    preferences: v.optional(v.object({
      units: v.union(v.literal("metric"), v.literal("imperial")),
      fitnessLevel: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced")),
    })),
    
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  }).index("by_email", ["email"]),

  // Sessions table - simple session management
  sessions: defineTable({
    token: v.string(),
    userId: v.id("users"),
    expiresAt: v.number(),
    createdAt: v.number(),
  }).index("by_token", ["token"])
    .index("by_user", ["userId"]),

  // Workout Plans - AI generated or custom workout routines  
  workoutPlans: defineTable({
    userId: v.id("users"),
    name: v.string(),
    description: v.optional(v.string()),
    difficulty: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced")),
    duration: v.number(), // Duration in minutes
    exercises: v.array(v.object({
      name: v.string(),
      sets: v.number(),
      reps: v.union(v.number(), v.string()), // Can be number or "10-12" range
      weight: v.optional(v.number()),
      duration: v.optional(v.number()), // For time-based exercises
      restTime: v.optional(v.number()), // Rest between sets in seconds
      notes: v.optional(v.string()),
    })),
    tags: v.optional(v.array(v.string())), // e.g., ["strength", "cardio", "upper-body"]
    isAIGenerated: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  // Workout Sessions - Individual workout instances/logs
  workouts: defineTable({
    userId: v.id("users"),
    planId: v.optional(v.id("workoutPlans")), // Reference to plan if following one
    name: v.string(),
    date: v.number(), // Timestamp of when workout was performed
    duration: v.optional(v.number()), // Actual duration in minutes
    exercises: v.array(v.object({
      name: v.string(),
      sets: v.array(v.object({
        reps: v.number(),
        weight: v.optional(v.number()),
        duration: v.optional(v.number()), // For time-based exercises like planks
        completed: v.boolean(),
        notes: v.optional(v.string()),
      }))
    })),
    notes: v.optional(v.string()),
    rating: v.optional(v.number()), // 1-5 workout difficulty/satisfaction rating
    createdAt: v.number(),
  }).index("by_user", ["userId"])
    .index("by_user_and_date", ["userId", "date"]),
});