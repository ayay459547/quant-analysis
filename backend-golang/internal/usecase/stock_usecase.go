package usecase

import (
	"context"
	"github.com/ayay459547/quant-backend/internal/domain"
)

type stockUsecase struct {
	stockRepo domain.StockRepository
}

func NewStockUsecase(repo domain.StockRepository) domain.StockUsecase {
	return &stockUsecase{
		stockRepo: repo,
	}
}

func (u *stockUsecase) Fetch(ctx context.Context) ([]domain.Stock, error) {
	return u.stockRepo.Fetch(ctx)
}

func (u *stockUsecase) GetBySymbol(ctx context.Context, symbol string) (domain.Stock, error) {
	return u.stockRepo.GetBySymbol(ctx, symbol)
}

func (u *stockUsecase) Store(ctx context.Context, stock *domain.Stock) error {
	return u.stockRepo.Store(ctx, stock)
}
