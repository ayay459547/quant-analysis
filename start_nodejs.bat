@echo off
title Quant Node.js Backend
echo ===================================================
echo   啟動 Node.js 後端服務 (含資料庫、Redis、RabbitMQ)
echo ===================================================

:: 啟動基礎設施
start "Infrastructure" cmd /k "docker-compose up db redis rabbitmq"
timeout /t 5 /nobreak >nul

:: 啟動 Node.js 後端
start "Node.js Backend Logs" cmd /k "docker-compose up backend-nodejs"

echo.
echo Node.js 後端已啟動：http://localhost:3001
echo.
pause
