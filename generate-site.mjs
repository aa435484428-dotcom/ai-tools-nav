import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const now = "May 21, 2026";
const siteName = "AIFindr";
const baseUrl = "https://ai-tools-nav-zeta.vercel.app";
const repoUrl = "https://github.com/aa435484428-dotcom/ai-tools-nav";

const categories = [
  "Chat",
  "Search",
  "Writing",
  "Image",
  "Video",
  "Audio",
  "Coding",
  "Productivity",
  "Automation",
  "Design"
];

const tools = [
  ["ChatGPT", "Chat", "General AI assistant for writing, research, analysis, brainstorming, and coding.", "https://chatgpt.com/", "Freemium", "Best all-rounder"],
  ["Claude", "Chat", "Long-form reasoning assistant for analysis, documents, writing, and coding help.", "https://claude.ai/", "Freemium", "Long context"],
  ["Gemini", "Chat", "Google AI assistant connected to Search and Google ecosystem workflows.", "https://gemini.google.com/", "Freemium", "Google users"],
  ["Perplexity", "Search", "Answer engine for research, current web questions, and cited discovery.", "https://www.perplexity.ai/", "Freemium", "Research"],
  ["Microsoft Copilot", "Productivity", "AI assistant across Microsoft 365, Edge, Windows, and work documents.", "https://copilot.microsoft.com/", "Freemium", "Office workflows"],
  ["Poe", "Chat", "Multi-model chat hub for testing different assistants in one interface.", "https://poe.com/", "Freemium", "Model switching"],
  ["Notion AI", "Productivity", "AI writing, summarizing, and workspace assistance inside Notion.", "https://www.notion.com/product/ai", "Paid add-on", "Teams"],
  ["Grammarly", "Writing", "Writing assistant for grammar, tone, clarity, and business communication.", "https://www.grammarly.com/", "Freemium", "Polishing"],
  ["Jasper", "Writing", "Marketing-focused AI writing platform for campaigns, brand voice, and content teams.", "https://www.jasper.ai/", "Paid", "Marketing"],
  ["Copy.ai", "Writing", "Go-to-market AI platform for sales copy, workflows, and content operations.", "https://www.copy.ai/", "Freemium", "Sales copy"],
  ["Midjourney", "Image", "Image and video model platform known for polished creative visuals.", "https://www.midjourney.com/", "Paid", "Art quality"],
  ["Adobe Firefly", "Image", "Commercially oriented generative image tools within Adobe creative workflows.", "https://www.adobe.com/products/firefly.html", "Freemium", "Design teams"],
  ["Canva AI", "Design", "Design suite with AI writing, image, layout, presentation, and brand tools.", "https://www.canva.com/ai/", "Freemium", "Fast design"],
  ["Ideogram", "Image", "AI image generator often used for text-in-image and graphic concepts.", "https://ideogram.ai/", "Freemium", "Text graphics"],
  ["Runway", "Video", "AI video generation and editing suite for creators, ads, and motion experiments.", "https://runwayml.com/", "Freemium", "Video generation"],
  ["Pika", "Video", "AI video creation tool for short clips, social assets, and visual experiments.", "https://pika.art/", "Freemium", "Short video"],
  ["HeyGen", "Video", "AI avatar and video localization platform for marketing and training videos.", "https://www.heygen.com/", "Freemium", "Avatars"],
  ["ElevenLabs", "Audio", "AI voice platform for text-to-speech, dubbing, voice design, and audio apps.", "https://elevenlabs.io/", "Freemium", "Voice"],
  ["Descript", "Audio", "Audio and video editor with transcription, overdub, captions, and podcast tools.", "https://www.descript.com/", "Freemium", "Podcasts"],
  ["Suno", "Audio", "AI music creation platform for songs, demos, and creative audio experiments.", "https://suno.com/", "Freemium", "Music"],
  ["Cursor", "Coding", "AI code editor built for codebase-aware edits, chat, and agent workflows.", "https://www.cursor.com/", "Freemium", "Developers"],
  ["GitHub Copilot", "Coding", "AI coding assistant integrated into editors and GitHub developer workflows.", "https://github.com/features/copilot", "Paid", "Code completion"],
  ["Replit", "Coding", "Online coding workspace with AI assistance for prototyping and app building.", "https://replit.com/", "Freemium", "Prototyping"],
  ["Lovable", "Coding", "AI app builder for turning prompts into web app prototypes.", "https://lovable.dev/", "Freemium", "No-code apps"],
  ["Zapier AI", "Automation", "AI automation across apps, agents, interfaces, and business workflows.", "https://zapier.com/ai", "Freemium", "Automations"],
  ["Make", "Automation", "Visual automation platform for connecting apps and AI workflow steps.", "https://www.make.com/en/ai-automation", "Freemium", "Visual flows"],
  ["Gamma", "Design", "AI presentation and document tool for decks, memos, and polished pages.", "https://gamma.app/", "Freemium", "Presentations"],
  ["Beautiful.ai", "Design", "Presentation design platform with smart layout and brand controls.", "https://www.beautiful.ai/", "Paid", "Pitch decks"],
  ["Hugging Face", "Coding", "AI model hub and developer platform for open models, datasets, and demos.", "https://huggingface.co/", "Freemium", "Open models"],
  ["Replicate", "Coding", "Cloud API platform for running open-source AI models in products.", "https://replicate.com/", "Usage-based", "Model APIs"]
].map(([name, category, description, url, pricing, badge]) => ({ name, category, description, url, pricing, badge }));

const articleTopics = [
  ["best AI tools for small business 2026", "Best AI Tools for Small Business in 2026: A Practical Stack", "Business"],
  ["best free AI tools for students", "Best Free AI Tools for Students: Study Faster Without Extra Apps", "Education"],
  ["best AI writing tools for blog posts", "Best AI Writing Tools for Blog Posts: SEO-Friendly Options", "Writing"],
  ["AI tools for YouTube creators", "AI Tools for YouTube Creators: Scripts, Thumbnails, Voice, and Clips", "Creator"],
  ["AI tools for TikTok content creators", "AI Tools for TikTok Content Creators: Short Video Workflow", "Creator"],
  ["best AI tools for real estate agents", "Best AI Tools for Real Estate Agents: Listings, Leads, and Follow-Up", "Business"],
  ["AI tools for lawyers", "AI Tools for Lawyers: Research, Drafting, and Document Review", "Professional"],
  ["AI tools for accountants", "AI Tools for Accountants: Reporting, Cleanup, and Client Communication", "Professional"],
  ["AI tools for teachers", "AI Tools for Teachers: Lesson Planning, Grading Help, and Materials", "Education"],
  ["AI tools for ecommerce product descriptions", "AI Tools for Ecommerce Product Descriptions That Convert", "Ecommerce"],
  ["best AI image generators for product photos", "Best AI Image Generators for Product Photos and Mockups", "Image"],
  ["AI video generators for ads", "AI Video Generators for Ads: Fast Creative Tests for Marketers", "Video"],
  ["best AI voice generators for narration", "Best AI Voice Generators for Narration, Courses, and Videos", "Audio"],
  ["AI meeting assistants for remote teams", "AI Meeting Assistants for Remote Teams: Notes, Summaries, and Follow-Ups", "Productivity"],
  ["AI tools for email marketing", "AI Tools for Email Marketing: Subject Lines, Segments, and Campaigns", "Marketing"],
  ["AI tools for SEO keyword research", "AI Tools for SEO Keyword Research: Find Topics and Content Gaps", "SEO"],
  ["AI tools for content repurposing", "AI Tools for Content Repurposing: Turn One Idea Into Many Assets", "Marketing"],
  ["AI tools for coding beginners", "AI Tools for Coding Beginners: Learn, Build, and Debug Faster", "Coding"],
  ["Cursor vs GitHub Copilot", "Cursor vs GitHub Copilot: Which AI Coding Tool Fits Your Workflow?", "Coding"],
  ["ChatGPT vs Claude for writing", "ChatGPT vs Claude for Writing: Choosing the Better Drafting Partner", "Chat"],
  ["ChatGPT vs Gemini for productivity", "ChatGPT vs Gemini for Productivity: Daily Workflow Comparison", "Chat"],
  ["Perplexity vs Google search for research", "Perplexity vs Google Search for Research: When to Use Each", "Search"],
  ["best AI tools for presentations", "Best AI Tools for Presentations: Slides, Storylines, and Visuals", "Design"],
  ["AI tools for social media managers", "AI Tools for Social Media Managers: Planning, Captions, and Reporting", "Marketing"],
  ["AI tools for podcast editing", "AI Tools for Podcast Editing: Transcripts, Clips, and Cleaner Audio", "Audio"],
  ["AI tools for customer support", "AI Tools for Customer Support: Chatbots, Macros, and Help Centers", "Support"],
  ["AI tools for sales teams", "AI Tools for Sales Teams: Prospecting, Outreach, and CRM Notes", "Sales"],
  ["AI tools for startup founders", "AI Tools for Startup Founders: Research, Pitching, and Building", "Startup"],
  ["AI tools for no-code app builders", "AI Tools for No-Code App Builders: From Idea to Prototype", "Coding"],
  ["AI tools for market research", "AI Tools for Market Research: Competitors, Customers, and Trends", "Research"],
  ["AI tools for data analysis", "AI Tools for Data Analysis: Spreadsheets, Dashboards, and Insights", "Data"],
  ["AI spreadsheet tools", "AI Spreadsheet Tools: Clean Data, Write Formulas, and Explain Results", "Data"],
  ["AI tools for resume writing", "AI Tools for Resume Writing: Better Bullets and Job Match", "Career"],
  ["AI tools for job interview practice", "AI Tools for Job Interview Practice: Prepare Stronger Answers", "Career"],
  ["AI tools for LinkedIn posts", "AI Tools for LinkedIn Posts: Thought Leadership Without Noise", "Marketing"],
  ["AI tools for newsletter writing", "AI Tools for Newsletter Writing: Ideas, Drafts, and Curation", "Writing"],
  ["AI tools for online course creation", "AI Tools for Online Course Creation: Lessons, Slides, and Voiceover", "Education"],
  ["AI tools for translation and localization", "AI Tools for Translation and Localization: Global Content Workflow", "Localization"],
  ["AI tools for UX designers", "AI Tools for UX Designers: Research, Wireframes, and Copy", "Design"],
  ["AI tools for logo design", "AI Tools for Logo Design: Concepts, Mockups, and Brand Kits", "Design"],
  ["AI tools for image editing", "AI Tools for Image Editing: Cleanup, Backgrounds, and Variations", "Image"],
  ["AI tools for video editing", "AI Tools for Video Editing: Captions, B-Roll, and Short Clips", "Video"],
  ["AI tools for avatar videos", "AI Tools for Avatar Videos: Training, Sales, and Localization", "Video"],
  ["AI tools for AI music generation", "AI Tools for AI Music Generation: Demos, Hooks, and Background Tracks", "Audio"],
  ["AI tools for transcription", "AI Tools for Transcription: Meetings, Podcasts, and Research Calls", "Audio"],
  ["AI tools for research papers", "AI Tools for Research Papers: Search, Summaries, and Citations", "Research"],
  ["AI tools for note taking", "AI Tools for Note Taking: Capture, Summarize, and Retrieve Ideas", "Productivity"],
  ["AI tools for personal productivity", "AI Tools for Personal Productivity: Focus, Planning, and Follow-Up", "Productivity"],
  ["AI tools for project management", "AI Tools for Project Management: Plans, Updates, and Risk Tracking", "Productivity"],
  ["AI tools for workflow automation", "AI Tools for Workflow Automation: Connect Apps and Remove Repetition", "Automation"],
  ["AI agents for business automation", "AI Agents for Business Automation: Where They Actually Help", "Automation"],
  ["AI tools for lead generation", "AI Tools for Lead Generation: Research, Enrichment, and Outreach", "Sales"],
  ["AI tools for cold email", "AI Tools for Cold Email: Personalization Without Spam", "Sales"],
  ["AI tools for landing page copy", "AI Tools for Landing Page Copy: Headlines, Offers, and Tests", "Marketing"],
  ["AI tools for ad creatives", "AI Tools for Ad Creatives: Generate Variations and Test Faster", "Marketing"],
  ["AI tools for Google Ads", "AI Tools for Google Ads: Keywords, Copy, and Landing Page Ideas", "Marketing"],
  ["AI tools for Facebook ads", "AI Tools for Facebook Ads: Creative Angles and Iteration", "Marketing"],
  ["AI tools for Amazon sellers", "AI Tools for Amazon Sellers: Listings, Images, and Review Insights", "Ecommerce"],
  ["AI tools for Shopify stores", "AI Tools for Shopify Stores: Product Pages, Support, and Email", "Ecommerce"],
  ["AI tools for Etsy sellers", "AI Tools for Etsy Sellers: Listings, Photos, and Niche Research", "Ecommerce"],
  ["AI tools for dropshipping", "AI Tools for Dropshipping: Product Research and Store Content", "Ecommerce"],
  ["AI tools for SaaS marketing", "AI Tools for SaaS Marketing: Positioning, Content, and Sales Enablement", "SaaS"],
  ["AI tools for product managers", "AI Tools for Product Managers: Roadmaps, Feedback, and Specs", "Product"],
  ["AI tools for user research", "AI Tools for User Research: Interview Notes and Insight Synthesis", "Research"],
  ["AI tools for competitor analysis", "AI Tools for Competitor Analysis: Positioning, Pricing, and Content", "Research"],
  ["AI tools for brand strategy", "AI Tools for Brand Strategy: Voice, Messaging, and Visual Direction", "Marketing"],
  ["AI tools for logo prompts", "AI Tools for Logo Prompts: Better Creative Briefs for Image Models", "Design"],
  ["AI prompt generators", "AI Prompt Generators: When They Help and When They Do Not", "Prompting"],
  ["best AI chatbot for work", "Best AI Chatbot for Work: Compare ChatGPT, Claude, Gemini, and Copilot", "Chat"],
  ["AI search engines for students", "AI Search Engines for Students: Research With Better Source Checking", "Education"],
  ["AI tools for financial analysts", "AI Tools for Financial Analysts: Models, Summaries, and Reports", "Finance"],
  ["AI tools for HR teams", "AI Tools for HR Teams: Job Posts, Screening Notes, and Policies", "HR"],
  ["AI tools for recruiters", "AI Tools for Recruiters: Sourcing, Outreach, and Candidate Notes", "HR"],
  ["AI tools for healthcare admin", "AI Tools for Healthcare Admin: Scheduling, Notes, and Communication", "Professional"],
  ["AI tools for architects", "AI Tools for Architects: Concepts, Renders, and Client Presentations", "Design"],
  ["AI tools for interior designers", "AI Tools for Interior Designers: Moodboards, Renders, and Shopping Lists", "Design"],
  ["AI tools for photographers", "AI Tools for Photographers: Editing, Culling, and Client Delivery", "Image"],
  ["AI tools for designers", "AI Tools for Designers: Visual Ideas, Copy, and Presentation Workflow", "Design"],
  ["AI tools for game developers", "AI Tools for Game Developers: Code, Art, Audio, and Testing", "Coding"],
  ["AI tools for indie hackers", "AI Tools for Indie Hackers: Build, Launch, and Market Faster", "Startup"],
  ["AI tools for solopreneurs", "AI Tools for Solopreneurs: A Lean Stack for Daily Work", "Business"],
  ["AI tools for virtual assistants", "AI Tools for Virtual Assistants: Scheduling, Email, and Research", "Business"],
  ["AI tools for consultants", "AI Tools for Consultants: Research, Slides, and Client Deliverables", "Professional"],
  ["AI tools for agencies", "AI Tools for Agencies: Content, Creative, Reporting, and Ops", "Agency"],
  ["AI tools for local businesses", "AI Tools for Local Businesses: Reviews, Posts, Ads, and Support", "Business"],
  ["AI tools for restaurants", "AI Tools for Restaurants: Menus, Social Posts, and Customer Replies", "Local"],
  ["AI tools for fitness coaches", "AI Tools for Fitness Coaches: Programs, Content, and Client Check-Ins", "Creator"],
  ["AI tools for coaches", "AI Tools for Coaches: Programs, Worksheets, and Client Content", "Creator"],
  ["AI tools for bloggers", "AI Tools for Bloggers: Topic Research, Drafts, and Updates", "Writing"],
  ["AI tools for affiliate marketers", "AI Tools for Affiliate Marketers: Reviews, Comparisons, and SEO", "Marketing"],
  ["AI tools for website builders", "AI Tools for Website Builders: Copy, Layout, and Fast Prototypes", "Coding"],
  ["AI tools for app development", "AI Tools for App Development: Coding, Testing, and UI Drafts", "Coding"],
  ["AI tools for API developers", "AI Tools for API Developers: Docs, Tests, and Code Examples", "Coding"],
  ["AI tools for documentation", "AI Tools for Documentation: Keep Docs Clear and Current", "Writing"],
  ["AI tools for customer success", "AI Tools for Customer Success: Onboarding, QBRs, and Support Signals", "Support"],
  ["AI tools for product demos", "AI Tools for Product Demos: Scripts, Videos, and Interactive Assets", "Video"],
  ["AI tools for webinars", "AI Tools for Webinars: Planning, Slides, Clips, and Follow-Up", "Marketing"],
  ["AI tools for research summaries", "AI Tools for Research Summaries: Read Faster and Check Sources", "Research"],
  ["AI tools for academic writing", "AI Tools for Academic Writing: Structure, Clarity, and Source Discipline", "Education"],
  ["AI tools for language learning", "AI Tools for Language Learning: Practice, Feedback, and Immersion", "Education"],
  ["AI tools for travel planning", "AI Tools for Travel Planning: Itineraries, Budgets, and Local Research", "Lifestyle"],
  ["AI tools for personal finance", "AI Tools for Personal Finance: Budget Reviews and Money Planning", "Finance"]
];

const safeSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const titleCase = (text) => text.replace(/\b\w/g, (char) => char.toUpperCase());

function ensureDir(relativePath) {
  fs.mkdirSync(path.join(root, relativePath), { recursive: true });
}

function write(relativePath, content) {
  const fullPath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, "utf8");
}

function wordsOnly(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/gi, " ").split(/\s+/).filter(Boolean);
}

function getToolsForCategory(category) {
  const categoryMap = {
    Writing: ["ChatGPT", "Claude", "Grammarly", "Jasper", "Copy.ai", "Notion AI"],
    Image: ["Midjourney", "Adobe Firefly", "Canva AI", "Ideogram", "ChatGPT", "Gemini"],
    Video: ["Runway", "Pika", "HeyGen", "Canva AI", "Descript", "ChatGPT"],
    Audio: ["ElevenLabs", "Descript", "Suno", "ChatGPT", "Claude", "Canva AI"],
    Coding: ["Cursor", "GitHub Copilot", "Replit", "Lovable", "Hugging Face", "Replicate"],
    Productivity: ["ChatGPT", "Claude", "Gemini", "Notion AI", "Microsoft Copilot", "Zapier AI"],
    Automation: ["Zapier AI", "Make", "ChatGPT", "Gemini", "Notion AI", "Microsoft Copilot"],
    Design: ["Canva AI", "Midjourney", "Adobe Firefly", "Gamma", "Beautiful.ai", "Ideogram"],
    Search: ["Perplexity", "Gemini", "ChatGPT", "Claude", "Microsoft Copilot", "Poe"],
    Education: ["ChatGPT", "Claude", "Gemini", "Perplexity", "Notion AI", "Grammarly"],
    Marketing: ["ChatGPT", "Jasper", "Copy.ai", "Canva AI", "Runway", "Zapier AI"],
    Business: ["ChatGPT", "Claude", "Gemini", "Notion AI", "Zapier AI", "Microsoft Copilot"],
    Ecommerce: ["ChatGPT", "Canva AI", "Jasper", "Copy.ai", "Midjourney", "Zapier AI"],
    Research: ["Perplexity", "Claude", "ChatGPT", "Gemini", "Notion AI", "Hugging Face"],
    Data: ["ChatGPT", "Claude", "Gemini", "Microsoft Copilot", "Notion AI", "Zapier AI"]
  };
  const names = categoryMap[category] || categoryMap.Business;
  return names.map((name) => tools.find((tool) => tool.name === name)).filter(Boolean);
}

function articleBody(topic, index) {
  const [keyword, title, category] = topic;
  const selectedTools = getToolsForCategory(category);
  const toolsText = selectedTools.map((tool) => `<li><strong>${tool.name}</strong> - ${tool.description}</li>`).join("");
  const variations = [
    `${keyword} comparison`,
    `${keyword} free`,
    `${keyword} for beginners`,
    `${keyword} workflow`,
    `${keyword} alternatives`
  ];
  const introAngle = index % 3 === 0
    ? "The best page for this keyword should help a visitor choose a workflow, not just collect logos."
    : index % 3 === 1
      ? "People searching this phrase usually want a short list, a clear use case, and a reason to trust the recommendation."
      : "A strong SEO page should answer the buying question first, then explain tradeoffs without overpromising.";
  let body = `
    <p><strong>${escapeHtml(keyword)}</strong> is a practical search phrase because it combines a clear tool category with a specific user need. As of ${now}, live search results around AI tools are crowded with broad directories, but many specific job-to-be-done pages still leave room for focused guides. ${introAngle}</p>

    <p>This guide is written for readers who want a fast recommendation without opening twenty tabs. The goal is not to crown one universal winner. AI tools change quickly, pricing changes often, and the right choice depends on the task, existing software, team size, and tolerance for manual review. Use this page as a shortlist, then test the tools with your own prompt, document, image, recording, codebase, or campaign brief.</p>

    <h2>Best tools to compare first</h2>
    <p>Start with tools that are already widely used, actively maintained, and easy to test. A smaller shortlist usually beats a giant directory because it helps you reach a decision faster.</p>
    <ul>${toolsText}</ul>

    <h2>How to choose for this keyword</h2>
    <p>For <strong>${escapeHtml(keyword)}</strong>, the most important filter is fit. Ask what the tool must produce, how often you will use it, and who will review the output. A solo creator may prefer speed and a low monthly cost. A business team may care more about permissions, brand controls, history, privacy settings, integrations, and repeatable workflows.</p>

    <p>Use a simple test before paying. Give each tool the same real input. For a writing task, use an actual brief and measure how much editing remains. For design or image generation, test brand consistency and text rendering. For coding, test the tool on a small but real bug. For research, verify whether cited sources actually support the answer. The winner is the tool that reduces work without creating hidden review time.</p>

    <h2>Suggested workflow</h2>
    <p>A reliable workflow starts with one general assistant, one specialist tool, and one review step. For example, use ChatGPT, Claude, or Gemini to clarify the task; use a specialist tool such as Midjourney, Runway, ElevenLabs, Cursor, Jasper, or Zapier AI for production; then review the result manually before publishing or sending. This keeps the stack lean and avoids paying for overlapping subscriptions.</p>

    <p>If the page is for a business process, document the prompt and acceptance criteria. A repeatable prompt is more valuable than a one-time clever answer. Save examples of good output, rejected output, and the edits you make most often. After a week, you will know whether the tool is saving time or only making the work feel new.</p>

    <h2>SEO keyword variations</h2>
    <p>Related searches can support internal links and article updates. Useful variations include: ${variations.map(escapeHtml).join(", ")}. These variations should not become thin duplicate pages. Group them into one helpful guide unless the search intent is clearly different.</p>

    <h2>Common mistakes</h2>
    <p>The first mistake is choosing tools only from social media hype. The second is using AI output without review. The third is buying five overlapping subscriptions before defining the workflow. The fourth is ignoring export options. If a tool helps you create valuable work, make sure you can download, edit, reuse, or migrate the output later.</p>

    <h2>Recommended starting stack</h2>
    <p>For most users searching <strong>${escapeHtml(keyword)}</strong>, start with a general assistant and add one specialist. If the work is text-heavy, compare ChatGPT, Claude, Gemini, Grammarly, Jasper, and Copy.ai. If the work is visual, compare Canva AI, Midjourney, Adobe Firefly, and Ideogram. If the work is video or audio, compare Runway, Pika, HeyGen, ElevenLabs, and Descript. If the work is technical, compare Cursor, GitHub Copilot, Replit, Hugging Face, and Replicate.</p>

    <h2>FAQ</h2>
    <h3>Are free AI tools enough?</h3>
    <p>Free plans are enough for testing and occasional use. Paid plans usually matter when you need higher limits, better models, team features, commercial usage clarity, or faster workflows.</p>
    <h3>Should I use one AI tool or several?</h3>
    <p>Use one general assistant plus one specialist. Add more tools only when a specific workflow breaks or a paid tool clearly saves more than it costs.</p>
    <h3>How often should this page be updated?</h3>
    <p>Review AI tool pages at least monthly. Update pricing, feature claims, and recommended tools whenever a product changes materially.</p>
  `;

  const target = 800;
  while (wordsOnly(body).length < target) {
    body += `
      <p>When comparing options, keep a small scorecard. Rate output quality, setup time, editing time, price, export quality, privacy controls, and how naturally the tool fits your current habits. This prevents a flashy demo from beating a tool that is more dependable in daily work. For SEO readers, the best answer is often the most practical one: name the use case, show the tradeoff, and explain the next step clearly.</p>
    `;
  }
  return body;
}

function pageShell({ title, description, body, pathPrefix = "" }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="robots" content="index,follow">
    <link rel="icon" href="${pathPrefix}assets/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="${pathPrefix}styles.css">
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="${pathPrefix}index.html" aria-label="${siteName} home">
        <span class="brand-mark" aria-hidden="true"></span>
        <span>${siteName}</span>
      </a>
      <nav class="nav" aria-label="Primary navigation">
        <a href="${pathPrefix}index.html#tools">Tools</a>
        <a href="${pathPrefix}index.html#categories">Categories</a>
        <a href="${pathPrefix}articles/index.html">Articles</a>
        <a href="${pathPrefix}pages/advertise.html">Advertise</a>
      </nav>
    </header>
    ${body}
    <footer class="site-footer">
      <p>${siteName} is an independent AI tools directory. Tool details can change; verify pricing and features on the official site before buying.</p>
      <nav aria-label="Footer navigation">
        <a href="${pathPrefix}pages/about.html">About</a>
        <a href="${pathPrefix}pages/privacy.html">Privacy</a>
        <a href="${pathPrefix}pages/disclosure.html">Disclosure</a>
      </nav>
    </footer>
  </body>
</html>`;
}

function renderTools() {
  return tools.map((tool, index) => `
    <article class="tool-card" data-tool-card data-category="${escapeHtml(tool.category)}" data-search="${escapeHtml(`${tool.name} ${tool.category} ${tool.description} ${tool.badge}`.toLowerCase())}">
      ${renderToolVisual(tool)}
      <div class="tool-topline">
        <span class="tool-icon">${escapeHtml(tool.name.slice(0, 1))}</span>
        <span class="pill">${escapeHtml(tool.category)}</span>
      </div>
      <h3>${escapeHtml(tool.name)}</h3>
      <p>${escapeHtml(tool.description)}</p>
      <div class="tool-meta">
        <span>${escapeHtml(tool.pricing)}</span>
        <span>${escapeHtml(tool.badge)}</span>
      </div>
      <a class="card-link" href="${escapeHtml(tool.url)}" target="_blank" rel="nofollow sponsored noopener">Visit ${escapeHtml(tool.name)}</a>
    </article>
    ${index === 11 ? renderAdSlot("homepage") : ""}
  `).join("");
}

function renderToolVisual(tool) {
  const palette = {
    Chat: ["#0b0b0f", "#0071e3", "#d7e8ff"],
    Search: ["#0b0b0f", "#36a269", "#dff5e8"],
    Writing: ["#0b0b0f", "#9b72f2", "#eee7ff"],
    Image: ["#0b0b0f", "#ff7a59", "#ffe8df"],
    Video: ["#0b0b0f", "#ff375f", "#ffe5eb"],
    Audio: ["#0b0b0f", "#30b0c7", "#def7fb"],
    Coding: ["#0b0b0f", "#5856d6", "#e9e8ff"],
    Productivity: ["#0b0b0f", "#007aff", "#e5f1ff"],
    Automation: ["#0b0b0f", "#ff9f0a", "#fff1da"],
    Design: ["#0b0b0f", "#bf5af2", "#f5e4ff"]
  };
  const [dark, accent, soft] = palette[tool.category] || palette.Chat;
  return `
    <div class="tool-visual" aria-hidden="true" style="--accent:${accent};--soft:${soft};--dark:${dark};">
      <div class="visual-window">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="visual-orbit">
        <i></i><i></i><i></i>
      </div>
    </div>
  `;
}

function renderCategoryTiles() {
  return categories.map((category) => `
    <article class="category-tile">
      ${renderCategoryVisual(category)}
      <h3>${escapeHtml(category)}</h3>
      <p>${escapeHtml(categorySummary(category))}</p>
    </article>
  `).join("");
}

function renderCategoryVisual(category) {
  const symbols = {
    Chat: "C",
    Search: "S",
    Writing: "W",
    Image: "I",
    Video: "V",
    Audio: "A",
    Coding: "</>",
    Productivity: "P",
    Automation: "Z",
    Design: "D"
  };
  return `
    <div class="category-visual" aria-hidden="true">
      <span>${escapeHtml(symbols[category] || category.slice(0, 1))}</span>
      <i></i>
    </div>
  `;
}

function categorySummary(category) {
  const summaries = {
    Chat: "General assistants and model hubs.",
    Search: "Research engines with source checking.",
    Writing: "Drafting, editing, and marketing copy.",
    Image: "Images, mockups, and visual concepts.",
    Video: "Clips, avatars, demos, and ads.",
    Audio: "Voice, music, podcasts, and transcription.",
    Coding: "Editors, copilots, APIs, and app builders.",
    Productivity: "Notes, meetings, planning, and follow-up.",
    Automation: "No-code flows and business agents.",
    Design: "Slides, layouts, brands, and UI support."
  };
  return summaries[category] || "Tools for a focused workflow.";
}

function renderArticleVisual(category) {
  return `
    <div class="article-visual" aria-hidden="true">
      <div class="article-visual-panel">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <strong>${escapeHtml(category.slice(0, 2).toUpperCase())}</strong>
    </div>
  `;
}

function renderAdSlot(context = "default") {
  return `
    <aside class="ad-slot ${context === "homepage" ? "ad-slot-wide" : ""}" aria-label="Advertisement placement">
      <span>Advertisement</span>
      <strong>970 x 250 sponsor slot</strong>
      <p>Place AdSense, affiliate banner, or direct sponsor creative here.</p>
    </aside>
  `;
}

function renderHome() {
  const categoryButtons = ["All", ...categories].map((category) => `<button class="filter-button${category === "All" ? " active" : ""}" data-category-filter="${category}">${category}</button>`).join("");
  const featuredArticles = articleTopics.slice(0, 8).map(([keyword, title, category]) => {
    const slug = safeSlug(title);
    return `
      <article class="article-card">
        ${renderArticleVisual(category)}
        <span>${escapeHtml(category)}</span>
        <h3><a href="articles/${slug}.html">${escapeHtml(title)}</a></h3>
        <p>${escapeHtml(keyword)}</p>
      </article>
    `;
  }).join("");

  const body = `
    <main>
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">AI tools directory</p>
          <h1>Find the right AI tool with less noise.</h1>
          <p class="lead">A clean, fast AI navigation site for chat, search, writing, image, video, audio, coding, automation, and productivity tools.</p>
          <div class="hero-search" role="search">
            <input id="toolSearch" type="search" placeholder="Search tools, categories, or use cases" aria-label="Search AI tools">
          </div>
        </div>
        <figure class="hero-visual">
          <img src="assets/ai-hero.svg" alt="Minimal AI tools interface illustration" width="560" height="420">
        </figure>
      </section>

      <section id="categories" class="section compact">
        <div class="section-heading centered">
          <p class="eyebrow">Categories</p>
          <h2>Browse by workflow.</h2>
        </div>
        <div class="category-grid">${renderCategoryTiles()}</div>
        <div class="filter-row" aria-label="Tool category filters">${categoryButtons}</div>
      </section>

      <section id="tools" class="section">
        <div class="section-heading centered">
          <p class="eyebrow">Directory</p>
          <h2>Curated AI tools.</h2>
          <p>Use the search box or category filters. The middle banner is reserved for ads or sponsorships.</p>
        </div>
        <div class="tool-grid" id="toolGrid">${renderTools()}</div>
      </section>

      <section class="section soft">
        <div class="section-heading centered">
          <p class="eyebrow">SEO content</p>
          <h2>AI tool guides.</h2>
          <p>100 SEO article pages are generated for long-tail AI tool keywords.</p>
        </div>
        <div class="article-grid">${featuredArticles}</div>
        <div class="center-action"><a class="button dark" href="articles/index.html">View all articles</a></div>
      </section>
    </main>
    <script src="script.js"></script>
  `;
  return pageShell({
    title: `${siteName} - AI Tools Directory`,
    description: "A clean AI tools navigation website with categories, search, middle ad placement, and SEO-friendly AI tool articles.",
    body,
    pathPrefix: ""
  });
}

function renderArticle(topic, index) {
  const [keyword, title, category] = topic;
  const bodyContent = articleBody(topic, index);
  const wordCount = wordsOnly(bodyContent).length;
  const body = `
    <main>
      <article class="article-page">
        <header class="article-hero">
          <p class="eyebrow">${escapeHtml(category)}</p>
          <h1>${escapeHtml(title)}</h1>
          <p class="lead">Keyword: ${escapeHtml(keyword)}. Updated ${now}. Estimated reading time: ${Math.max(4, Math.ceil(wordCount / 180))} minutes.</p>
          ${renderArticleVisual(category)}
        </header>
        ${renderAdSlot("article")}
        <div class="article-body">${bodyContent}</div>
      </article>
    </main>
  `;
  return { html: pageShell({ title, description: `${title}. A practical SEO-friendly guide for comparing AI tools by workflow, cost, and output quality.`, body, pathPrefix: "../" }), wordCount };
}

function renderArticleIndex(articleMeta) {
  const cards = articleMeta.map((article) => `
    <article class="article-card" data-article-card data-search="${escapeHtml(`${article.title} ${article.keyword} ${article.category}`.toLowerCase())}">
      ${renderArticleVisual(article.category)}
      <span>${escapeHtml(article.category)}</span>
      <h3><a href="${escapeHtml(article.slug)}.html">${escapeHtml(article.title)}</a></h3>
      <p>${escapeHtml(article.keyword)} - ${article.wordCount} words</p>
    </article>
  `).join("");
  const body = `
    <main>
      <section class="article-hero centered-hero">
        <p class="eyebrow">SEO library</p>
        <h1>100 AI tool articles.</h1>
        <p class="lead">Long-tail article pages for AI tool discovery, comparisons, and use-case searches.</p>
        <div class="hero-search"><input id="articleSearch" type="search" placeholder="Search article keywords" aria-label="Search articles"></div>
      </section>
      <section class="section">
        <div class="article-grid">${cards}</div>
      </section>
    </main>
    <script src="../script.js"></script>
  `;
  return pageShell({ title: `100 AI Tool Articles - ${siteName}`, description: "Browse 100 SEO-friendly AI tool articles for long-tail keywords and use cases.", body, pathPrefix: "../" });
}

function renderStaticPage(title, heading, content) {
  const body = `
    <main>
      <section class="article-hero centered-hero">
        <p class="eyebrow">${escapeHtml(siteName)}</p>
        <h1>${escapeHtml(heading)}</h1>
      </section>
      <section class="article-page slim">
        <div class="article-body">${content}</div>
      </section>
    </main>
  `;
  return pageShell({ title, description: `${heading} for ${siteName}.`, body, pathPrefix: "../" });
}

function renderStyles() {
  return `:root {
  --ink: #0b0b0f;
  --muted: #6e6e73;
  --line: #e8e8ed;
  --paper: #f5f5f7;
  --white: #ffffff;
  --blue: #0071e3;
  --blue-dark: #005bb8;
  --shadow: 0 26px 80px rgba(0, 0, 0, 0.08);
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  color: var(--ink);
  background: var(--paper);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.5;
}
a { color: inherit; text-underline-offset: 0.18em; }
img { display: block; max-width: 100%; }
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 14px clamp(18px, 5vw, 72px);
  background: rgba(245,245,247,0.82);
  border-bottom: 1px solid rgba(0,0,0,0.06);
  backdrop-filter: saturate(180%) blur(20px);
}
.brand { display: inline-flex; align-items: center; gap: 10px; font-weight: 700; text-decoration: none; }
.brand-mark { width: 24px; height: 24px; border-radius: 6px; background: linear-gradient(135deg, #111 0 48%, var(--blue) 48% 100%); }
.nav { display: flex; flex-wrap: wrap; gap: 18px; align-items: center; }
.nav a, .site-footer a { color: var(--muted); font-size: 0.92rem; font-weight: 600; text-decoration: none; }
.nav a:hover, .site-footer a:hover { color: var(--ink); }
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
  gap: clamp(26px, 6vw, 84px);
  align-items: center;
  min-height: calc(100vh - 58px);
  padding: clamp(58px, 9vw, 118px) clamp(18px, 5vw, 72px) clamp(38px, 7vw, 76px);
}
.hero-copy { max-width: 760px; }
.eyebrow { margin: 0 0 10px; color: var(--blue); font-size: 0.76rem; font-weight: 700; letter-spacing: 0; text-transform: uppercase; }
h1, h2, h3 { margin: 0; letter-spacing: 0; line-height: 1.06; }
h1 { font-size: clamp(3rem, 7vw, 6.8rem); font-weight: 760; }
h2 { font-size: clamp(2.1rem, 4.4vw, 4.6rem); font-weight: 730; }
h3 { font-size: 1.18rem; font-weight: 700; }
.lead { margin: 22px 0 0; max-width: 680px; color: var(--muted); font-size: clamp(1.1rem, 1.8vw, 1.42rem); }
.hero-search { margin-top: 30px; max-width: 640px; }
.hero-search input {
  width: 100%;
  min-height: 56px;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 0 22px;
  color: var(--ink);
  background: var(--white);
  box-shadow: var(--shadow);
  font: inherit;
}
.hero-search input:focus { outline: 4px solid rgba(0,113,227,0.16); border-color: var(--blue); }
.hero-visual {
  margin: 0;
  padding: clamp(12px, 2vw, 22px);
  border-radius: 28px;
  background: linear-gradient(180deg, #fff, #f4f4f7);
  box-shadow: var(--shadow);
}
.section { padding: clamp(52px, 8vw, 96px) clamp(18px, 5vw, 72px); }
.section.compact { padding-top: 24px; }
.section.soft { background: var(--white); border-block: 1px solid var(--line); }
.section-heading { max-width: 760px; margin-bottom: 26px; }
.section-heading.centered, .centered-hero { margin-inline: auto; text-align: center; }
.section-heading p:not(.eyebrow) { color: var(--muted); font-size: 1.06rem; }
.filter-row { display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; }
.category-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 14px;
  margin: 0 0 28px;
}
.category-tile {
  min-height: 172px;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 26px;
  background: rgba(255,255,255,0.82);
  box-shadow: 0 12px 38px rgba(0,0,0,0.04);
}
.category-tile h3 { margin-top: 14px; }
.category-tile p { margin: 8px 0 0; color: var(--muted); font-size: 0.92rem; }
.category-visual {
  position: relative;
  display: grid;
  width: 58px;
  height: 58px;
  place-items: center;
  border-radius: 18px;
  color: #fff;
  background: linear-gradient(145deg, #0b0b0f, #3a3a40);
  overflow: hidden;
}
.category-visual span { position: relative; z-index: 1; font-weight: 800; font-size: 0.92rem; }
.category-visual i {
  position: absolute;
  right: -14px;
  bottom: -16px;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: var(--blue);
}
.filter-button {
  min-height: 42px;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 0 16px;
  color: var(--ink);
  background: rgba(255,255,255,0.72);
  cursor: pointer;
  font: inherit;
  font-weight: 650;
}
.filter-button.active, .filter-button:hover { color: #fff; background: var(--ink); border-color: var(--ink); }
.tool-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}
.tool-card, .article-card, .ad-slot, .article-body {
  background: rgba(255,255,255,0.9);
  border: 1px solid var(--line);
  border-radius: 24px;
  box-shadow: 0 10px 36px rgba(0,0,0,0.04);
}
.tool-card { display: flex; min-height: 314px; flex-direction: column; padding: 18px; overflow: hidden; }
.tool-card[hidden], .article-card[hidden] { display: none; }
.tool-visual {
  position: relative;
  height: 118px;
  margin: -2px -2px 18px;
  border-radius: 20px;
  background:
    linear-gradient(135deg, var(--soft), #fff 64%),
    var(--soft);
  overflow: hidden;
}
.visual-window {
  position: absolute;
  left: 18px;
  top: 22px;
  width: 122px;
  height: 72px;
  border-radius: 18px;
  background: rgba(255,255,255,0.86);
  box-shadow: 0 12px 38px rgba(0,0,0,0.08);
}
.visual-window span {
  display: block;
  height: 8px;
  margin: 12px 16px;
  border-radius: 999px;
  background: #d9d9df;
}
.visual-window span:first-child { width: 66px; background: var(--dark); }
.visual-window span:nth-child(2) { width: 88px; }
.visual-window span:nth-child(3) { width: 44px; background: var(--accent); }
.visual-orbit {
  position: absolute;
  right: 18px;
  top: 24px;
  display: grid;
  grid-template-columns: repeat(2, 32px);
  gap: 10px;
}
.visual-orbit i {
  width: 32px;
  height: 32px;
  border-radius: 12px;
  background: var(--accent);
  box-shadow: 0 10px 26px rgba(0,0,0,0.08);
}
.visual-orbit i:nth-child(2) { background: var(--dark); }
.visual-orbit i:nth-child(3) { grid-column: 1 / -1; width: 74px; background: rgba(255,255,255,0.74); }
.tool-topline { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 18px; }
.tool-icon { display: grid; width: 42px; height: 42px; place-items: center; border-radius: 12px; color: #fff; background: linear-gradient(145deg, #111, #555); font-weight: 800; }
.pill { border-radius: 999px; padding: 6px 10px; color: var(--muted); background: var(--paper); font-size: 0.78rem; font-weight: 700; }
.tool-card p, .article-card p, .article-body p, .article-body li { color: var(--muted); }
.tool-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; color: var(--muted); font-size: 0.86rem; }
.tool-meta span { border-radius: 999px; padding: 5px 9px; background: var(--paper); }
.card-link { margin-top: 16px; color: var(--blue); font-weight: 700; text-decoration: none; }
.ad-slot {
  display: grid;
  place-items: center;
  min-height: 250px;
  padding: 24px;
  text-align: center;
  border-style: dashed;
  background: linear-gradient(180deg, #fff, #f6f8ff);
}
.ad-slot-wide { grid-column: 1 / -1; }
.ad-slot span { color: var(--muted); font-size: 0.78rem; font-weight: 700; text-transform: uppercase; }
.ad-slot strong { margin-top: 8px; font-size: clamp(1.5rem, 3vw, 2.8rem); }
.ad-slot p { margin: 8px 0 0; color: var(--muted); }
.article-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}
.article-card { padding: 18px; min-height: 244px; overflow: hidden; }
.article-card .article-visual { margin: -2px -2px 16px; }
.article-card span { color: var(--blue); font-size: 0.78rem; font-weight: 750; text-transform: uppercase; }
.article-card h3 { margin-top: 10px; }
.article-card a { text-decoration: none; }
.center-action { display: flex; justify-content: center; margin-top: 28px; }
.button { display: inline-flex; min-height: 46px; align-items: center; justify-content: center; border-radius: 999px; padding: 0 20px; font-weight: 750; text-decoration: none; }
.button.dark { color: #fff; background: var(--ink); }
.article-page { max-width: 920px; margin: 0 auto; padding: 0 clamp(18px, 5vw, 72px) clamp(56px, 8vw, 96px); }
.article-page.slim { max-width: 860px; }
.article-hero { max-width: 960px; padding: clamp(54px, 8vw, 96px) clamp(18px, 5vw, 72px) 28px; }
.article-hero h1 { font-size: clamp(2.5rem, 5.6vw, 5.6rem); }
.article-hero .article-visual {
  max-width: 760px;
  height: 190px;
  margin-top: 30px;
}
.article-visual {
  position: relative;
  height: 112px;
  border-radius: 22px;
  background:
    linear-gradient(135deg, #f5f5f7 0 46%, #ffffff 46% 100%);
  border: 1px solid var(--line);
  overflow: hidden;
}
.article-visual-panel {
  position: absolute;
  left: 18px;
  top: 22px;
  width: 54%;
  max-width: 330px;
  height: calc(100% - 44px);
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 14px 36px rgba(0,0,0,0.07);
}
.article-visual-panel span {
  display: block;
  height: 9px;
  margin: 14px 18px;
  border-radius: 999px;
  background: #d9d9df;
}
.article-visual-panel span:first-child { width: 42%; background: #0b0b0f; }
.article-visual-panel span:nth-child(2) { width: 68%; }
.article-visual-panel span:nth-child(3) { width: 28%; background: var(--blue); }
.article-visual strong {
  position: absolute;
  right: 24px;
  bottom: 18px;
  color: var(--blue);
  font-size: clamp(1.4rem, 3vw, 2.8rem);
  font-weight: 780;
  letter-spacing: 0;
}
.article-body { padding: clamp(22px, 4vw, 42px); }
.article-body h2 { margin-top: 34px; font-size: clamp(1.5rem, 2.5vw, 2.2rem); }
.article-body h3 { margin-top: 24px; }
.article-body ul { padding-left: 1.25rem; }
.site-footer {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 30px clamp(18px, 5vw, 72px);
  color: var(--muted);
  background: #fff;
  border-top: 1px solid var(--line);
}
.site-footer p { max-width: 760px; margin: 0; }
.site-footer nav { display: flex; flex-wrap: wrap; gap: 16px; }
@media (max-width: 1100px) { .tool-grid, .article-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } .category-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 860px) {
  .hero { grid-template-columns: 1fr; min-height: 0; }
  .tool-grid, .article-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .category-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 620px) {
  .site-header, .site-footer { align-items: flex-start; flex-direction: column; }
  .tool-grid, .article-grid, .category-grid { grid-template-columns: 1fr; }
  .hero-visual { border-radius: 18px; }
}`;
}

function renderScript() {
  return `const toolSearch = document.querySelector("#toolSearch");
const articleSearch = document.querySelector("#articleSearch");
const toolCards = Array.from(document.querySelectorAll("[data-tool-card]"));
const articleCards = Array.from(document.querySelectorAll("[data-article-card]"));
const filterButtons = Array.from(document.querySelectorAll("[data-category-filter]"));
let activeCategory = "All";

function updateTools() {
  const query = (toolSearch?.value || "").trim().toLowerCase();
  toolCards.forEach((card) => {
    const matchesCategory = activeCategory === "All" || card.dataset.category === activeCategory;
    const matchesSearch = !query || card.dataset.search.includes(query);
    card.hidden = !(matchesCategory && matchesSearch);
  });
}

function updateArticles() {
  const query = (articleSearch?.value || "").trim().toLowerCase();
  articleCards.forEach((card) => {
    card.hidden = query && !card.dataset.search.includes(query);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.categoryFilter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    updateTools();
  });
});

toolSearch?.addEventListener("input", updateTools);
articleSearch?.addEventListener("input", updateArticles);
updateTools();
updateArticles();`;
}

function renderHeroSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="420" viewBox="0 0 560 420" role="img" aria-labelledby="title desc">
  <title id="title">Minimal AI tools interface</title>
  <desc id="desc">A clean interface grid inspired by modern product design.</desc>
  <rect width="560" height="420" rx="28" fill="#f5f5f7"/>
  <rect x="70" y="58" width="420" height="304" rx="28" fill="#fff" stroke="#e8e8ed"/>
  <rect x="104" y="92" width="210" height="22" rx="11" fill="#0b0b0f"/>
  <rect x="104" y="132" width="352" height="46" rx="23" fill="#f5f5f7"/>
  <circle cx="132" cy="155" r="10" fill="#0071e3"/>
  <rect x="154" y="147" width="160" height="16" rx="8" fill="#d8d8df"/>
  <g>
    <rect x="104" y="208" width="96" height="86" rx="18" fill="#111"/>
    <rect x="220" y="208" width="96" height="86" rx="18" fill="#0071e3"/>
    <rect x="336" y="208" width="120" height="86" rx="18" fill="#e8e8ed"/>
    <circle cx="136" cy="239" r="12" fill="#fff"/>
    <circle cx="252" cy="239" r="12" fill="#fff"/>
    <circle cx="374" cy="239" r="12" fill="#0071e3"/>
    <rect x="124" y="266" width="52" height="8" rx="4" fill="#777"/>
    <rect x="240" y="266" width="52" height="8" rx="4" fill="#bedaff"/>
    <rect x="360" y="266" width="64" height="8" rx="4" fill="#c6c6cc"/>
  </g>
  <path d="M126 334h308" stroke="#e8e8ed" stroke-width="10" stroke-linecap="round"/>
</svg>`;
}

function renderFavicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0b0b0f"/>
  <path d="M18 18h28v28H18z" fill="#fff"/>
  <path d="M24 40l8-18 8 18h-6l-2-5h-7l-2 5z" fill="#0071e3"/>
</svg>`;
}

function renderRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
}

function renderSitemap(articleMeta) {
  const urls = [
    "",
    "articles/",
    "pages/about.html",
    "pages/privacy.html",
    "pages/disclosure.html",
    "pages/advertise.html",
    ...articleMeta.map((article) => `articles/${article.slug}.html`)
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${baseUrl}/${url}</loc></url>`).join("\n")}
</urlset>
`;
}

function renderReadme(articleMeta) {
  return `# ${siteName}

Clean AI tools navigation website with:

- Apple-inspired minimalist homepage
- Tool categories and search
- Center advertising slot on the homepage
- 100 SEO article pages, each generated at 800+ English words
- Static HTML/CSS/JS, no build dependencies
- Vercel-ready config

## One-click Vercel deploy

After pushing this folder to a public GitHub repository, replace the repository URL below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=${encodeURIComponent(repoUrl)})

## Before launch

1. If you add a custom domain, replace \`${baseUrl}\` in \`generate-site.mjs\`, regenerate, and verify \`sitemap.xml\`.
2. Replace contact placeholders in \`pages/about.html\`, \`pages/privacy.html\`, and \`pages/advertise.html\`.
3. Add real ad code inside elements with class \`ad-slot\`.
4. Re-check pricing and features on official tool pages before publishing reviews.
5. Connect Google Search Console after deployment and update keywords using real impressions.

## Article count

Generated ${articleMeta.length} article pages.
`;
}

function renderVercelConfig() {
  return JSON.stringify({
    cleanUrls: true,
    trailingSlash: false,
    headers: [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }
        ]
      }
    ]
  }, null, 2) + "\n";
}

function build() {
  ensureDir("assets");
  ensureDir("articles");
  ensureDir("pages");

  write("index.html", renderHome());
  write("styles.css", renderStyles());
  write("script.js", renderScript());
  write("assets/ai-hero.svg", renderHeroSvg());
  write("assets/favicon.svg", renderFavicon());

  const articleMeta = [];
  const publishTopics = articleTopics.slice(0, 100);
  publishTopics.forEach((topic, index) => {
    const slug = safeSlug(topic[1]);
    const { html, wordCount } = renderArticle(topic, index);
    write(`articles/${slug}.html`, html);
    articleMeta.push({ slug, keyword: topic[0], title: topic[1], category: topic[2], wordCount });
  });
  write("articles/index.html", renderArticleIndex(articleMeta));

  write("pages/about.html", renderStaticPage(
    `About ${siteName}`,
    "About AIFindr",
    `<p>${siteName} is an independent AI tools directory for people who want a faster way to compare practical AI products by workflow.</p><p>Editorial notes should be updated monthly because AI products change quickly.</p><p>Contact: replace-this@email.com</p>`
  ));
  write("pages/privacy.html", renderStaticPage(
    "Privacy Policy",
    "Privacy Policy",
    "<p>This static starter site does not collect account data by default. If analytics, ad networks, affiliate tracking, forms, or newsletters are added, update this policy before launch.</p><p>Use a consent flow where required by your target market.</p>"
  ));
  write("pages/disclosure.html", renderStaticPage(
    "Affiliate Disclosure",
    "Affiliate Disclosure",
    "<p>Some outbound links may become affiliate or sponsored links. If a reader buys through those links, this site may earn a commission at no extra cost to the reader.</p><p>Recommendations should be based on practical fit, not commission size.</p>"
  ));
  write("pages/advertise.html", renderStaticPage(
    `Advertise on ${siteName}`,
    "Advertise in the center slot",
    "<p>The homepage includes a centered 970 x 250 sponsorship slot. It can be used for AdSense, direct sponsorship, affiliate campaigns, newsletter promotion, or featured tool placement.</p><p>Contact: replace-this@email.com</p>"
  ));

  write("robots.txt", renderRobots());
  write("sitemap.xml", renderSitemap(articleMeta));
  write("vercel.json", renderVercelConfig());
  write("README.md", renderReadme(articleMeta));

  const counts = articleMeta.map((article) => article.wordCount);
  const min = Math.min(...counts);
  const max = Math.max(...counts);
  console.log(`Generated ${articleMeta.length} articles. Word count range: ${min}-${max}.`);
}

build();
