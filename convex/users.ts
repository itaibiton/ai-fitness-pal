import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get user by email
export const getUserByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
  },
});

// Get current user profile (requires authentication context)
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    // This will be used with Convex auth context
    // For now, we'll need the hook to pass sessionToken
    return null; // Will be implemented with proper auth context
  },
});

// Get current user by session token
export const getCurrentUserBySession = query({
  args: {
    sessionToken: v.string(),
  },
  handler: async (ctx, args) => {
    // Find session
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.sessionToken))
      .unique();

    if (!session || session.expiresAt < Date.now()) {
      return null;
    }

    // Get user
    const user = await ctx.db.get(session.userId);
    return user;
  },
});

// Create or update user profile
export const createOrUpdateUser = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    sessionToken: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.sessionToken) {
      // Check if authenticated via session
      const session = await ctx.db
        .query("sessions")
        .withIndex("by_token", (q) => q.eq("token", args.sessionToken!))
        .unique();
      
      if (!session || session.expiresAt < Date.now()) {
        throw new Error("Not authenticated");
      }
    }

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (existingUser) {
      // Update existing user and ensure createdAt is set
      await ctx.db.patch(existingUser._id, {
        name: args.name,
        createdAt: existingUser.createdAt || Date.now(), // Set createdAt if not already set
      });
      return existingUser._id;
    } else {
      // Create new user (for OAuth/social auth without password)
      const userDbId = await ctx.db.insert("users", {
        email: args.email,
        name: args.name,
        createdAt: Date.now(),
      });
      return userDbId;
    }
  },
});

// Create user
export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    passwordHash: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      passwordHash: args.passwordHash,
      createdAt: Date.now(),
    });
  },
});

// Update user preferences
export const updateUserPreferences = mutation({
  args: {
    sessionToken: v.string(),
    preferences: v.object({
      units: v.union(v.literal("metric"), v.literal("imperial")),
      fitnessLevel: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced")),
    }),
  },
  handler: async (ctx, args) => {
    // Check if authenticated via session
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.sessionToken))
      .unique();
    
    if (!session || session.expiresAt < Date.now()) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db.get(session.userId);
    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      preferences: args.preferences,
    });
  },
});

// Onboarding mutations
const getAuthenticatedUser = async (ctx: any, sessionToken: string) => {
  const session = await ctx.db
    .query("sessions")
    .withIndex("by_token", (q: any) => q.eq("token", sessionToken))
    .unique();
  
  if (!session || session.expiresAt < Date.now()) {
    throw new Error("Not authenticated");
  }

  const user = await ctx.db.get(session.userId);
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// Update onboarding step
export const updateOnboardingStep = mutation({
  args: {
    sessionToken: v.string(),
    step: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx, args.sessionToken);
    
    await ctx.db.patch(user._id, {
      onboardingStep: args.step,
      updatedAt: Date.now(),
    });
  },
});

// Update personal information (Step 1)
export const updatePersonalInfo = mutation({
  args: {
    sessionToken: v.string(),
    personalInfo: v.object({
      firstName: v.string(),
      lastName: v.string(),
      age: v.number(),
      gender: v.union(v.literal("male"), v.literal("female"), v.literal("other"), v.literal("prefer_not_to_say")),
      height: v.number(),
      units: v.union(v.literal("metric"), v.literal("imperial")),
    }),
  },
  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx, args.sessionToken);
    
    await ctx.db.patch(user._id, {
      personalInfo: args.personalInfo,
      updatedAt: Date.now(),
    });
  },
});

// Update fitness profile (Step 2)
export const updateFitnessProfile = mutation({
  args: {
    sessionToken: v.string(),
    fitnessProfile: v.object({
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
    }),
  },
  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx, args.sessionToken);
    
    await ctx.db.patch(user._id, {
      fitnessProfile: args.fitnessProfile,
      updatedAt: Date.now(),
    });
  },
});

// Update measurements (Step 3)
export const updateMeasurements = mutation({
  args: {
    sessionToken: v.string(),
    measurements: v.object({
      weight: v.number(),
      bodyFatPercentage: v.optional(v.number()),
      muscleMass: v.optional(v.number()),
      bmi: v.optional(v.number()),
      bodyType: v.optional(v.union(v.literal("ectomorph"), v.literal("mesomorph"), v.literal("endomorph"))),
      progressPhotos: v.optional(v.array(v.string())),
      measurements: v.optional(v.object({
        chest: v.optional(v.number()),
        waist: v.optional(v.number()),
        hips: v.optional(v.number()),
        biceps: v.optional(v.number()),
        thighs: v.optional(v.number()),
      })),
    }),
  },
  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx, args.sessionToken);
    
    await ctx.db.patch(user._id, {
      measurements: args.measurements,
      updatedAt: Date.now(),
    });
  },
});

// Update goals (Step 4)
export const updateGoals = mutation({
  args: {
    sessionToken: v.string(),
    goals: v.object({
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
      motivationLevel: v.number(),
      specificTargets: v.optional(v.array(v.string())),
      weeklyGoals: v.optional(v.object({
        workoutSessions: v.number(),
        targetCalories: v.optional(v.number()),
        stepCount: v.optional(v.number()),
      })),
    }),
  },
  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx, args.sessionToken);
    
    await ctx.db.patch(user._id, {
      goals: args.goals,
      updatedAt: Date.now(),
    });
  },
});

// Complete onboarding
export const completeOnboarding = mutation({
  args: {
    sessionToken: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx, args.sessionToken);
    
    await ctx.db.patch(user._id, {
      onboardingCompleted: true,
      onboardingStep: 4,
      updatedAt: Date.now(),
    });
  },
});