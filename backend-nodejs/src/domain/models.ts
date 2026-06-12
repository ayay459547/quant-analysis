export interface Industry {
  id?: number;
  name: string;
  category?: string;
  description?: string;
  created_at?: Date;
}

export interface Stock {
  symbol: string;
  name: string;
  industry_id?: number;
  market_type?: string;
  listing_date?: Date;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
