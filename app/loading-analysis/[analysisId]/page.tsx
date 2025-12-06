"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Id } from "../../../convex/_generated/dataModel";

export default function LoadingAnalysis() {
  const params = useParams();
  const router = useRouter();
  const analysisId = params.analysisId as Id<"analysis">;

  const analysis = useQuery(api.queries.getAnalysis, { analysisId });

  useEffect(() => {
    if (analysis?.status === "completed") {
      router.push(`/results/${analysisId}`);
    }
  }, [analysis?.status, analysisId, router]);

  if (analysis?.status === "failed") {
    return (
      <div 
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)'
        }}
      >
        <div className="text-center max-w-md bg-white rounded-3xl p-8 shadow-lg"
          style={{
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
          }}
        >
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4"
            style={{ color: '#ef4444' }}
          >
            Analysis Failed
          </h1>
          <p className="text-gray-600 mb-6">{analysis.errorMessage}</p>
          <button
            onClick={() => router.push("/")}
            className="text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)'
      }}
    >
      <div className="text-center max-w-md">
        {/* Animated Spinner */}
        <div className="relative mb-8">
          <div 
            className="mx-auto rounded-full"
            style={{
              width: '80px',
              height: '80px',
              border: '4px solid rgba(99, 102, 241, 0.2)',
              borderTopColor: '#6366f1',
              animation: 'spin 0.8s linear infinite'
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl">🥷</div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          ⚡ Analyzing Your Niche
        </h1>
        
        <div 
          className="bg-white rounded-2xl p-6 mb-6"
          style={{
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
          }}
        >
          <div className="space-y-3 text-gray-700 text-left">
            <p className="flex items-center">
              <span 
                className="inline-block w-2 h-2 rounded-full mr-3 animate-pulse"
                style={{ backgroundColor: '#6366f1' }}
              ></span>
              🔍 Scraping website content
            </p>
            <p className="flex items-center">
              <span 
                className="inline-block w-2 h-2 rounded-full mr-3 animate-pulse"
                style={{ backgroundColor: '#6366f1' }}
              ></span>
              🔑 Generating search keywords
            </p>
            <p className="flex items-center">
              <span 
                className="inline-block w-2 h-2 rounded-full mr-3 animate-pulse"
                style={{ backgroundColor: '#6366f1' }}
              ></span>
              📹 Finding top performing videos
            </p>
            <p className="flex items-center">
              <span 
                className="inline-block w-2 h-2 rounded-full mr-3 animate-pulse"
                style={{ backgroundColor: '#6366f1' }}
              ></span>
              ✨ Verifying relevance with AI
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-600 font-medium">
          ⏱ This may take 1-2 minutes
        </p>
      </div>
    </div>
  );
}

