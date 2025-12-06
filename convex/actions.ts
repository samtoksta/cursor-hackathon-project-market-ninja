import { action } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

// Main orchestrator action
export const analyzeCompany = action({
  args: {
    companyUrl: v.string(),
    analysisId: v.id("analysis"),
  },
  handler: async (ctx, args) => {
    try {
      console.log("=".repeat(60));
      console.log("🚀 STARTING ANALYSIS");
      console.log("Analysis ID:", args.analysisId);
      console.log("Company URL:", args.companyUrl);
      console.log("=".repeat(60));

      // Step 1: Scrape website
      console.log("\n📝 STEP 1: Scraping website...");
      console.log("Target URL:", args.companyUrl);
      const scrapedData = (await scrapeWebsite(args.companyUrl)) as any;
      console.log("✅ Scraping complete!");
      console.log("Company Name:", scrapedData.name);
      console.log("Company Description:", scrapedData.description?.substring(0, 200) + "...");
      console.log("Content Length:", scrapedData.content?.length || 0, "characters");

      // Step 2: Generate keywords via OpenRouter
      console.log("\n🤖 STEP 2: Generating keywords with AI...");
      console.log("Sending content to OpenRouter (first 3000 chars)");
      let keywords = await generateKeywords(scrapedData.content);
      console.log("✅ Keywords generated:", keywords);

      // Update analysis with keywords
      console.log("\n💾 Updating analysis in database...");
      await ctx.runMutation(internal.mutations.updateAnalysis, {
        analysisId: args.analysisId,
        keywords,
        companyName: scrapedData.name,
        companyDescription: scrapedData.description,
      });
      console.log("✅ Analysis updated with keywords and company info");

      // Step 3-5: Search and verify with retry logic
      console.log("\n🎥 STEP 3: Searching YouTube with smart retry...");
      
      let verifiedVideos: any[] = [];
      let allTriedKeywords = [...keywords];
      let attemptNumber = 1;
      const maxAttempts = 3;
      const minRelevantVideos = 10;
      
      while (verifiedVideos.length < minRelevantVideos && attemptNumber <= maxAttempts) {
        console.log(`\n--- ATTEMPT ${attemptNumber}/${maxAttempts} ---`);
        console.log("Using keywords:", attemptNumber === 1 ? keywords : keywords.slice(0, 5));
        
        // Search YouTube for each keyword
        const allVideos = [];
        const currentKeywords = attemptNumber === 1 ? keywords : keywords.slice(0, 5);
        
        for (let i = 0; i < currentKeywords.length; i++) {
          const keyword = currentKeywords[i];
          console.log(`\n  [${i + 1}/${currentKeywords.length}] Searching for: "${keyword}"`);
          const videos = await searchYouTube(keyword);
          console.log(`  Found ${videos.length} videos for this keyword`);
          if (videos.length > 0) {
            console.log(`  Top result: "${videos[0].title}" (${videos[0].number_of_views?.toLocaleString()} views)`);
          }
          allVideos.push(...videos);
        }
        console.log(`\n✅ Total videos found: ${allVideos.length}`);

        // Filter to last 12 months & sort by views
        console.log("\n🔍 Filtering and sorting videos...");
        const recentVideos = filterLast12Months(allVideos);
        console.log("After 12-month filter:", recentVideos.length, "videos");
        const topVideos = sortByViews(recentVideos).slice(0, 25);
        console.log("Top 25 by views:", topVideos.length, "videos");
        
        if (topVideos.length === 0) {
          console.log("⚠️ No videos found, generating new keywords...");
          if (attemptNumber < maxAttempts) {
            keywords = await generateNewKeywords(scrapedData.content, allTriedKeywords);
            allTriedKeywords.push(...keywords);
            attemptNumber++;
            continue;
          } else {
            break;
          }
        }

        // Verify relevance with LLM
        console.log("\n🤖 Verifying relevance with AI...");
        console.log("Sending", topVideos.length, "videos to LLM for strict verification");
        const batchVerified = await verifyRelevance(
          topVideos,
          scrapedData.description || scrapedData.name || "",
          scrapedData.name || ""
        );
        console.log("✅ Relevance check complete!");
        console.log("Relevant videos found:", batchVerified.length);
        console.log("Filtered out:", topVideos.length - batchVerified.length, "videos");
        
        // Add to our collection (avoid duplicates by video_id)
        const existingIds = new Set(verifiedVideos.map(v => v.video_id));
        const newVideos = batchVerified.filter(v => !existingIds.has(v.video_id));
        verifiedVideos.push(...newVideos);
        
        console.log(`\n📊 Total relevant videos so far: ${verifiedVideos.length}/${minRelevantVideos} needed`);
        
        // If we have enough, stop
        if (verifiedVideos.length >= minRelevantVideos) {
          console.log("✅ Found enough relevant videos!");
          break;
        }
        
        // If not enough and we can retry, generate new keywords
        if (attemptNumber < maxAttempts) {
          console.log(`\n⚠️ Only ${verifiedVideos.length} relevant videos. Generating NEW keywords...`);
          keywords = await generateNewKeywords(scrapedData.content, allTriedKeywords);
          allTriedKeywords.push(...keywords);
          attemptNumber++;
        } else {
          console.log(`\n⚠️ Reached max attempts. Proceeding with ${verifiedVideos.length} videos.`);
        }
      }
      
      console.log(`\n🎯 Final result: ${verifiedVideos.length} relevant videos after ${attemptNumber} attempt(s)`);

      // Step 6: Save relevant videos
      console.log("\n💾 STEP 6: Saving videos to database...");
      const videosToSave = verifiedVideos.map((v) => ({
        videoId: v.video_id,
        title: v.title,
        channelName: v.author,
        thumbnailUrl: v.thumbnails?.[0]?.url || "",
        viewCount: v.number_of_views,
        publishedTime: v.published_time,
        videoLength: v.video_length || undefined,
        videoUrl: `https://www.youtube.com/watch?v=${v.video_id}`,
        isRelevant: v.isRelevant,
      }));
      
      console.log("Preparing to save", videosToSave.length, "videos");
      await ctx.runMutation(internal.mutations.saveVideos, {
        analysisId: args.analysisId,
        videos: videosToSave,
      });
      console.log("✅ Videos saved successfully");

      // Step 7: Generate campaign insights
      console.log("\n🎯 STEP 7: Generating campaign insights...");
      
      // 7a: YouTube keywords from titles
      console.log("\n  → Generating YouTube keywords...");
      const youtubeKeywords = await generateYouTubeKeywords(verifiedVideos);
      console.log("  ✅ Generated", youtubeKeywords.length, "keywords");
      
      // 7b: Fetch transcripts for top 5 videos
      console.log("\n  → Fetching video transcripts...");
      const transcripts = await fetchVideoTranscripts(verifiedVideos.slice(0, 5));
      console.log("  ✅ Fetched", transcripts.length, "transcripts");
      
      // 7c: Extract SaaS tools from transcripts
      console.log("\n  → Extracting SaaS tools...");
      const saasTools = await extractSaaSTools(transcripts);
      console.log("  ✅ Found", saasTools.length, "tools");
      
      // 7d: Generate content ideas
      console.log("\n  → Generating content ideas...");
      const contentIdeas = await generateContentIdeas(
        scrapedData.name || "",
        scrapedData.description || "",
        verifiedVideos,
        youtubeKeywords
      );
      console.log("  ✅ Generated", contentIdeas.length, "ideas");
      
      // 7e: Calculate top creators
      console.log("\n  → Calculating top creators...");
      const topCreators = calculateTopCreators(verifiedVideos);
      console.log("  ✅ Found", topCreators.length, "creators");
      
      // Save insights
      console.log("\n💾 Saving insights...");
      await ctx.runMutation(internal.mutations.saveInsights, {
        analysisId: args.analysisId,
        youtubeKeywords,
        contentIdeas,
        saasTools,
        topCreators,
      });
      console.log("✅ Insights saved");

      // Step 8: Mark as completed
      console.log("\n✅ STEP 8: Marking analysis as completed...");
      await ctx.runMutation(internal.mutations.updateAnalysisStatus, {
        analysisId: args.analysisId,
        status: "completed",
      });

      console.log("\n" + "=".repeat(60));
      console.log("🎉 ANALYSIS COMPLETED SUCCESSFULLY!");
      console.log("Total videos saved:", videosToSave.length);
      console.log("YouTube Keywords:", youtubeKeywords.length);
      console.log("Content Ideas:", contentIdeas.length);
      console.log("SaaS Tools:", saasTools.length);
      console.log("Top Creators:", topCreators.length);
      console.log("=".repeat(60));
    } catch (error: any) {
      console.error("\n" + "❌".repeat(30));
      console.error("🚨 ANALYSIS FAILED!");
      console.error("Error:", error.message);
      console.error("Stack:", error.stack);
      console.error("❌".repeat(30));
      
      await ctx.runMutation(internal.mutations.updateAnalysisStatus, {
        analysisId: args.analysisId,
        status: "failed",
        errorMessage: error.message || "Unknown error occurred",
      });
    }
  },
});

// Helper function to scrape website
async function scrapeWebsite(url: string) {
  console.log("  → Calling AI Content Scraper API...");
  console.log("  → Request URL:", "https://ai-content-scraper.p.rapidapi.com/scrape");
  console.log("  → Payload:", JSON.stringify({ url }));
  
  const response = await fetch(
    "https://ai-content-scraper.p.rapidapi.com/scrape",
    {
      method: "POST",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": "ai-content-scraper.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    }
  );

  console.log("  → Response status:", response.status, response.statusText);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("  → Error response body:", errorText);
    throw new Error(`Failed to scrape website: ${response.statusText}`);
  }

  const data = (await response.json()) as any;
  console.log("  → Response received - Name:", data.name);
  console.log("  → Response received - Description length:", data.description?.length || 0);
  console.log("  → Response received - Content length:", data.content?.length || 0);
  
  return data;
}

// Helper function to generate NEW keywords (avoiding previous ones)
async function generateNewKeywords(content: string, previousKeywords: string[]): Promise<string[]> {
  console.log("  → Generating NEW keywords, avoiding:", previousKeywords);
  console.log("  → Calling OpenRouter API for new keyword generation...");
  console.log("  → Model: google/gemini-2.5-flash-preview-09-2025");
  
  const requestBody = {
    model: "google/gemini-2.5-flash-preview-09-2025",
    messages: [
      {
        role: "user",
        content: `Based on this website content, generate exactly 5 NEW YouTube search keywords that someone might use to find videos about this type of product/service.

IMPORTANT RULES:
- Do NOT include the company/brand name in any keyword
- Use GENERIC terms that describe the category, niche, or technology
- Focus on what the product DOES, not what it's called
- Think about what someone would search BEFORE they know this brand exists
- DO NOT use any of these previously tried keywords: ${JSON.stringify(previousKeywords)}
- Try DIFFERENT angles, adjacent topics, or alternative ways to describe the niche

Return ONLY a JSON array of strings, nothing else.

Website content: ${content.substring(0, 3000)}

Example format: ["keyword one", "keyword two", "keyword three", "keyword four", "keyword five"]`,
      },
    ],
  };
  
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  console.log("  → OpenRouter response status:", response.status, response.statusText);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("  → Error response body:", errorText);
    throw new Error(`Failed to generate new keywords: ${response.statusText}`);
  }

  const data = (await response.json()) as any;
  console.log("  → Raw response from OpenRouter:", JSON.stringify(data, null, 2));
  
  const rawContent = data.choices[0].message.content;
  console.log("  → Raw content from LLM:", rawContent);
  
  // Try to parse, if it fails, clean it up
  let keywords;
  try {
    keywords = JSON.parse(rawContent);
    console.log("  → Parsed new keywords:", keywords);
  } catch (error) {
    console.log("  → JSON parse failed, extracting JSON from response...");
    keywords = await extractOrFixJSON(rawContent, "array of 5 keyword strings");
    console.log("  → Extracted new keywords:", keywords);
  }
  
  return keywords;
}

// Helper function to generate keywords via OpenRouter
async function generateKeywords(content: string): Promise<string[]> {
  console.log("  → Calling OpenRouter API for keyword generation...");
  console.log("  → Model: google/gemini-2.5-flash-preview-09-2025");
  console.log("  → Input content length:", content.substring(0, 3000).length, "chars");
  
  const requestBody = {
    model: "google/gemini-2.5-flash-preview-09-2025",
    messages: [
      {
        role: "user",
        content: `Based on this website content, generate exactly 5 YouTube search keywords that this company might create content for to promote their product. 

IMPORTANT RULES:
- Do NOT include the company/brand name in any keyword
- Focus on what the product DOES, not what it's called
- Think about what someone would search BEFORE they know this brand exists

Return ONLY a JSON array of strings, nothing else.

Website content: ${content.substring(0, 3000)}

Example format: ["keyword one", "keyword two", "keyword three", "keyword four", "keyword five"]`,
      },
    ],
  };
  
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  console.log("  → OpenRouter response status:", response.status, response.statusText);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("  → Error response body:", errorText);
    throw new Error(`Failed to generate keywords: ${response.statusText}`);
  }

  const data = (await response.json()) as any;
  console.log("  → Raw response from OpenRouter:", JSON.stringify(data, null, 2));
  
  const rawContent = data.choices[0].message.content;
  console.log("  → Raw content from LLM:", rawContent);
  
  // Try to parse, if it fails, clean it up
  let keywords;
  try {
    keywords = JSON.parse(rawContent);
    console.log("  → Parsed keywords:", keywords);
  } catch (error) {
    console.log("  → JSON parse failed, extracting JSON from response...");
    keywords = await extractOrFixJSON(rawContent, "array of 5 keyword strings");
    console.log("  → Extracted keywords:", keywords);
  }
  
  return keywords;
}

// Helper function to search YouTube
async function searchYouTube(query: string) {
  const url = `https://youtube-v2.p.rapidapi.com/search/?query=${encodeURIComponent(
    query
  )}&lang=en&order_by=this_year&country=us`;
  
  console.log("    → Calling YouTube Search API...");
  console.log("    → Query:", query);
  console.log("    → Full URL:", url);
  
  const response = await fetch(url, {
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
      "x-rapidapi-host": "youtube-v2.p.rapidapi.com",
    },
  });

  console.log("    → YouTube API response status:", response.status, response.statusText);

  if (!response.ok) {
    const errorText = await response.text();
    console.warn("    → YouTube search failed for:", query);
    console.warn("    → Error response:", errorText);
    return [];
  }

  const data = (await response.json()) as any;
  console.log("    → Videos returned:", data.videos?.length || 0);
  
  if (data.videos && data.videos.length > 0) {
    console.log("    → Sample video:", {
      title: data.videos[0].title?.substring(0, 50),
      views: data.videos[0].number_of_views,
      published: data.videos[0].published_time
    });
  }
  
  return data.videos || [];
}

// Helper function to filter last 12 months
function filterLast12Months(videos: any[]) {
  console.log("  → Filtering videos by date...");
  console.log("  → Sample published times:", videos.slice(0, 5).map(v => v.published_time));
  
  const filtered = videos.filter((video) => {
    const time = video.published_time?.toLowerCase() || "";
    if (time.includes("day") || time.includes("week")) return true;
    if (time.includes("month")) {
      const months = parseInt(time);
      return !isNaN(months) && months <= 12;
    }
    return false;
  });
  
  console.log("  → Kept", filtered.length, "out of", videos.length, "videos");
  return filtered;
}

// Helper function to sort by views
function sortByViews(videos: any[]) {
  console.log("  → Sorting", videos.length, "videos by view count...");
  
  const sorted = videos.sort(
    (a, b) => (b.number_of_views || 0) - (a.number_of_views || 0)
  );
  
  if (sorted.length > 0) {
    console.log("  → Highest views:", sorted[0].number_of_views?.toLocaleString());
    console.log("  → Lowest views:", sorted[sorted.length - 1].number_of_views?.toLocaleString());
  }
  
  return sorted;
}

// Helper function to verify relevance (strict)
async function verifyRelevance(videos: any[], companyDescription: string, companyName: string = "") {
  if (videos.length === 0) {
    console.log("  → No videos to verify");
    return [];
  }

  console.log("  → Preparing video info for LLM verification...");
  const videoInfo = videos.map((v) => ({
    title: v.title,
    description: v.description || "",
    channel: v.author,
  }));

  console.log("  → Sending to OpenRouter for relevance check...");
  console.log("  → Model: google/gemini-2.5-flash-preview-09-2025");
  console.log("  → Company context length:", companyDescription.length);
  console.log("  → Number of videos to check:", videos.length);
  
  const requestBody = {
    model: "google/gemini-2.5-flash-preview-09-2025",
    messages: [
      {
        role: "user",
        content: `Company: ${companyName ? companyName + " - " : ""}${companyDescription}

Videos: ${JSON.stringify(videoInfo)}

STRICT RELEVANCE CRITERIA:
- Would creating content similar to this video actually help market this company's product?
- Is the video's topic directly related to what this company does or their target audience?
- Would someone interested in this product likely watch this type of content?
- BE STRICT: If there's any doubt, mark as FALSE

For each video, determine if it's TRULY relevant for marketing this product. Return ONLY a JSON array of booleans (true/false) in the same order as the videos.

Example: [true, false, true, true, false]`,
      },
    ],
  };

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  console.log("  → OpenRouter response status:", response.status, response.statusText);

  if (!response.ok) {
    const errorText = await response.text();
    console.warn("  → Failed to verify relevance, returning all videos as relevant");
    console.warn("  → Error response:", errorText);
    return videos.map((v) => ({ ...v, isRelevant: true }));
  }

  const data = (await response.json()) as any;
  console.log("  → Raw response from OpenRouter:", JSON.stringify(data, null, 2));
  
  const rawContent = data.choices[0].message.content;
  console.log("  → Raw content from LLM:", rawContent);
  
  // Try to parse, if it fails, extract or fix the JSON
  let relevanceFlags;
  try {
    relevanceFlags = JSON.parse(rawContent);
    console.log("  → Parsed relevance flags:", relevanceFlags);
  } catch (error) {
    console.log("  → JSON parse failed, extracting JSON from response...");
    relevanceFlags = await extractOrFixJSON(rawContent, "array of boolean values");
    console.log("  → Extracted relevance flags:", relevanceFlags);
  }

  const resultsWithRelevance = videos.map((video, i) => ({
    ...video,
    isRelevant: relevanceFlags[i] || false,
  }));

  const relevantVideos = resultsWithRelevance.filter((v) => v.isRelevant);
  console.log("  → Relevant videos:", relevantVideos.length);
  console.log("  → Filtered out:", resultsWithRelevance.length - relevantVideos.length);

  return relevantVideos;
}

// Helper function to extract or fix JSON from LLM response
async function extractOrFixJSON(
  rawContent: string,
  expectedFormat: string
): Promise<any> {
  console.log("  → Attempting to extract JSON with regex...");
  
  // Try to find JSON array in the response
  const arrayMatch = rawContent.match(/\[[\s\S]*\]/);
  if (arrayMatch) {
    try {
      const extracted = JSON.parse(arrayMatch[0]);
      console.log("  → Successfully extracted JSON array with regex");
      return extracted;
    } catch (error) {
      console.log("  → Regex extraction failed, trying JSON object...");
    }
  }
  
  // Try to find JSON object
  const objectMatch = rawContent.match(/\{[\s\S]*\}/);
  if (objectMatch) {
    try {
      const extracted = JSON.parse(objectMatch[0]);
      console.log("  → Successfully extracted JSON object with regex");
      return extracted;
    } catch (error) {
      console.log("  → Regex extraction failed for object too");
    }
  }
  
  // If regex fails, use LLM to clean it up
  console.log("  → Making LLM call to fix JSON...");
  
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-preview-09-2025",
        messages: [
          {
            role: "user",
            content: `Extract ONLY the JSON ${expectedFormat} from this response. Return NOTHING except the valid JSON:

${rawContent}

Return ONLY the JSON, no explanations, no markdown, no extra text.`,
          },
        ],
      }),
    }
  );
  
  if (!response.ok) {
    console.error("  → Failed to fix JSON with LLM");
    throw new Error("Failed to parse or fix JSON from LLM response");
  }
  
  const data = (await response.json()) as any;
  const fixedContent = data.choices[0].message.content.trim();
  console.log("  → LLM returned:", fixedContent);
  
  // Try to parse the fixed content
  const parsed = JSON.parse(fixedContent);
  console.log("  → Successfully parsed fixed JSON");
  return parsed;
}

// Helper: Generate YouTube keywords from video titles
async function generateYouTubeKeywords(videos: any[]): Promise<string[]> {
  const videoTitles = videos.slice(0, 20).map(v => v.title);
  
  console.log("    → Analyzing", videoTitles.length, "video titles");
  
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-preview-09-2025",
        messages: [
          {
            role: "user",
            content: `Analyze these video titles and extract the top 10 YouTube keywords/phrases that would be valuable for creating video campaigns in this niche.

Video Titles:
${videoTitles.join("\n")}

RULES:
- Extract keywords that appear frequently or are strategically important
- Include both single words and short phrases (2-3 words max)
- Focus on keywords that would help with YouTube SEO
- Make them actionable for content creators

Return ONLY a JSON array of exactly 10 keyword strings.

Example format: ["keyword one", "keyword two", "keyword three", ...]`,
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    console.warn("    → Failed to generate YouTube keywords");
    return [];
  }

  const data = (await response.json()) as any;
  const rawContent = data.choices[0].message.content;
  
  try {
    return JSON.parse(rawContent);
  } catch (error) {
    return await extractOrFixJSON(rawContent, "array of 10 keyword strings");
  }
}

// Helper: Fetch video transcripts
async function fetchVideoTranscripts(videos: any[]): Promise<string[]> {
  const transcripts: string[] = [];
  
  for (const video of videos) {
    try {
      console.log(`    → Fetching transcript for: ${video.title.substring(0, 50)}...`);
      
      const response = await fetch(
        `https://youtube-transcript3.p.rapidapi.com/api/transcript-with-url?url=https://www.youtube.com/watch?v=${video.video_id}&flat_text=true&lang=en`,
        {
          headers: {
            "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
            "x-rapidapi-host": "youtube-transcript3.p.rapidapi.com",
          },
        }
      );

      if (response.ok) {
        const data = (await response.json()) as any;
        if (data.success && data.transcript) {
          // Limit to 5000 chars to avoid overwhelming LLM
          transcripts.push(data.transcript.substring(0, 5000));
          console.log(`    ✅ Transcript fetched (${data.transcript.length} chars)`);
        }
      } else {
        console.log(`    ⚠️ Transcript unavailable`);
      }
      
      // Rate limiting delay
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.log(`    ⚠️ Error fetching transcript:`, error);
    }
  }
  
  return transcripts;
}

// Helper: Extract SaaS tools from transcripts
async function extractSaaSTools(transcripts: string[]): Promise<string[]> {
  if (transcripts.length === 0) {
    return [];
  }
  
  // Combine transcripts, limit to 10000 chars
  const combinedTranscripts = transcripts.join("\n\n").substring(0, 10000);
  
  console.log("    → Analyzing transcripts for SaaS tools...");
  
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-preview-09-2025",
        messages: [
          {
            role: "user",
            content: `Analyze these video transcripts and extract all SaaS products, tools, and software platforms mentioned.

Transcripts:
${combinedTranscripts}

RULES:
- Only include actual product/tool names (e.g., "Slack", "Notion", "Figma")
- Don't include generic terms (e.g., "CRM", "database")
- Don't include the company we're analyzing
- Return unique tools only (no duplicates)
- Prioritize well-known or frequently mentioned tools

Return ONLY a JSON array of tool name strings. Aim for 5-15 tools.

Example format: ["Tool One", "Tool Two", "Tool Three", ...]`,
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    console.warn("    → Failed to extract SaaS tools");
    return [];
  }

  const data = (await response.json()) as any;
  const rawContent = data.choices[0].message.content;
  
  try {
    return JSON.parse(rawContent);
  } catch (error) {
    return await extractOrFixJSON(rawContent, "array of tool name strings");
  }
}

// Helper: Generate content ideas
async function generateContentIdeas(
  companyName: string,
  companyDescription: string,
  videos: any[],
  keywords: string[]
): Promise<any[]> {
  
  const videoTitles = videos.slice(0, 15).map(v => v.title);
  
  console.log("    → Generating 10 content ideas...");
  
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-preview-09-2025",
        messages: [
          {
            role: "user",
            content: `Generate 10 video content ideas for marketing this product/service.

Company: ${companyName}
Description: ${companyDescription}

Trending video titles in this niche:
${videoTitles.join("\n")}

Popular keywords: ${keywords.join(", ")}

For each content idea, provide:
1. title: A compelling video title (like YouTube titles)
2. description: Brief description (50-100 words) of what the video covers
3. keywords: Array of 3-5 relevant YouTube keywords
4. targetAudience: Who this content is for (be specific)

Return ONLY a JSON array of exactly 10 content idea objects.

Example format:
[
  {
    "title": "How to...",
    "description": "This video shows...",
    "keywords": ["keyword1", "keyword2", "keyword3"],
    "targetAudience": "Small business owners who..."
  }
]`,
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    console.warn("    → Failed to generate content ideas");
    return [];
  }

  const data = (await response.json()) as any;
  const rawContent = data.choices[0].message.content;
  
  try {
    return JSON.parse(rawContent);
  } catch (error) {
    return await extractOrFixJSON(rawContent, "array of 10 content idea objects");
  }
}

// Helper: Calculate top creators (no LLM needed)
function calculateTopCreators(videos: any[]): any[] {
  const creatorMap = new Map<string, { videoCount: number; totalViews: number }>();
  
  // Aggregate by channel
  for (const video of videos) {
    const channelName = video.author;
    const existing = creatorMap.get(channelName) || { videoCount: 0, totalViews: 0 };
    
    creatorMap.set(channelName, {
      videoCount: existing.videoCount + 1,
      totalViews: existing.totalViews + (video.number_of_views || 0),
    });
  }
  
  // Convert to array with averages
  const creators = Array.from(creatorMap.entries()).map(([channelName, data]) => ({
    channelName,
    videoCount: data.videoCount,
    totalViews: data.totalViews,
    avgViews: Math.round(data.totalViews / data.videoCount),
  }));
  
  // Sort by total views, return top 10
  return creators
    .sort((a, b) => b.totalViews - a.totalViews)
    .slice(0, 10);
}

