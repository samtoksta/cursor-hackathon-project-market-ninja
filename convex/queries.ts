import { query } from "./_generated/server";
import { v } from "convex/values";

export const getAnalysis = query({
  args: {
    analysisId: v.id("analysis"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.analysisId);
  },
});

export const getVideos = query({
  args: {
    analysisId: v.id("analysis"),
  },
  handler: async (ctx, args) => {
    const videos = await ctx.db
      .query("videos")
      .withIndex("by_analysis", (q) => q.eq("analysisId", args.analysisId))
      .collect();
    
    // Sort by view count descending
    return videos.sort((a, b) => b.viewCount - a.viewCount);
  },
});

