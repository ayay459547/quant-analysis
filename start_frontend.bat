@echo off
title Quant Frontend
echo ===================================================
echo   啟動前端 Next.js
echo ===================================================
:: 開啟新視窗執行並顯示 Log
start "Frontend Logs" cmd /k "docker-compose up frontend"
echo 前端已在獨立視窗中啟動：http://localhost:3000
pause
