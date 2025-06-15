#!/bin/bash

# 设置错误处理
set -e

echo "==============================================="
echo "        万千达 AI情感分析平台"
echo "==============================================="

# 清理可能残留的进程
echo "🧹 清理残留进程..."
pkill -f "python.*app.py" 2>/dev/null || true
pkill -f "flask.*run" 2>/dev/null || true
pkill -f "react-scripts" 2>/dev/null || true
pkill -f "node.*react" 2>/dev/null || true

# 检查环境
echo "🔍 检查环境..."

if ! command -v python3 >/dev/null 2>&1; then
    echo "❌ Python3未安装"
    exit 1
fi

if ! command -v node >/dev/null 2>&1; then
    echo "❌ Node.js未安装"
    exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
    echo "❌ npm未安装"
    exit 1
fi

# 检查后端虚拟环境
if [ ! -d "backend/venv" ]; then
    echo "❌ 后端虚拟环境不存在"
    exit 1
fi

# 检查前端依赖
if [ ! -d "frontend/node_modules" ]; then
    echo "❌ 前端依赖未安装"
    exit 1
fi

echo "✅ 环境检查通过"

# 检查端口
BACKEND_PORT=5000
if lsof -ti:5000 >/dev/null 2>&1; then
    echo "⚠️  端口5000被占用，使用端口5001"
    BACKEND_PORT=5001
fi

# 启动后端
echo "🚀 启动后端服务..."
cd backend

# 激活虚拟环境
source venv/bin/activate

# 创建.env文件
if [ ! -f ".env" ]; then
    cat > .env << 'EOF'
OPENAI_API_KEY=sk-1QXdDDNAp4Oz0b7l86Ab7f0dEb1c4e34Be76CdCf6eE1A43f
OPENAI_BASE_URL=https://vip.apiyi.com/v1
UPLOAD_FOLDER=uploads
MAX_CONTENT_LENGTH=16777216
EOF
    echo "✅ 已创建.env文件"
fi

# 启动后端服务
if [ "$BACKEND_PORT" = "5001" ]; then
    # 修改app.py以使用5001端口
    if ! grep -q "port=5001" app.py; then
        sed -i.bak 's/port=5000/port=5001/' app.py
        echo "✅ 已更新后端端口为5001"
    fi
fi

python app.py &
BACKEND_PID=$!
echo "✅ 后端已启动 (PID: $BACKEND_PID, 端口: $BACKEND_PORT)"

cd ..

# 等待后端启动
echo "⏳ 等待后端启动..."
sleep 3

# 测试后端连接
if curl -s "http://localhost:$BACKEND_PORT/api/health" >/dev/null 2>&1; then
    echo "✅ 后端连接测试成功"
else
    echo "⚠️  后端连接测试失败，但继续启动前端"
fi

# 启动前端
echo "🚀 启动前端服务..."
cd frontend

# 设置PATH以包含node_modules/.bin
export PATH="$PWD/node_modules/.bin:$PATH"

# 直接使用npx来确保react-scripts可用
echo "🔧 使用npx启动React应用..."
npx react-scripts start &
FRONTEND_PID=$!

echo "✅ 前端已启动 (PID: $FRONTEND_PID)"
cd ..

echo "==============================================="
echo "🎉 万千达已成功启动！"
echo ""
echo "🌐 前端访问地址: http://localhost:3000"
echo "🔧 后端API地址: http://localhost:$BACKEND_PORT"
echo ""
echo "📋 功能测试："
echo "   1. 打开浏览器访问 http://localhost:3000"
echo "   2. 测试后端健康: curl http://localhost:$BACKEND_PORT/api/health"
echo ""
echo "💡 使用说明："
echo "   - 在欢迎页面了解功能"
echo "   - 按步骤填写信息进行情感分析"
echo "   - 支持上传微信聊天记录和图片"
echo ""
echo "按 Ctrl+C 停止所有服务"
echo "==============================================="

# 清理函数
cleanup() {
    echo ""
    echo "🛑 正在停止服务..."
    
    # 停止前端
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
        echo "✅ 前端已停止"
    fi
    
    # 停止后端
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
        echo "✅ 后端已停止"
    fi
    
    # 恢复app.py
    if [ -f "backend/app.py.bak" ]; then
        mv backend/app.py.bak backend/app.py
        echo "✅ 后端配置已恢复"
    fi
    
    echo "✅ 所有服务已停止"
    exit 0
}

# 信号处理
trap cleanup EXIT INT TERM

# 保持运行
echo "ℹ️  服务运行中... 按 Ctrl+C 停止"
while true; do
    sleep 1
    
    # 检查进程是否还在运行
    if ! kill -0 $BACKEND_PID 2>/dev/null; then
        echo "❌ 后端进程意外停止"
        break
    fi
    
    if ! kill -0 $FRONTEND_PID 2>/dev/null; then
        echo "❌ 前端进程意外停止"
        break
    fi
done

cleanup 