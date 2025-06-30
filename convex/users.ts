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

// Get current user profile
export const getCurrentUser = query({
  args: {
    sessionToken: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args.sessionToken) {
      return null;
    }

    // Find session
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.sessionToken!))
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