package http

import (
	"github.com/ayay459547/quant-backend/internal/domain"
	"github.com/gin-gonic/gin"
	"net/http"
)

type StockHandler struct {
	StockUsecase domain.StockUsecase
}

func NewStockHandler(r *gin.Engine, us domain.StockUsecase) {
	handler := &StockHandler{
		StockUsecase: us,
	}
	r.GET("/stocks", handler.Fetch)
	r.GET("/stocks/:symbol", handler.GetBySymbol)
	r.POST("/stocks", handler.Store)
}

func (h *StockHandler) Fetch(c *gin.Context) {
	list, err := h.StockUsecase.Fetch(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, list)
}

func (h *StockHandler) GetBySymbol(c *gin.Context) {
	symbol := c.Param("symbol")
	stock, err := h.StockUsecase.GetBySymbol(c.Request.Context(), symbol)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Stock not found"})
		return
	}
	c.JSON(http.StatusOK, stock)
}

func (h *StockHandler) Store(c *gin.Context) {
	var stock domain.Stock
	if err := c.ShouldBindJSON(&stock); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := h.StockUsecase.Store(c.Request.Context(), &stock)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, stock)
}
