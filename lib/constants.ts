// Site constants
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://crypticdaily.com";
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Cryptic Daily";
export const SITE_DESCRIPTION =
  "Your daily source for cryptocurrency news, market analysis, and blockchain insights.";

// Category color mapping
export const CATEGORY_COLORS: Record<string, string> = {
  defi: "#7C3AED",
  nfts: "#EC4899",
  markets: "#10B981",
  regulation: "#F59E0B",
  web3: "#00D4FF",
  bitcoin: "#F7931A",
  ethereum: "#627EEA",
};

export const CATEGORY_LABELS: Record<string, string> = {
  defi: "DeFi",
  nfts: "NFTs",
  markets: "Markets",
  regulation: "Regulation",
  web3: "Web3",
  bitcoin: "Bitcoin",
  ethereum: "Ethereum",
};

export const CATEGORIES = [
  { slug: "defi", title: "DeFi", description: "Decentralized Finance news and analysis" },
  { slug: "nfts", title: "NFTs", description: "Non-fungible tokens and digital collectibles" },
  { slug: "markets", title: "Markets", description: "Crypto market data and trading insights" },
  { slug: "regulation", title: "Regulation", description: "Government policy and crypto regulation" },
  { slug: "web3", title: "Web3", description: "The decentralized internet and Web3 ecosystem" },
  { slug: "bitcoin", title: "Bitcoin", description: "BTC news and Bitcoin ecosystem updates" },
  { slug: "ethereum", title: "Ethereum", description: "ETH news and Ethereum ecosystem updates" },
];

// Mock coin data for when CoinGecko API is unavailable
export const MOCK_COINS = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", price: 67234.12, change24h: 2.4, marketCap: 1320000000000, volume: 28400000000, logo: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png", rank: 1, sparkline: [62000, 63500, 64200, 65800, 66100, 65900, 67234] },
  { id: "ethereum", symbol: "ETH", name: "Ethereum", price: 3521.45, change24h: -1.2, marketCap: 423000000000, volume: 14200000000, logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png", rank: 2, sparkline: [3600, 3580, 3550, 3520, 3490, 3510, 3521] },
  { id: "binancecoin", symbol: "BNB", name: "BNB", price: 412.78, change24h: 0.8, marketCap: 63600000000, volume: 1820000000, logo: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png", rank: 3, sparkline: [405, 408, 410, 407, 411, 409, 412] },
  { id: "solana", symbol: "SOL", name: "Solana", price: 182.34, change24h: 5.7, marketCap: 84300000000, volume: 5670000000, logo: "https://assets.coingecko.com/coins/images/4128/large/solana.png", rank: 4, sparkline: [168, 172, 175, 178, 180, 179, 182] },
  { id: "cardano", symbol: "ADA", name: "Cardano", price: 0.623, change24h: -0.9, marketCap: 21900000000, volume: 893000000, logo: "https://assets.coingecko.com/coins/images/975/large/cardano.png", rank: 5, sparkline: [0.63, 0.628, 0.625, 0.622, 0.624, 0.621, 0.623] },
  { id: "ripple", symbol: "XRP", name: "XRP", price: 0.548, change24h: 1.3, marketCap: 30100000000, volume: 1240000000, logo: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png", rank: 6, sparkline: [0.535, 0.538, 0.542, 0.540, 0.545, 0.543, 0.548] },
  { id: "dogecoin", symbol: "DOGE", name: "Dogecoin", price: 0.182, change24h: 3.2, marketCap: 26000000000, volume: 2100000000, logo: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png", rank: 7, sparkline: [0.172, 0.175, 0.177, 0.179, 0.180, 0.181, 0.182] },
  { id: "polkadot", symbol: "DOT", name: "Polkadot", price: 8.94, change24h: -2.1, marketCap: 12700000000, volume: 567000000, logo: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png", rank: 8, sparkline: [9.20, 9.10, 9.05, 9.00, 8.95, 8.92, 8.94] },
  { id: "avalanche-2", symbol: "AVAX", name: "Avalanche", price: 38.72, change24h: 4.1, marketCap: 16200000000, volume: 723000000, logo: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png", rank: 9, sparkline: [36.5, 37.0, 37.5, 38.0, 38.3, 38.5, 38.72] },
  { id: "chainlink", symbol: "LINK", name: "Chainlink", price: 17.23, change24h: 1.8, marketCap: 10600000000, volume: 498000000, logo: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png", rank: 10, sparkline: [16.8, 16.9, 17.0, 17.1, 17.15, 17.20, 17.23] },
];

// Mock authors
export const MOCK_AUTHORS = [
  {
    id: "author-1",
    name: "Alex Rivera",
    slug: "alex-rivera",
    role: "Senior Crypto Analyst",
    bio: "Alex has been covering cryptocurrency markets since 2017 with a focus on Bitcoin and DeFi protocols. Former financial analyst turned crypto journalist.",
    twitter: "https://twitter.com/alexrivera_crypto",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "author-2",
    name: "Sarah Chen",
    slug: "sarah-chen",
    role: "NFT & Web3 Reporter",
    bio: "Sarah specializes in NFT markets and Web3 culture, having written for major crypto publications. She brings clarity to complex blockchain concepts.",
    twitter: "https://twitter.com/sarachen_web3",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "author-3",
    name: "Marcus Johnson",
    slug: "marcus-johnson",
    role: "Market & Regulation Editor",
    bio: "Marcus covers regulatory developments and market macro analysis. Background in traditional finance and securities law with 8 years in crypto.",
    twitter: "https://twitter.com/marcusj_finance",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
];

// Mock articles
export const MOCK_ARTICLES = [
  {
    id: "article-1",
    title: "Bitcoin ETF Approval Sends BTC Surging Past $67,000 as Institutional Demand Soars",
    slug: "bitcoin-etf-approval-btc-surges",
    excerpt: "The landmark approval of spot Bitcoin ETFs by the SEC has triggered a massive price rally, with institutional investors pouring billions into the new vehicles within the first 48 hours of trading.",
    coverImage: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=450&fit=crop",
    category: { slug: "bitcoin", title: "Bitcoin", color: "#F7931A" },
    author: { name: "Alex Rivera", slug: "alex-rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    readingTime: 5,
    tags: [{ title: "Bitcoin", slug: "bitcoin" }, { title: "ETF", slug: "etf" }, { title: "SEC", slug: "sec" }, { title: "Institutional", slug: "institutional" }],
    featured: true,
    views: 18420,
    body: `<p>The Securities and Exchange Commission's approval of the first-ever spot Bitcoin Exchange-Traded Funds has sent shockwaves through the cryptocurrency market, with Bitcoin's price surging past the $67,000 mark for the first time in months.</p>\n\n<h2>Massive Inflows in First 48 Hours</h2>\n\n<p>The new ETF vehicles collectively attracted over $4.6 billion in inflows within the first two days of trading, with BlackRock's iShares Bitcoin Trust (IBIT) leading the charge with $2.1 billion in assets under management.</p>\n\n<p>Market analysts say this represents one of the most successful ETF launches in history, surpassing the gold ETF launch in 2004 by a significant margin when adjusted for market size.</p>\n\n<h2>Institutional Floodgates Open</h2>\n\n<p>Major financial institutions that had been sitting on the sidelines are now able to gain direct Bitcoin exposure through regulated vehicles. Pension funds, endowments, and wealth managers are rushing to allocate to the new ETFs.</p>\n\n<blockquote>This changes the game entirely. We're now in an era where Bitcoin can sit in a traditional brokerage account alongside stocks and bonds. — Michael Saylor, MicroStrategy CEO</blockquote>\n\n<h2>What This Means for Crypto Markets</h2>\n\n<p>The approval creates a powerful precedent for other crypto assets. Ethereum ETF applications are already being reviewed, and analysts expect approvals for ETH within the next six months.</p>`,
  },
  {
    id: "article-2",
    title: "Ethereum's Layer 2 Ecosystem Explodes: TVL Crosses $45 Billion Led by Arbitrum and Base",
    slug: "ethereum-layer2-tvl-crosses-45-billion",
    excerpt: "Ethereum's scaling solutions are hitting new milestones as total value locked across Layer 2 networks surpasses $45 billion, with Base showing the most impressive growth trajectory.",
    coverImage: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&h=450&fit=crop",
    category: { slug: "ethereum", title: "Ethereum", color: "#627EEA" },
    author: { name: "Sarah Chen", slug: "sarah-chen", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    readingTime: 6,
    tags: [{ title: "Ethereum", slug: "ethereum" }, { title: "Layer2", slug: "layer2" }, { title: "Arbitrum", slug: "arbitrum" }, { title: "Base", slug: "base" }, { title: "DeFi", slug: "defi" }],
    featured: false,
    views: 9830,
    body: `<p>Ethereum's Layer 2 ecosystem has reached a new milestone as the total value locked across all L2 solutions has crossed the $45 billion mark, cementing the scaling thesis that has been central to Ethereum's development roadmap.</p>\n\n<h2>Base Leads Monthly Growth</h2>\n\n<p>Coinbase's Base network has emerged as the fastest-growing L2 in January, adding over $3.2 billion in TVL over the past 30 days alone. The network's deep integration with Coinbase's massive user base is proving to be a significant advantage.</p>`,
  },
  {
    id: "article-3",
    title: "DeFi Protocol Aave Launches Real-World Asset Lending, Bridging TradFi and Crypto",
    slug: "aave-real-world-asset-lending-launch",
    excerpt: "Aave's new RWA lending market allows institutional borrowers to use tokenized real-world assets as collateral, marking a major step toward integrating traditional finance with DeFi.",
    coverImage: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=450&fit=crop",
    category: { slug: "defi", title: "DeFi", color: "#7C3AED" },
    author: { name: "Alex Rivera", slug: "alex-rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    readingTime: 7,
    tags: [{ title: "DeFi", slug: "defi" }, { title: "Aave", slug: "aave" }, { title: "RWA", slug: "rwa" }, { title: "TradFi", slug: "tradfi" }],
    featured: false,
    views: 7210,
    body: `<p>Aave, one of the largest decentralized lending protocols, has launched a groundbreaking real-world asset lending market that allows institutional borrowers to use tokenized real estate, treasury bills, and corporate bonds as collateral for crypto loans.</p>`,
  },
  {
    id: "article-4",
    title: "SEC Proposes New Framework for Crypto Asset Classification: What Traders Need to Know",
    slug: "sec-crypto-asset-classification-framework",
    excerpt: "The SEC has unveiled a comprehensive proposed framework that would classify most altcoins as securities while providing a clear path for exchanges to register as broker-dealers.",
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop",
    category: { slug: "regulation", title: "Regulation", color: "#F59E0B" },
    author: { name: "Marcus Johnson", slug: "marcus-johnson", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    readingTime: 8,
    tags: [{ title: "SEC", slug: "sec" }, { title: "Regulation", slug: "regulation" }, { title: "Compliance", slug: "compliance" }, { title: "Altcoins", slug: "altcoins" }],
    featured: false,
    views: 12650,
    body: `<p>The Securities and Exchange Commission has proposed a sweeping new regulatory framework for cryptocurrency assets that could fundamentally reshape how digital assets are bought, sold, and traded in the United States.</p>`,
  },
  {
    id: "article-5",
    title: "Solana NFT Market Rebounds: Monthly Volume Hits $320M as New Collections Drive Traffic",
    slug: "solana-nft-market-rebounds-320m-volume",
    excerpt: "The Solana NFT market is experiencing a significant recovery with monthly trading volumes reaching $320 million, driven by innovative new generative art collections and gaming NFT projects.",
    coverImage: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&h=450&fit=crop",
    category: { slug: "nfts", title: "NFTs", color: "#EC4899" },
    author: { name: "Sarah Chen", slug: "sarah-chen", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 4,
    tags: [{ title: "NFTs", slug: "nfts" }, { title: "Solana", slug: "solana" }, { title: "Digital Art", slug: "digital-art" }, { title: "Gaming", slug: "gaming" }],
    featured: false,
    views: 5940,
    body: `<p>The Solana NFT ecosystem is staging an impressive comeback following months of subdued activity, with monthly trading volumes surging to $320 million in January — a 45% increase from December's figures.</p>`,
  },
];

// Trending articles (by views)
export const TRENDING_ARTICLES = [...MOCK_ARTICLES].sort((a, b) => b.views - a.views).slice(0, 5);
