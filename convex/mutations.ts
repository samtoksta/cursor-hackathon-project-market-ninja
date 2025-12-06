import { mutation, internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const createAnalysis = mutation({
  args: {
    companyUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const analysisId = await ctx.db.insert("analysis", {
      companyUrl: args.companyUrl,
      keywords: [],
      status: "processing",
      createdAt: Date.now(),
    });
    return analysisId;
  },
});

export const updateAnalysis = internalMutation({
  args: {
    analysisId: v.id("analysis"),
    keywords: v.array(v.string()),
    companyName: v.optional(v.string()),
    companyDescription: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.analysisId, {
      keywords: args.keywords,
      companyName: args.companyName,
      companyDescription: args.companyDescription,
    });
  },
});

export const updateAnalysisStatus = internalMutation({
  args: {
    analysisId: v.id("analysis"),
    status: v.string(),
    errorMessage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.analysisId, {
      status: args.status,
      errorMessage: args.errorMessage,
    });
  },
});

export const saveVideos = internalMutation({
  args: {
    analysisId: v.id("analysis"),
    videos: v.array(
      v.object({
        videoId: v.string(),
        title: v.string(),
        channelName: v.string(),
        thumbnailUrl: v.string(),
        viewCount: v.number(),
        publishedTime: v.string(),
        videoLength: v.optional(v.string()),
        videoUrl: v.string(),
        isRelevant: v.boolean(),
      })
    ),
  },
  handler: async (ctx, args) => {
    for (const video of args.videos) {
      await ctx.db.insert("videos", {
        analysisId: args.analysisId,
        ...video,
      });
    }
  },
});

export const saveInsights = internalMutation({
  args: {
    analysisId: v.id("analysis"),
    youtubeKeywords: v.array(v.string()),
    contentIdeas: v.array(
      v.object({
        title: v.string(),
        description: v.string(),
        keywords: v.array(v.string()),
        targetAudience: v.string(),
      })
    ),
    saasTools: v.array(v.string()),
    topCreators: v.array(
      v.object({
        channelName: v.string(),
        videoCount: v.number(),
        totalViews: v.number(),
        avgViews: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.analysisId, {
      youtubeKeywords: args.youtubeKeywords,
      contentIdeas: args.contentIdeas,
      saasTools: args.saasTools,
      topCreators: args.topCreators,
    });
  },
});

