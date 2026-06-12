package main

import (
	"github.com/ayay459547/quant-backend/database"
	delivery "github.com/ayay459547/quant-backend/internal/delivery/http"
	"github.com/ayay459547/quant-backend/internal/repository"
	"github.com/ayay459547/quant-backend/internal/usecase"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
)

func main() {
	// Load .env file if it exists
	_ = godotenv.Load()

	// Connect to Database
	connect.Connect()

	r := gin.Default()

	// Basic Hello Endpoint
	r.GET("/hello", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Hello from Go"})
	})

	// Initialize Repositories
	industryRepo := repository.NewPostgresIndustryRepository(connect.DB)
	stockRepo := repository.NewPostgresStockRepository(connect.DB)

	// Initialize Usecases
	industryUsecase := usecase.NewIndustryUsecase(industryRepo)
	stockUsecase := usecase.NewStockUsecase(stockRepo)

	// Initialize Handlers
	delivery.NewIndustryHandler(r, industryUsecase)
	delivery.NewStockHandler(r, stockUsecase)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server is running on port %s", port)
	log.Fatal(r.Run(":" + port))
}
