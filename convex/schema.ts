import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  analysis: defineTable({
    companyUrl: v.string(),
    companyName: v.optional(v.string()),
    companyDescription: v.optional(v.string()),
    keywords: v.array(v.string()),
    status: v.string(), // "processing", "completed", "failed"
    errorMessage: v.optional(v.string()),
    createdAt: v.number(),
    // Campaign insights
    youtubeKeywords: v.optional(v.array(v.string())),
    contentIdeas: v.optional(
      v.array(
        v.object({
          title: v.string(),
          description: v.string(),
          keywords: v.array(v.string()),
          targetAudience: v.string(),
        })
      )
    ),
    saasTools: v.optional(v.array(v.string())),
    topCreators: v.optional(
      v.array(
        v.object({
          channelName: v.string(),
          videoCount: v.number(),
          totalViews: v.number(),
          avgViews: v.number(),
        })
      )
    ),
  }),

  videos: defineTable({
    analysisId: v.id("analysis"),
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
    .index("by_analysis", ["analysisId"])
    .index("by_views", ["analysisId", "viewCount"]),
});

