package usecase

import (
	"context"
	"github.com/ayay459547/quant-backend/internal/domain"
)

type industryUsecase struct {
	industryRepo domain.IndustryRepository
}

func NewIndustryUsecase(repo domain.IndustryRepository) domain.IndustryUsecase {
	return &industryUsecase{
		industryRepo: repo,
	}
}

func (u *industryUsecase) Fetch(ctx context.Context) ([]domain.Industry, error) {
	return u.industryRepo.Fetch(ctx)
}

func (u *industryUsecase) Store(ctx context.Context, industry *domain.Industry) error {
	return u.industryRepo.Store(ctx, industry)
}
