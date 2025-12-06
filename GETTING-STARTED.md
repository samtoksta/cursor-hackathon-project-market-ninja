<<<<<<< HEAD
# Getting Started with Viral Video Analyzer

This guide will help you set up and run your Viral Video Analyzer application.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Convex account
- OpenRouter API key
- RapidAPI key

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Convex

```bash
npx convex dev
```

This will:
- Create a new Convex project (if you haven't already)
- Generate your `NEXT_PUBLIC_CONVEX_URL`
- Push your schema to Convex

### 3. Configure Environment Variables

**IMPORTANT: Convex actions need environment variables set in TWO places:**

#### A. For Next.js (Frontend)
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_DEPLOYMENT=dev:your-deployment-name
```

#### B. For Convex Actions (Backend)
Go to the Convex Dashboard and add these environment variables:

1. Run `npx convex dashboard` or go to https://dashboard.convex.dev/
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:

```
OPENROUTER_API_KEY=your_openrouter_key_here
RAPIDAPI_KEY=your_rapidapi_key_here
```

### 4. Subscribe to Required RapidAPI Endpoints

You need to subscribe to these APIs on RapidAPI:

1. **AI Content Scraper** - https://rapidapi.com/8v2FWW4H6AmKw89/api/ai-content-scraper
2. **YouTube v2** - https://rapidapi.com/ytjar/api/youtube-v2

Both have free tiers available.

### 5. Get Your OpenRouter API Key

1. Sign up at https://openrouter.ai/
2. Create an API key
3. The app uses `google/gemini-2.5-flash-preview-09-2025` model

### 6. Run the Development Servers

**You need TWO terminals running:**

**Terminal 1 - Convex:**
```bash
npx convex dev
```

**Terminal 2 - Next.js:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. **Enter a URL**: Input any SaaS company website
2. **Analysis Begins**: The app will:
   - Scrape the website content
   - Use AI to generate 5 relevant YouTube search keywords (no brand names)
   - Search YouTube for videos using those keywords
   - Filter videos from the last 12 months
   - Verify relevance using AI with STRICT criteria
   - If not enough relevant videos (< 10), generate NEW keywords and retry (up to 3 attempts)
   - Display the top performing relevant videos

3. **View Results**: See a beautiful grid of the most viewed relevant videos

## Key Features

✅ **Smart Retry Logic** - Automatically generates new keywords if not enough relevant videos found
✅ **Strict Relevance Checking** - AI evaluates if videos would actually help market the product
✅ **Generic Keywords Only** - No brand names in keywords for better viral video discovery
✅ **Comprehensive Logging** - See exactly what's happening at each step in Convex dashboard
✅ **JSON Error Recovery** - Automatically fixes malformed LLM responses
✅ **Real-time Updates** - Reactive UI with Convex
✅ **Beautiful UI** - Gradient design with TailwindCSS

## Troubleshooting

### "Failed to scrape website"
- Check that you're subscribed to AI Content Scraper on RapidAPI
- Verify your RapidAPI key is set in the **Convex Dashboard** environment variables
- Ensure you have credits on RapidAPI

### "Failed to generate keywords"
- Verify your OpenRouter API key is set in the **Convex Dashboard** environment variables
- Check that you have credits on OpenRouter
- The model `google/gemini-2.5-flash-preview-09-2025` must be available

### Analysis takes too long
- The process typically takes 1-2 minutes
- With retry logic, it can take up to 3-4 minutes if multiple attempts are needed
- Check the Convex dashboard logs to see progress

### "You are not subscribed to this API"
- Go to RapidAPI and subscribe to the AI Content Scraper API
- Make sure you're on at least the free tier

### Environment variables not working
- Remember: `.env.local` is for Next.js (frontend)
- Convex actions (backend) need variables set in the **Convex Dashboard**
- After setting dashboard variables, wait a moment for them to propagate

## Project Structure

```
app/
├── page.tsx                           # Main landing page with URL input
├── loading-analysis/[analysisId]/
│   └── page.tsx                       # Loading state with progress indicators
└── results/[analysisId]/
    └── page.tsx                       # Results page with video grid

convex/
├── schema.ts                          # Database schema
├── mutations.ts                       # Database write operations
├── queries.ts                         # Database read operations
└── actions.ts                         # API integrations and business logic
```

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check the Convex dashboard logs for detailed execution traces
3. Verify all environment variables are set correctly in BOTH places
4. Ensure you're subscribed to the required RapidAPI endpoints

## Next Steps

Once everything is working:
1. Test with different SaaS websites
2. Analyze the keywords being generated
3. Review the strict relevance filtering results
4. Observe the retry logic in action when needed

Happy analyzing! 🚀

=======
# Getting Started with Viral Video Analyzer

This guide will help you set up and run your Viral Video Analyzer application.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Convex account
- OpenRouter API key
- RapidAPI key

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Convex

```bash
npx convex dev
```

This will:
- Create a new Convex project (if you haven't already)
- Generate your `NEXT_PUBLIC_CONVEX_URL`
- Push your schema to Convex

### 3. Configure Environment Variables

**IMPORTANT: Convex actions need environment variables set in TWO places:**

#### A. For Next.js (Frontend)
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_DEPLOYMENT=dev:your-deployment-name
```

#### B. For Convex Actions (Backend)
Go to the Convex Dashboard and add these environment variables:

1. Run `npx convex dashboard` or go to https://dashboard.convex.dev/
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:

```
OPENROUTER_API_KEY=your_openrouter_key_here
RAPIDAPI_KEY=your_rapidapi_key_here
```

### 4. Subscribe to Required RapidAPI Endpoints

You need to subscribe to these APIs on RapidAPI:

1. **AI Content Scraper** - https://rapidapi.com/8v2FWW4H6AmKw89/api/ai-content-scraper
2. **YouTube v2** - https://rapidapi.com/ytjar/api/youtube-v2

Both have free tiers available.

### 5. Get Your OpenRouter API Key

1. Sign up at https://openrouter.ai/
2. Create an API key
3. The app uses `google/gemini-2.5-flash-preview-09-2025` model

### 6. Run the Development Servers

**You need TWO terminals running:**

**Terminal 1 - Convex:**
```bash
npx convex dev
```

**Terminal 2 - Next.js:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. **Enter a URL**: Input any SaaS company website
2. **Analysis Begins**: The app will:
   - Scrape the website content
   - Use AI to generate 5 relevant YouTube search keywords (no brand names)
   - Search YouTube for videos using those keywords
   - Filter videos from the last 12 months
   - Verify relevance using AI with STRICT criteria
   - If not enough relevant videos (< 10), generate NEW keywords and retry (up to 3 attempts)
   - Display the top performing relevant videos

3. **View Results**: See a beautiful grid of the most viewed relevant videos

## Key Features

✅ **Smart Retry Logic** - Automatically generates new keywords if not enough relevant videos found
✅ **Strict Relevance Checking** - AI evaluates if videos would actually help market the product
✅ **Generic Keywords Only** - No brand names in keywords for better viral video discovery
✅ **Comprehensive Logging** - See exactly what's happening at each step in Convex dashboard
✅ **JSON Error Recovery** - Automatically fixes malformed LLM responses
✅ **Real-time Updates** - Reactive UI with Convex
✅ **Beautiful UI** - Gradient design with TailwindCSS

## Troubleshooting

### "Failed to scrape website"
- Check that you're subscribed to AI Content Scraper on RapidAPI
- Verify your RapidAPI key is set in the **Convex Dashboard** environment variables
- Ensure you have credits on RapidAPI

### "Failed to generate keywords"
- Verify your OpenRouter API key is set in the **Convex Dashboard** environment variables
- Check that you have credits on OpenRouter
- The model `google/gemini-2.5-flash-preview-09-2025` must be available

### Analysis takes too long
- The process typically takes 1-2 minutes
- With retry logic, it can take up to 3-4 minutes if multiple attempts are needed
- Check the Convex dashboard logs to see progress

### "You are not subscribed to this API"
- Go to RapidAPI and subscribe to the AI Content Scraper API
- Make sure you're on at least the free tier

### Environment variables not working
- Remember: `.env.local` is for Next.js (frontend)
- Convex actions (backend) need variables set in the **Convex Dashboard**
- After setting dashboard variables, wait a moment for them to propagate

## Project Structure

```
app/
├── page.tsx                           # Main landing page with URL input
├── loading-analysis/[analysisId]/
│   └── page.tsx                       # Loading state with progress indicators
└── results/[analysisId]/
    └── page.tsx                       # Results page with video grid

convex/
├── schema.ts                          # Database schema
├── mutations.ts                       # Database write operations
├── queries.ts                         # Database read operations
└── actions.ts                         # API integrations and business logic
```

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check the Convex dashboard logs for detailed execution traces
3. Verify all environment variables are set correctly in BOTH places
4. Ensure you're subscribed to the required RapidAPI endpoints

## Next Steps

Once everything is working:
1. Test with different SaaS websites
2. Analyze the keywords being generated
3. Review the strict relevance filtering results
4. Observe the retry logic in action when needed

Happy analyzing! 🚀

>>>>>>> edd47c35450a2a1f4429b36b4340b487d5c5f417
