@echo off
title Quant Go Backend
echo ===================================================
echo   啟動 Go 後端服務 (含資料庫、Redis、RabbitMQ)
echo ===================================================

:: 啟動基礎設施
start "Infrastructure" cmd /k "docker-compose up db redis rabbitmq"
timeout /t 5 /nobreak >nul

:: 啟動 Go 後端
start "Go Backend Logs" cmd /k "docker-compose up backend-go"

echo.
echo Go 後端已啟動：http://localhost:8080
echo.
pause
