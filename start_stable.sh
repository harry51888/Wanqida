#!/bin/bash

echo "==============================================="
echo "        万千达 - 稳定启动脚本"
echo "==============================================="

# 清理可能残留的进程
echo "🧹 清理残留进程..."
pkill -f "python.*app.py" 2>/dev/null || true
pkill -f "react-scripts" 2>/dev/null || true
pkill -f "node.*react-scripts" 2>/dev/null || true

# 检查端口
BACKEND_PORT=5000
if lsof -ti:5000 >/dev/null 2>&1; then
    echo "⚠️  警告：5000端口被占用，使用5001端口"
    BACKEND_PORT=5001
fi

# 启动后端
echo "🚀 启动后端服务（端口：$BACKEND_PORT）..."
cd backend

# 激活虚拟环境
source venv/bin/activate

# 创建.env文件（如果不存在）
if [ ! -f ".env" ]; then
    cat > .env << EOF
OPENAI_API_KEY=sk-1QXdDDNAp4Oz0b7l86Ab7f0dEb1c4e34Be76CdCf6eE1A43f
OPENAI_BASE_URL=https://vip.apiyi.com/v1
UPLOAD_FOLDER=uploads
MAX_CONTENT_LENGTH=16777216
EOF
fi

# 启动后端
if [ "$BACKEND_PORT" = "5001" ]; then
    # 使用环境变量设置端口
    export FLASK_RUN_PORT=5001
    flask --app app run --host=0.0.0.0 --port=5001 --debug &
    BACKEND_PID=$!
else
    python app.py &
    BACKEND_PID=$!
fi

echo "✅ 后端已启动 (PID: $BACKEND_PID)"
cd ..

# 等待后端启动
sleep 3

# 启动前端
echo "🚀 启动前端服务..."
cd frontend

# 修改package.json proxy（如果需要）
if [ "$BACKEND_PORT" = "5001" ]; then
    if [ -f "package.json" ]; then
        cp package.json package.json.backup
        sed 's/"proxy": "http:\/\/localhost:5000"/"proxy": "http:\/\/localhost:5001"/' package.json.backup > package.json
    fi
fi

# 检查不同的启动方式
echo "🔧 正在启动前端..."
if command -v npx >/dev/null 2>&1; then
    echo "使用npx启动..."
    npx react-scripts start &
    FRONTEND_PID=$!
elif [ -f "node_modules/react-scripts/bin/react-scripts.js" ]; then
    echo "使用node直接启动..."
    node node_modules/react-scripts/bin/react-scripts.js start &
    FRONTEND_PID=$!
else
    echo "使用npm start启动..."
    npm start &
    FRONTEND_PID=$!
fi

echo "✅ 前端已启动 (PID: $FRONTEND_PID)"
cd ..

echo "==============================================="
echo "✅ 万千达已成功启动！"
echo ""
echo "🌐 前端地址: http://localhost:3000"
echo "🔧 后端地址: http://localhost:$BACKEND_PORT"
echo ""
echo "📋 测试提示："
echo "   - 打开浏览器访问 http://localhost:3000"
echo "   - 后端API可通过 http://localhost:$BACKEND_PORT/api/health 测试"
echo ""
echo "按 Ctrl+C 停止服务"
echo "==============================================="

# 清理函数
cleanup() {
    echo ""
    echo "🛑 正在停止服务..."
    
    # 停止进程
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
        echo "✅ 后端已停止"
    fi
    
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
        echo "✅ 前端已停止"
    fi
    
    # 恢复package.json
    if [ -f "frontend/package.json.backup" ]; then
        mv frontend/package.json.backup frontend/package.json
        echo "✅ 配置文件已恢复"
    fi
    
    echo "✅ 清理完成"
    exit 0
}

# 设置信号处理
trap cleanup EXIT INT TERM

# 等待用户中断
while true; do
    sleep 1
done 