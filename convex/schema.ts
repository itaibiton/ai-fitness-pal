import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table - simple auth
  users: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    passwordHash: v.optional(v.string()),
    // Store additional user preferences here
    preferences: v.optional(v.object({
      units: v.union(v.literal("metric"), v.literal("imperial")),
      fitnessLevel: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced")),
    })),
    createdAt: v.optional(v.number()),
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