package http

import (
	"github.com/ayay459547/quant-backend/internal/domain"
	"github.com/gin-gonic/gin"
	"net/http"
)

type IndustryHandler struct {
	IndustryUsecase domain.IndustryUsecase
}

func NewIndustryHandler(r *gin.Engine, us domain.IndustryUsecase) {
	handler := &IndustryHandler{
		IndustryUsecase: us,
	}
	r.GET("/industries", handler.Fetch)
	r.POST("/industries", handler.Store)
}

func (h *IndustryHandler) Fetch(c *gin.Context) {
	list, err := h.IndustryUsecase.Fetch(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, list)
}

func (h *IndustryHandler) Store(c *gin.Context) {
	var industry domain.Industry
	if err := c.ShouldBindJSON(&industry); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := h.IndustryUsecase.Store(c.Request.Context(), &industry)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, industry)
}
