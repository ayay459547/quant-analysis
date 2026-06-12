package repository

import (
	"context"
	"github.com/ayay459547/quant-backend/internal/domain"
	"gorm.io/gorm"
)

type postgresStockRepository struct {
	Conn *gorm.DB
}

func NewPostgresStockRepository(conn *gorm.DB) domain.StockRepository {
	return &postgresStockRepository{conn}
}

func (m *postgresStockRepository) Fetch(ctx context.Context) ([]domain.Stock, error) {
	var res []domain.Stock
	err := m.Conn.WithContext(ctx).Find(&res).Error
	return res, err
}

func (m *postgresStockRepository) GetBySymbol(ctx context.Context, symbol string) (domain.Stock, error) {
	var res domain.Stock
	err := m.Conn.WithContext(ctx).Where("symbol = ?", symbol).First(&res).Error
	return res, err
}

func (m *postgresStockRepository) Store(ctx context.Context, stock *domain.Stock) error {
	return m.Conn.WithContext(ctx).Create(stock).Error
}
