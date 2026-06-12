@echo off
title Quant System All-in-One
echo ===================================================
echo   啟動全系統 (Infrastructure + Backends + Frontend)
echo ===================================================

:: 1. 先啟動基礎設施
echo [1/3] 正在啟動基礎設施...
start "Infrastructure" cmd /k "docker-compose up db redis rabbitmq"

:: 等待資料庫啟動完成
timeout /t 8 /nobreak >nul

:: 2. 啟動後端
echo [2/3] 正在啟動後端群組...
start "Go Backend" cmd /k "docker-compose up backend-go"
start "Python Backend" cmd /k "docker-compose up backend-python"
start "Node.js Backend" cmd /k "docker-compose up backend-nodejs"

:: 3. 啟動前端
echo [3/3] 正在啟動前端...
start "Frontend" cmd /k "docker-compose up frontend"

echo.
echo ===================================================
echo   所有服務已開啟獨立視窗執行！
echo ===================================================
echo - 前端: http://localhost:3000
echo - Go: http://localhost:8080
echo - Python: http://localhost:8000
echo - Node.js: http://localhost:3001
echo.
pause
