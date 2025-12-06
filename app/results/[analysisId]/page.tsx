"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { Id } from "../../../convex/_generated/dataModel";
import { useState } from "react";

type TabType = "videos" | "keywords" | "content-ideas";

export default function Results() {
  const params = useParams();
  const router = useRouter();
  const analysisId = params.analysisId as Id<"analysis">;
  const [activeTab, setActiveTab] = useState<TabType>("videos");

  const analysis = useQuery(api.queries.getAnalysis, { analysisId });
  const videos = useQuery(api.queries.getVideos, { analysisId });

  if (!analysis || !videos) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)'
        }}
      >
        <div 
          className="rounded-full"
          style={{
            width: '48px',
            height: '48px',
            border: '3px solid rgba(99, 102, 241, 0.3)',
            borderTopColor: '#6366f1',
            animation: 'spin 0.6s linear infinite'
          }}
        ></div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-12 px-4"
      style={{
        background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          className="bg-white rounded-3xl p-8 mb-8"
          style={{
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <button
            onClick={() => router.push("/")}
            className="mb-4 flex items-center text-sm font-semibold transition-all duration-200"
            style={{ color: '#6366f1' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#4f46e5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#6366f1';
            }}
          >
            ← 🥷 New Analysis
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            ✨ {analysis.companyName || "Analysis Results"}
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            {analysis.companyDescription || analysis.companyUrl}
          </p>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">
              🔑 Search Keywords Used:
            </p>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.map((keyword, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    background: 'rgba(99, 102, 241, 0.1)',
                    color: '#4f46e5',
                    border: '1px solid rgba(99, 102, 241, 0.2)'
                  }}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div 
          className="bg-white rounded-3xl mb-8 overflow-hidden"
          style={{
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="border-b" style={{ borderColor: '#e5e7eb' }}>
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("videos")}
                className={`py-4 px-8 text-sm font-semibold border-b-2 transition-all duration-300 ${
                  activeTab === "videos"
                    ? ""
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                style={activeTab === "videos" ? {
                  borderColor: '#6366f1',
                  color: '#6366f1'
                } : {}}
              >
                📹 Top Videos ({videos.length})
              </button>
              <button
                onClick={() => setActiveTab("keywords")}
                className={`py-4 px-8 text-sm font-semibold border-b-2 transition-all duration-300 ${
                  activeTab === "keywords"
                    ? ""
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                style={activeTab === "keywords" ? {
                  borderColor: '#6366f1',
                  color: '#6366f1'
                } : {}}
              >
                🔑 Keywords & Tools
              </button>
              <button
                onClick={() => setActiveTab("content-ideas")}
                className={`py-4 px-8 text-sm font-semibold border-b-2 transition-all duration-300 ${
                  activeTab === "content-ideas"
                    ? ""
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                style={activeTab === "content-ideas" ? {
                  borderColor: '#6366f1',
                  color: '#6366f1'
                } : {}}
              >
                💡 Content Ideas
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Videos Tab */}
            {activeTab === "videos" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Top Performing Videos
                  </h2>
                  <p className="text-gray-600">
                    Most viewed videos from the last 12 months
                  </p>
                </div>

                {videos.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📹</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No videos found
                    </h3>
                    <p className="text-gray-600">
                      We couldn&apos;t find any relevant videos for this niche.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video) => (
                      <a
                        key={video._id}
                        href={video.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
                        style={{
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                          border: '1px solid #e5e7eb'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.12)';
                          e.currentTarget.style.borderColor = '#6366f1';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                          e.currentTarget.style.borderColor = '#e5e7eb';
                        }}
                      >
                        <div className="relative pb-[56.25%] bg-gray-200">
                          <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          {video.videoLength && (
                            <div 
                              className="absolute bottom-2 right-2 text-white text-xs px-2 py-1 rounded font-semibold"
                              style={{
                                background: 'rgba(0, 0, 0, 0.8)',
                                backdropFilter: 'blur(4px)'
                              }}
                            >
                              ⏱ {video.videoLength}
                            </div>
                          )}
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 flex-1">
                            {video.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 flex items-center">
                            👤 {video.channelName}
                          </p>
                          <div 
                            className="flex justify-between items-center text-sm text-gray-600 pt-3"
                            style={{ borderTop: '1px solid #f3f4f6' }}
                          >
                            <span className="flex items-center font-medium">
                              👁 {video.viewCount.toLocaleString()}
                            </span>
                            <span className="text-gray-500">{video.publishedTime}</span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Keywords Tab */}
            {activeTab === "keywords" && (
              <div className="space-y-8">
                {/* YouTube Keywords */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    YouTube Keywords
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Top keywords to target for your video campaigns
                  </p>
                  {analysis.youtubeKeywords && analysis.youtubeKeywords.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {analysis.youtubeKeywords.map((keyword, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 rounded-lg text-sm font-medium"
                          style={{
                            background: 'rgba(139, 92, 246, 0.1)',
                            color: '#7c3aed',
                            border: '1px solid rgba(139, 92, 246, 0.2)'
                          }}
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">⚡ Generating keywords...</p>
                  )}
                </div>

                {/* SaaS Tools */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    SaaS Tools Discussed
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Products and tools mentioned in top videos
                  </p>
                  {analysis.saasTools && analysis.saasTools.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {analysis.saasTools.map((tool, i) => (
                        <div
                          key={i}
                          className="rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200"
                          style={{
                            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))',
                            border: '2px solid rgba(99, 102, 241, 0.2)',
                            color: '#4f46e5'
                          }}
                        >
                          {tool}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">⚡ Extracting tools from videos...</p>
                  )}
                </div>

                {/* Top Creators */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Top Creators in Niche
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Most influential creators based on views and content
                  </p>
                  {analysis.topCreators && analysis.topCreators.length > 0 ? (
                    <div className="space-y-3">
                      {analysis.topCreators.map((creator, i) => (
                        <div
                          key={i}
                          className="bg-white rounded-2xl p-5 flex items-center justify-between transition-all duration-200"
                          style={{
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                            border: '1px solid #e5e7eb'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.15)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                          }}
                        >
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">
                              👤 {creator.channelName}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              📹 {creator.videoCount} video{creator.videoCount !== 1 ? "s" : ""} in results
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold" style={{ color: '#6366f1' }}>
                              {creator.totalViews.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500 font-medium">total views</p>
                            <p className="text-xs text-gray-600 font-medium">
                              {creator.avgViews.toLocaleString()} avg
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">⚡ Calculating top creators...</p>
                  )}
                </div>
              </div>
            )}

            {/* Content Ideas Tab */}
            {activeTab === "content-ideas" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Video Content Ideas
                  </h2>
                  <p className="text-gray-600">
                    Strategic content ideas for your video campaigns
                  </p>
                </div>

                {analysis.contentIdeas && analysis.contentIdeas.length > 0 ? (
                  <div className="space-y-6">
                    {analysis.contentIdeas.map((idea, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-2xl p-6 transition-all duration-200"
                        style={{
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                          border: '1px solid #e5e7eb',
                          borderLeft: '4px solid #6366f1'
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-bold text-gray-900 flex-1">
                            💡 {i + 1}. {idea.title}
                          </h3>
                        </div>
                        <p className="text-gray-700 mb-5 leading-relaxed">{idea.description}</p>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-700 mb-2">
                              🔑 Keywords:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {idea.keywords.map((kw, j) => (
                                <span
                                  key={j}
                                  className="px-3 py-1 rounded-lg text-xs font-medium"
                                  style={{
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    color: '#059669'
                                  }}
                                >
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-700 mb-1">
                              🎯 Target Audience:
                            </p>
                            <p className="text-sm text-gray-600">
                              {idea.targetAudience}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">⚡ Generating content ideas...</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
