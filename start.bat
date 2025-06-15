@echo off
chcp 65001 >nul
title 万千达 AI情感分析平台

echo ===============================================
echo         万千达 AI情感分析平台
echo ===============================================

REM 检查Python是否安装
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误：未找到Python，请先安装Python
    pause
    exit /b 1
)

REM 检查Node.js是否安装
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误：未找到Node.js，请先安装Node.js
    pause
    exit /b 1
)

echo ✅ 环境检查通过

REM 启动后端
echo 🚀 启动后端服务...
cd backend

REM 检查虚拟环境是否存在
if not exist "venv" (
    echo 📦 创建Python虚拟环境...
    python -m venv venv
)

REM 激活虚拟环境
call venv\Scripts\activate

REM 安装依赖
echo 📦 安装Python依赖...
pip install -r requirements.txt

REM 检查.env文件
if not exist ".env" (
    echo ⚠️  警告：未找到.env文件，请先配置环境变量
    echo 请先配置 .env 文件：
    echo 1. 复制 .env.example 为 .env
    echo 2. 在 .env 中填入您的 OpenAI API Key
    if not exist .env (
        copy .env.example .env
        echo 已为您创建 .env 文件，请编辑并填入您的API密钥
        pause
        exit /b 1
    )
    echo ✅ 已创建.env文件，请确认API密钥是否正确
)

REM 启动后端服务（后台运行）
echo 🔧 启动后端服务...
start /b python app.py

cd ..

REM 启动前端
echo 🚀 启动前端服务...
cd frontend

REM 安装依赖
if not exist "node_modules" (
    echo 📦 安装前端依赖...
    npm install
)

REM 启动前端服务
echo 🔧 启动前端服务...
start /b npm start

echo ===============================================
echo ✅ 万千达已成功启动！
echo.
echo 🌐 前端地址: http://localhost:3000
echo 🔧 后端地址: http://localhost:5000
echo.
echo 按任意键停止服务...
echo ===============================================

pause >nul

REM 清理进程
echo 🛑 正在停止服务...
taskkill /f /im python.exe >nul 2>&1
taskkill /f /im node.exe >nul 2>&1
echo ✅ 服务已停止
pause 