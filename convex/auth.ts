import { mutation, query, action } from "./_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";
import { api } from "./_generated/api";

// Generate a simple session token
function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Hash password
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// Verify password
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

// Sign up action
export const signUp = action({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<{ sessionToken: string; userId: any }> => {
    // Check if user already exists
    const existingUser = await ctx.runQuery(api.users.getUserByEmail, { email: args.email });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Hash password
    const hashedPassword = await hashPassword(args.password);

    // Create user directly
    const userId: any = await ctx.runMutation(api.users.createUser, {
      email: args.email,
      name: args.name,
      passwordHash: hashedPassword,
    });

    // Create session
    const sessionToken = generateSessionToken();
    const expiresAt = Date.now() + (7 * 24 * 60 * 60 * 1000); // 7 days

    await ctx.runMutation(api.sessions.create, {
      token: sessionToken,
      userId,
      expiresAt,
      createdAt: Date.now(),
    });

    return { sessionToken, userId };
  },
});

// Sign in action
export const signIn = action({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args): Promise<{ sessionToken: string; userId: any }> => {
    // Find user
    const user: any = await ctx.runQuery(api.users.getUserByEmail, { email: args.email });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Verify password
    if (!user.passwordHash) {
      throw new Error("Invalid email or password");
    }
    const isValidPassword = await verifyPassword(args.password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error("Invalid email or password");
    }

    // Create session
    const sessionToken = generateSessionToken();
    const expiresAt = Date.now() + (7 * 24 * 60 * 60 * 1000); // 7 days

    const sessionId = await ctx.runMutation(api.sessions.create, {
      token: sessionToken,
      userId: user._id,
      expiresAt,
      createdAt: Date.now(),
    });

    return { sessionToken, userId: user._id };
  },
});

// Sign out mutation
export const signOut = mutation({
  args: {
    sessionToken: v.string(),
  },
  handler: async (ctx, args) => {
    // Find and delete session
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.sessionToken))
      .unique();

    if (session) {
      await ctx.db.delete(session._id);
    }

    return { success: true };
  },
});

// Get current user query
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
    if (!user) {
      return null;
    }

    // Return user without password hash
    if (user.passwordHash) {
      const { passwordHash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return user;
  },
});

