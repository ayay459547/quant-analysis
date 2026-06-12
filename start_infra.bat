@echo off
title Quant Infrastructure
echo ===================================================
echo   啟動基礎設施 (PostgreSQL, Redis, RabbitMQ)
echo ===================================================
:: 開啟新視窗執行並顯示 Log
start "Infrastructure Logs" cmd /k "docker-compose up db redis rabbitmq"
echo 基礎設施已在獨立視窗中啟動。
pause
