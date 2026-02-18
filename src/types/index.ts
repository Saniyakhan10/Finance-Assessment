export interface StockData {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface AlphaVantageResponse {
    'Meta Data': {
        '1. Information': string;
        '2. Symbol': string;
        '3. Last Refreshed': string;
        '4. Output Size': string;
        '5. Time Zone': string;
    };
    'Time Series (Daily)': {
        [date: string]: {
            '1. open': string;
            '2. high': string;
            '3. low': string;
            '4. close': string;
            '5. volume': string;
        };
    };
}

export interface NewsData {
    title: string;
    summary: string;
    time: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    source: string;
    url: string;
}

export interface AlphaVantageNewsResponse {
    items: string;
    sentiment_score_definition: string;
    relevance_score_definition: string;
    feed: Array<{
        title: string;
        url: string;
        time_published: string;
        authors: string[];
        summary: string;
        banner_image: string;
        source: string;
        category_within_source: string;
        source_domain: string;
        topics: Array<{
            topic: string;
            relevance_score: string;
        }>;
        overall_sentiment_score: number;
        overall_sentiment_label: string;
    }>;
}


export interface IPO {
    company: string;
    openDate: string;
    priceRange: string;
    status: 'upcoming' | 'open' | 'closed';
    sub: string;
}

export interface StockItem {
    ticker: string;
    price: string;
    change_amount: string;
    change_percentage: string;
    volume: string;
}

export interface AlphaVantageTopMoversResponse {
    metadata: string;
    last_updated: string;
    top_gainers: StockItem[];
    top_losers: StockItem[];
    most_actively_traded: StockItem[];
}

export interface CompanyOverview {
    Symbol: string;
    AssetType: string;
    Name: string;
    Description: string;
    CIK: string;
    Exchange: string;
    Currency: string;
    Country: string;
    Sector: string;
    Industry: string;
    Address: string;
    FiscalYearEnd: string;
    LatestQuarter: string;
    MarketCapitalization: string;
    EBITDA: string;
    PERatio: string;
    PEGRatio: string;
    BookValue: string;
    DividendPerShare: string;
    DividendYield: string;
    EPS: string;
    RevenuePerShareTTM: string;
    ProfitMargin: string;
    OperatingMarginTTM: string;
    ReturnOnAssetsTTM: string;
    ReturnOnEquityTTM: string;
    RevenueTTM: string;
    GrossProfitTTM: string;
    DilutedEPSTTM: string;
    QuarterlyEarningsGrowthYOY: string;
    QuarterlyRevenueGrowthYOY: string;
    AnalystTargetPrice: string;
    TrailingPE: string;
    ForwardPE: string;
    PriceToSalesRatioTTM: string;
    PriceToBookRatio: string;
    EVToRevenue: string;
    EVToEBITDA: string;
    Beta: string;
    "52WeekHigh": string;
    "52WeekLow": string;
    "50DayMovingAverage": string;
    "200DayMovingAverage": string;
    SharesOutstanding: string;
    DividendDate: string;
    ExDividendDate: string;
}

export interface IPOCalendarItem {
    symbol: string;
    name: string;
    ipoDate: string;
    priceRangeLow: string;
    priceRangeHigh: string;
    currency: string;
    exchange: string;
}

export interface CommoditySpot {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    timestamp: string;
}

export interface CommodityHistory {
    date: string;
    value: number;
}

export interface RetailSalesData {
    name: string;
    interval: string;
    unit: string;
    data: Array<{
        date: string;
        value: string;
    }>;
}
