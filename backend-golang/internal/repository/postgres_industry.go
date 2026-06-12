package repository

import (
	"context"
	"github.com/ayay459547/quant-backend/internal/domain"
	"gorm.io/gorm"
)

type postgresIndustryRepository struct {
	Conn *gorm.DB
}

func NewPostgresIndustryRepository(conn *gorm.DB) domain.IndustryRepository {
	return &postgresIndustryRepository{conn}
}

func (m *postgresIndustryRepository) Fetch(ctx context.Context) ([]domain.Industry, error) {
	var res []domain.Industry
	err := m.Conn.WithContext(ctx).Find(&res).Error
	return res, err
}

func (m *postgresIndustryRepository) GetByID(ctx context.Context, id int) (domain.Industry, error) {
	var res domain.Industry
	err := m.Conn.WithContext(ctx).First(&res, id).Error
	return res, err
}

func (m *postgresIndustryRepository) Store(ctx context.Context, industry *domain.Industry) error {
	return m.Conn.WithContext(ctx).Create(industry).Error
}
