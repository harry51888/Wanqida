 # 部署指南

本文档详细介绍如何将万千达项目部署到不同的环境中。

## 🚀 本地开发环境

### 1. 环境准备

确保您的系统安装了以下软件：

- **Python 3.8+**
- **Node.js 16+**
- **Git**

### 2. 项目克隆

```bash
git clone https://github.com/yourusername/wanqianda.git
cd wanqianda
```

### 3. 后端配置

```bash
cd backend

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入您的OpenAI API Key
```

### 4. 前端配置

```bash
cd ../frontend

# 安装依赖
npm install
```

### 5. 启动服务

```bash
# 启动后端 (在backend目录)
python app.py

# 启动前端 (在frontend目录，新终端)
npm start
```

## 🌐 生产环境部署

### Docker部署（推荐）

#### 1. 创建Dockerfile

**后端Dockerfile (`backend/Dockerfile`):**
```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

**前端Dockerfile (`frontend/Dockerfile`):**
```dockerfile
FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### 2. 创建docker-compose.yml

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - OPENAI_BASE_URL=${OPENAI_BASE_URL}
    volumes:
      - ./backend/uploads:/app/uploads

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - backend
      - frontend
```

#### 3. 启动Docker服务

```bash
# 创建 .env 文件
echo "OPENAI_API_KEY=your_api_key_here" > .env
echo "OPENAI_BASE_URL=https://api.openai.com/v1" >> .env

# 启动服务
docker-compose up -d
```

### 云服务部署

#### AWS部署

1. **使用AWS EC2**
   ```bash
   # 连接到EC2实例
   ssh -i your-key.pem ec2-user@your-instance-ip
   
   # 安装Docker
   sudo yum update -y
   sudo yum install -y docker
   sudo service docker start
   
   # 克隆项目并部署
   git clone https://github.com/yourusername/wanqianda.git
   cd wanqianda
   sudo docker-compose up -d
   ```

2. **使用AWS ECS**
   - 创建ECS集群
   - 配置任务定义
   - 设置服务和负载均衡器

#### 阿里云部署

1. **使用ECS服务器**
   ```bash
   # 安装必要软件
   sudo apt update
   sudo apt install -y python3 python3-pip nodejs npm
   
   # 部署项目
   git clone https://github.com/yourusername/wanqianda.git
   cd wanqianda
   
   # 配置环境
   ./setup.sh
   
   # 使用PM2管理进程
   npm install -g pm2
   pm2 start ecosystem.config.js
   ```

#### Heroku部署

1. **准备Heroku配置文件**

   **Procfile:**
   ```
   web: cd backend && gunicorn app:app
   ```

   **runtime.txt:**
   ```
   python-3.9.16
   ```

2. **部署命令**
   ```bash
   # 安装Heroku CLI
   # 登录Heroku
   heroku login
   
   # 创建应用
   heroku create your-app-name
   
   # 设置环境变量
   heroku config:set OPENAI_API_KEY=your_api_key
   
   # 部署
   git push heroku main
   ```

### Nginx配置

**nginx.conf示例:**
```nginx
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server backend:5000;
    }

    server {
        listen 80;
        server_name localhost;

        location / {
            proxy_pass http://frontend:80;
        }

        location /api/ {
            proxy_pass http://backend/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

## 🔧 环境变量配置

### 必需变量

```env
# AI服务配置
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_BASE_URL=https://api.openai.com/v1

# 应用配置
FLASK_ENV=production
FLASK_DEBUG=False

# 文件上传配置
UPLOAD_FOLDER=uploads
MAX_CONTENT_LENGTH=16777216

# 安全配置
SECRET_KEY=your_secret_key_here
```

### 可选变量

```env
# 数据库配置（如果使用）
DATABASE_URL=postgresql://user:pass@localhost/dbname

# 缓存配置
REDIS_URL=redis://localhost:6379

# 监控配置
SENTRY_DSN=your_sentry_dsn_here
```

## 📊 监控和日志

### 日志配置

```python
# 在app.py中添加日志配置
import logging
from logging.handlers import RotatingFileHandler

if not app.debug:
    file_handler = RotatingFileHandler('logs/app.log', maxBytes=10240, backupCount=10)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    ))
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
```

### 健康检查

```python
@app.route('/health')
def health_check():
    return {'status': 'healthy', 'timestamp': datetime.now().isoformat()}
```

## 🔐 安全建议

1. **API密钥安全**
   - 使用环境变量存储密钥
   - 定期轮换API密钥
   - 限制API密钥权限

2. **网络安全**
   - 使用HTTPS
   - 配置防火墙
   - 限制API访问频率

3. **数据安全**
   - 加密敏感数据
   - 定期备份
   - 实施访问控制

## 🚨 故障排除

### 常见问题

1. **端口冲突**
   ```bash
   # 查看端口使用情况
   netstat -tulpn | grep :5000
   
   # 修改端口配置
   export PORT=5001
   ```

2. **依赖安装失败**
   ```bash
   # 清理缓存
   pip cache purge
   npm cache clean --force
   
   # 重新安装
   pip install -r requirements.txt --force-reinstall
   ```

3. **API调用失败**
   - 检查API密钥是否正确
   - 确认网络连接
   - 查看API调用限制

### 性能优化

1. **后端优化**
   - 使用缓存减少API调用
   - 优化数据库查询
   - 启用Gzip压缩

2. **前端优化**
   - 代码分割和懒加载
   - 图片压缩和CDN
   - 缓存静态资源

## 📈 扩展部署

### 水平扩展

```yaml
# docker-compose.yml 扩展配置
version: '3.8'

services:
  backend:
    build: ./backend
    deploy:
      replicas: 3
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}

  load-balancer:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx-lb.conf:/etc/nginx/nginx.conf
    depends_on:
      - backend
```

### 数据库集群

```yaml
  database:
    image: postgres:13
    environment:
      - POSTGRES_DB=wanqianda
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

有任何部署问题，请查看[故障排除指南](https://github.com/yourusername/wanqianda/wiki/Troubleshooting)或创建Issue。