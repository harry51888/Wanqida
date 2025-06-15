 # 贡献指南

感谢您对万千达项目的关注！我们欢迎所有形式的贡献。

## 🤝 如何贡献

### 报告问题

如果您发现了bug或有改进建议：

1. 在提交issue前，请先搜索现有issues
2. 创建新issue时，请提供详细的信息：
   - 问题描述
   - 复现步骤
   - 期待行为
   - 实际行为
   - 环境信息（OS、Python版本、Node.js版本等）

### 提交代码

1. **Fork项目**
   ```bash
   git clone https://github.com/yourusername/wanqianda.git
   cd wanqianda
   ```

2. **创建特性分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **开发和测试**
   - 确保代码遵循项目风格
   - 添加必要的测试
   - 运行现有测试确保无回归

4. **提交更改**
   ```bash
   git add .
   git commit -m "feat: 添加新功能描述"
   ```

5. **推送并创建PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 开发规范

### 代码风格

#### Python后端
- 遵循PEP 8规范
- 使用有意义的变量和函数名
- 添加必要的注释和文档字符串

#### React前端
- 使用ES6+语法
- 遵循React最佳实践
- 组件名使用PascalCase
- 文件名使用camelCase

### 提交消息格式

使用规范的提交消息格式：

```
type(scope): 简短描述

详细描述（可选）

关联issue（可选）
```

类型说明：
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建或工具相关

### 测试要求

- 新功能必须包含相应测试
- 确保所有测试通过
- 测试覆盖率不低于80%

## 🚀 开发环境设置

### 1. 安装依赖

```bash
# 后端
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# 前端
cd ../frontend
npm install
```

### 2. 配置环境变量

```bash
cd backend
cp .env.example .env
# 编辑.env文件，添加您的API密钥
```

### 3. 启动开发服务器

```bash
# 后端（在backend目录）
python app.py

# 前端（在frontend目录）
npm start
```

## 🧪 运行测试

```bash
# 后端测试
cd backend
python -m pytest

# 前端测试
cd frontend
npm test
```

## 📋 PR检查清单

提交PR前，请确保：

- [ ] 代码遵循项目规范
- [ ] 添加了必要的测试
- [ ] 所有测试通过
- [ ] 更新了相关文档
- [ ] 提交消息格式正确
- [ ] 无合并冲突

## 🎯 开发重点

当前项目优先关注以下方向：

1. **功能增强**
   - 支持更多聊天平台
   - 情感分析算法优化
   - 用户体验改进

2. **性能优化**
   - 响应速度提升
   - 内存使用优化
   - 并发处理能力

3. **安全加固**
   - 数据隐私保护
   - 输入验证加强
   - 错误处理完善

## 📞 联系方式

如有疑问，请通过以下方式联系：

- GitHub Issues
- Email: your-email@example.com

再次感谢您的贡献！🙏