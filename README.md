# ShareMarket - Next.js Share Market Website

A modern, server-side rendered (SSR) Next.js website for share market data with SEO optimization, dynamic content, and beautiful UI.

## 🚀 Features

### Homepage Sections
- **Hero Section** - Eye-catching gradient text with animated background
- **Intraday Widget** - Live stock chart using Alpha Vantage API for Reliance Industries
- **Invest in Stocks** - Feature cards and top performing stocks
- **IPO Section** - Upcoming, open, and closed IPOs
- **Mutual Funds** - Top performing mutual funds with ratings and returns
- **Stock Events** - Important corporate events and announcements
- **Share Market News** - Latest news with sentiment indicators
- **FAQ** - Interactive accordion-style FAQ section

### Additional Pages
- **F&O (Futures & Options)** - Comprehensive F&O trading page with contracts and strategies
- **About Us** - Company information, mission, vision, and team

## 🎨 Design Features

- **Modern Dark Theme** - Stunning dark UI with blue/purple gradients
- **Glassmorphism** - Beautiful glass-effect cards with backdrop blur
- **Smooth Animations** - Fade-in, slide-in, and gradient animations
- **Responsive Design** - Mobile-first approach, works on all devices
- **Custom Scrollbar** - Styled scrollbar matching the theme
- **Gradient Text** - Eye-catching gradient text effects

## 🔍 SEO Optimization

- **Server-Side Rendering (SSR)** - All pages are server-rendered for SEO
- **Meta Tags** - Comprehensive meta tags for each page
- **OpenGraph** - Social media sharing optimization
- **JSON-LD Schema** - Structured data for search engines
- **Semantic HTML** - Proper heading hierarchy and semantic elements
- **Unique IDs** - All interactive elements have unique IDs
- **Keywords** - Targeted keywords for share market, IPO, mutual funds, etc.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Fonts**: Inter (optimized with Next.js fonts)
- **Data Source**: Alpha Vantage API

## 📦 Installation

```bash
# Navigate to the project directory
cd share-market-app

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 API Integration

### Alpha Vantage API
The intraday chart uses the Alpha Vantage API to fetch real-time stock data for Reliance Industries (RELIANCE.BSE).

**Endpoint**: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=RELIANCE.BSE&outputsize=full&apikey=demo`

**Note**: The demo API key has rate limits. For production, get your own API key from [Alpha Vantage](https://www.alphavantage.co/).

To update the API key, modify `/src/lib/api.ts`:
```typescript
const API_KEY = 'your_api_key_here';
```

## 📁 Project Structure

```
src/
├── app/
│   ├── about/          # About Us page
│   ├── fo/             # F&O page
│   ├── page.tsx        # Homepage
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── IntradayWidget.tsx
│   ├── StocksSection.tsx
│   ├── IPOSection.tsx
│   ├── MutualFundsSection.tsx
│   ├── StockEventsSection.tsx
│   ├── NewsSection.tsx
│   └── FAQSection.tsx
├── lib/
│   └── api.ts          # API utility functions
└── types/
    └── index.ts        # TypeScript type definitions
```

## 🎯 SEO Keywords

- Share Market
- Stock Market India
- Intraday Trading
- IPO Investment
- Mutual Funds
- Stock Market News
- NSE BSE Stocks
- Investment Platform
- F&O Trading
- Futures and Options

## 📱 Pages

1. **Homepage** (`/`) - Main landing page with all sections
2. **F&O** (`/fo`) - Futures & Options trading page
3. **About Us** (`/about`) - Company information

## 🎨 Color Palette

- Background: `#0f0f1e`
- Primary: `#3b82f6` (Blue)
- Purple: `#8b5cf6`
- Pink: `#ec4899`
- Success: `#10b981` (Green)
- Danger: `#ef4444` (Red)
- Warning: `#f59e0b` (Orange)

## 📊 Mock Data

For sections without API integration (IPO, Mutual Funds, News, Events), the app uses mock data. This can be replaced with real API calls:

- IPO data can be fetched from financial APIs
- Mutual fund data from fund houses or aggregators
- News from news APIs or RSS feeds
- Events from corporate announcement APIs

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
The app can be deployed on any platform that supports Next.js:
- Netlify
- AWS Amplify
- Google Cloud Platform
- Self-hosted with Node.js

## 📄 License

This project is created for educational and demonstration purposes.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📞 Support

For any questions or issues, please refer to the FAQ section on the website or contact support.

---

Built with ❤️ using Next.js and modern web technologies
