package domain

import (
	"context"
	"time"
)

type Industry struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	Category    string    `json:"category"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
}

type Stock struct {
	Symbol       string    `json:"symbol"`
	Name         string    `json:"name"`
	IndustryID   int       `json:"industry_id"`
	MarketType   string    `json:"market_type"`
	ListingDate  time.Time `json:"listing_date"`
	IsActive     bool      `json:"is_active"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type IndustryRepository interface {
	Fetch(ctx context.Context) ([]Industry, error)
	GetByID(ctx context.Context, id int) (Industry, error)
	Store(ctx context.Context, industry *Industry) error
}

type StockRepository interface {
	Fetch(ctx context.Context) ([]Stock, error)
	GetBySymbol(ctx context.Context, symbol string) (Stock, error)
	Store(ctx context.Context, stock *Stock) error
}

type IndustryUsecase interface {
	Fetch(ctx context.Context) ([]Industry, error)
	Store(ctx context.Context, industry *Industry) error
}

type StockUsecase interface {
	Fetch(ctx context.Context) ([]Stock, error)
	GetBySymbol(ctx context.Context, symbol string) (Stock, error)
	Store(ctx context.Context, stock *Stock) error
}
