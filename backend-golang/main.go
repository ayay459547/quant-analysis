package main

import (
	// "fmt"
	// "github.com/ayay459547/quant-backend/internal/config"
	"encoding/json"
	"log"
	"net/http"
)

type Response struct {
	Data   string `json:"data"`
	Status string `json:"status"`
}

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	resp := Response{
		Data:   "Hello, World! (GoLang)",
		Status: "success",
	}

	err := json.NewEncoder(w).Encode(resp)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func main() {
	// config.LoadConfig()
	http.HandleFunc("/hello", handler)

	// fmt.Println(config.AppConfig.Port)

	// dbURL := config.GetDatabaseURL()

	// fmt.Println(dbURL)
	port := "8080"
	log.Printf("Server is running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
