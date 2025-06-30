import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Create session
export const create = mutation({
  args: {
    token: v.string(),
    userId: v.id("users"),
    expiresAt: v.number(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("sessions", {
      token: args.token,
      userId: args.userId,
      expiresAt: args.expiresAt,
      createdAt: args.createdAt,
    });
  },
});