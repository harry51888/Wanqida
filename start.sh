#!/bin/bash

# 万千达 AI情感分析平台 - 启动脚本

echo "==============================================="
echo "        万千达 AI情感分析平台"
echo "==============================================="

# 检查Python是否安装
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误：未找到Python3，请先安装Python3"
    exit 1
fi

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误：未找到Node.js，请先安装Node.js"
    exit 1
fi

echo "✅ 环境检查通过"

# 启动后端
echo "🚀 启动后端服务..."
cd backend

# 检查虚拟环境是否存在
if [ ! -d "venv" ]; then
    echo "📦 创建Python虚拟环境..."
    python3 -m venv venv
fi

# 激活虚拟环境
source venv/bin/activate

# 安装依赖
echo "📦 安装Python依赖..."
pip install -r requirements.txt

# 检查.env文件
if [ ! -f ".env" ]; then
    echo "⚠️  警告：未找到.env文件，正在创建默认配置..."
          echo "请先配置 .env 文件："
      echo "1. 复制 .env.example 为 .env"
      echo "2. 在 .env 中填入您的 OpenAI API Key"
      echo ""
      if [ ! -f .env ]; then
        cp .env.example .env
        echo "已为您创建 .env 文件，请编辑并填入您的API密钥"
        exit 1
      fi
    echo "✅ 已创建.env文件，请确认API密钥是否正确"
fi

# 启动后端服务（后台运行）
echo "🔧 启动后端服务..."
python app.py &
BACKEND_PID=$!

cd ..

# 启动前端
echo "🚀 启动前端服务..."
cd frontend

# 安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装前端依赖..."
    npm install
fi

# 启动前端服务
echo "🔧 启动前端服务..."
npm start &
FRONTEND_PID=$!

echo "==============================================="
echo "✅ 万千达已成功启动！"
echo ""
echo "🌐 前端地址: http://localhost:3000"
echo "🔧 后端地址: http://localhost:5000"
echo ""
echo "按 Ctrl+C 停止服务"
echo "==============================================="

# 等待用户中断
wait

# 清理进程
echo "🛑 正在停止服务..."
kill $BACKEND_PID 2>/dev/null
kill $FRONTEND_PID 2>/dev/null
echo "✅ 服务已停止" 