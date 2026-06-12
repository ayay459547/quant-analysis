@echo off
title Quant Python Backend
echo ===================================================
echo   啟動 Python 後端服務 (含資料庫、Redis、RabbitMQ)
echo ===================================================

:: 啟動基礎設施
start "Infrastructure" cmd /k "docker-compose up db redis rabbitmq"
timeout /t 5 /nobreak >nul

:: 啟動 Python 後端
start "Python Backend Logs" cmd /k "docker-compose up backend-python"

echo.
echo Python 後端已啟動：http://localhost:8000
echo.
pause
