"use client";

import { useState } from "react";
import { useMutation, useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function Home() {
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const createAnalysis = useMutation(api.mutations.createAnalysis);
  const startAnalysis = useAction(api.actions.analyzeCompany);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsSubmitting(true);

    try {
      // Create analysis record
      const analysisId = await createAnalysis({ companyUrl: url });

      // Start the analysis in the background (fire and forget)
      startAnalysis({ companyUrl: url, analysisId }).catch((error) => {
        console.error("Analysis error:", error);
      });

      // Redirect to loading page
      router.push(`/loading-analysis/${analysisId}`);
    } catch (error) {
      console.error(error);
      alert("Failed to start analysis. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)'
      }}
    >
      <div className="w-full max-w-2xl">
        {/* Hackathon Badge */}
        <div className="flex justify-center mb-6">
          <div 
            className="inline-block px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(30, 58, 138, 0.2)',
              letterSpacing: '0.5px'
            }}
          >
            🚀 Cursor Chiangmai Hackathon
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 text-center">
          🥷 Market Ninjas
        </h1>
        <p className="text-center text-gray-700 mb-12 text-lg font-medium">
          Find the top performing YouTube content in your niche and generate shorts
        </p>

        {/* Main Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-8 shadow-lg"
          style={{
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              🔍 Enter SaaS Website URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
              disabled={isSubmitting}
              className="w-full px-5 py-4 text-gray-900 rounded-2xl transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '3px solid rgba(30, 58, 138, 0.3)',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1e3a8a';
                e.target.style.boxShadow = '0 4px 12px rgba(30, 58, 138, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(30, 58, 138, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white py-4 px-7 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: isSubmitting ? '#9ca3af' : 'linear-gradient(135deg, #6366f1, #8b5cf6)'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.12)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <span className="inline-block w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ⚡ Starting Analysis...
              </span>
            ) : (
              "✨ Analyze"
            )}
          </button>
        </form>

        {/* Footer Text */}
        <p className="text-center text-gray-600 text-sm mt-8 leading-relaxed">
          📹 We&apos;ll analyze the website and find the most viewed YouTube videos<br />
          in this niche from the last 12 months
        </p>
        
        <p className="text-center text-gray-500 text-xs mt-6">
          Powered by AI • Phase 1.5: Insight Extraction
        </p>
      </div>
    </div>
  );
}

