 # 万千达 - AI情感分析平台

万千达是一个基于AI技术的情感分析平台，通过分析用户的往事经历和聊天记录，提供专业的心理状态评估、困扰原因分析和解决方案建议。

## 🎯 项目宗旨

现代社会中，人们面临各种情感困扰和人际关系问题。万千达致力于：

- **情感智能化分析**：运用先进的AI技术，深度理解用户的情感状态
- **隐私安全保护**：确保用户数据的绝对安全，所有分析本地进行，不存储个人信息
- **专业心理指导**：提供基于心理学原理的专业建议和解决方案
- **普惠心理健康**：让每个人都能获得专业的心理分析服务

## ✨ 核心功能

### 🧠 智能情感分析
- 基于GPT-4技术的深度情感理解
- 多维度情绪状态评估
- 智能识别情感变化趋势

### 💬 聊天记录分析
- 智能解析微信聊天记录
- 提取关键情感信息
- 分析人际关系动态

### 🖼️ 图片内容识别
- 支持聊天图片内容分析
- 多模态信息融合处理
- 全面理解交流语境

### 🔒 隐私安全保护
- 本地化数据处理
- 零存储政策
- 端到端加密传输

### 📱 响应式设计
- 完美适配移动端和桌面端
- 现代化UI设计
- 温馨专业的用户体验

## 🏗️ 技术架构

### 后端技术栈
- **Python 3.8+**: 核心开发语言
- **Flask**: 轻量级Web框架
- **OpenAI API**: GPT-4驱动的AI分析引擎
- **PIL**: 图像处理库

### 前端技术栈
- **React 18**: 现代化前端框架
- **React Router**: 单页应用路由
- **Styled Components**: CSS-in-JS样式解决方案
- **Axios**: HTTP客户端
- **React Dropzone**: 文件上传组件

## 📁 项目结构

```
万千达/
├── 📄 README.md              # 项目说明文档
├── 📄 .gitignore             # Git忽略文件
├── 📄 example.txt            # 示例聊天记录
├── 🚀 start.sh              # Linux/Mac启动脚本
├── 🚀 start.bat             # Windows启动脚本
├── 📂 backend/               # Python后端
│   ├── 📄 app.py            # Flask主应用
│   ├── 📄 requirements.txt  # Python依赖
│   ├── 📄 .env.example      # 环境变量示例
│   ├── 📄 test_parser.py    # 聊天记录解析测试
│   └── 📄 simple_test.py    # 简单功能测试
└── 📂 frontend/             # React前端
    ├── 📄 package.json      # 前端依赖配置
    ├── 📂 public/           # 静态资源
    │   ├── 📄 index.html    # HTML模板
    │   └── 📄 manifest.json # PWA配置
    └── 📂 src/              # 源代码
        ├── 📄 index.js      # 应用入口
        ├── 📄 App.js        # 主应用组件
        └── 📂 pages/        # 页面组件
            ├── 📄 WelcomePage.js      # 欢迎页
            ├── 📄 RelationshipSetup.js # 关系设置页
            ├── 📄 DataInput.js        # 数据输入页
            └── 📄 AnalysisResult.js   # 分析结果页
```

## 🚀 快速开始

### 环境要求

- **Python 3.8+**
- **Node.js 16+**
- **npm 或 yarn**
- **OpenAI API Key** (需要自行申请)

### 安装步骤

#### 1. 克隆项目

```bash
git clone https://github.com/harry51888/Wanqida.git
cd Wanqida
```

#### 2. 后端环境配置

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
# 编辑 .env 文件，添加您的OpenAI API Key
```

#### 3. 前端环境配置

```bash
cd ../frontend

# 安装依赖
npm install
```

#### 4. 启动应用

**方式一：一键启动脚本**

```bash
# Linux/macOS
./start.sh

# Windows
start.bat
```

**方式二：手动启动**

```bash
# 启动后端 (在backend目录)
python app.py

# 启动前端 (在frontend目录，新终端)
npm start
```

#### 5. 访问应用

打开浏览器访问：http://localhost:3000

## 🔧 配置说明

### 环境变量配置

在 `backend/.env` 文件中配置以下变量：

```env
# OpenAI API配置
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_BASE_URL=https://api.openai.com/v1

# 文件上传配置
UPLOAD_FOLDER=uploads
MAX_CONTENT_LENGTH=16777216
```

### API密钥获取

1. 访问 [OpenAI官网](https://platform.openai.com/)
2. 注册并创建API密钥
3. 将密钥填入环境变量文件

## 📖 使用指南

### 1. 欢迎页面
- 了解万千达的功能特点
- 查看隐私保护承诺
- 开始分析流程

### 2. 关系设置
- 选择聊天对象与您的关系类型
- 确认聊天记录中的身份标识
- 为分析提供背景信息

### 3. 数据输入
- **往事经历**：详细描述相关背景和感受
- **聊天记录**：粘贴需要分析的对话内容
- **图片上传**：上传聊天中的重要图片

### 4. 分析结果
- **情绪评估**：全面的情绪状态分析
- **原因探析**：深入的问题根源分析
- **解决方案**：专业的改善建议

## 🎯 快速体验

想要快速体验万千达？使用提供的示例数据（此部分待完成，如想体验可以自行下载微信聊天数据至邮件，再复制粘贴，需要协助欢迎联系我：harry051030）：

1. **关系设置**：选择"朋友"关系，身份填写"XXX"
2. **数据输入**：复制`example.txt`中的示例聊天记录
3. **开始分析**：点击分析按钮，查看演示结果

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 如何贡献

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 开发规范

- 遵循现有代码风格
- 添加必要的注释和文档
- 确保测试通过
- 提交前进行代码检查

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🛡️ 隐私声明

- 所有数据仅在本地处理
- 不存储任何用户个人信息
- API调用采用加密传输
- 用户完全控制数据流向

## 📞 联系方式

- **Issues**: [GitHub Issues](https://github.com/harry51888/Wanqida/issues)
- **Email**: harry051030@contact.com
- **项目主页**: https://github.com/harry51888/Wanqida

## 🙏 致谢

感谢以下开源项目的支持：

- [React](https://reactjs.org/) - 前端框架
- [Flask](https://flask.palletsprojects.com/) - 后端框架
- [OpenAI](https://openai.com/) - AI技术支持

---

**万千达** - 让AI成为您的情感分析师 💝