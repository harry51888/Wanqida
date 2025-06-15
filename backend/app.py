import os
import re
import json
import base64
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
from PIL import Image
import traceback

# 加载环境变量
load_dotenv()

app = Flask(__name__)
CORS(app)

# 配置
app.config['MAX_CONTENT_LENGTH'] = int(os.getenv('MAX_CONTENT_LENGTH', 16 * 1024 * 1024))
app.config['UPLOAD_FOLDER'] = os.getenv('UPLOAD_FOLDER', 'uploads')

# 确保上传目录存在
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# 初始化OpenAI客户端
client = OpenAI(
    api_key=os.getenv('OPENAI_API_KEY'),
    base_url=os.getenv('OPENAI_BASE_URL')
)

# 允许的文件扩展名
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def parse_wechat_chat(chat_text):
    """
    解析微信聊天记录文本，转换为结构化的JSON格式
    """
    lines = chat_text.strip().split('\n')
    chat_messages = []
    current_date = None
    
    # 匹配日期的正则表达式
    date_pattern = r'—————\s*(\d{4}-\d{2}-\d{2})\s*—————'
    # 匹配消息的正则表达式
    message_pattern = r'^(.+?)\s+(\d{1,2}:\d{2})$'
    
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        # 跳过空行
        if not line:
            i += 1
            continue
            
        # 检查是否是日期行
        date_match = re.match(date_pattern, line)
        if date_match:
            current_date = date_match.group(1)
            i += 1
            continue
            
        # 检查是否是消息头（用户名 + 时间）
        message_match = re.match(message_pattern, line)
        if message_match and current_date:
            sender = message_match.group(1).strip()
            time = message_match.group(2).strip()
            
            # 收集消息内容（可能有多行）
            content_lines = []
            i += 1
            
            # 继续读取直到遇到下一个消息头、日期或文件结束
            while i < len(lines):
                next_line = lines[i].strip()
                
                # 如果是空行，跳过
                if not next_line:
                    i += 1
                    continue
                    
                # 如果是日期行或消息头，停止
                if (re.match(date_pattern, next_line) or 
                    re.match(message_pattern, next_line)):
                    break
                    
                content_lines.append(next_line)
                i += 1
            
            # 组装消息
            content = '\n'.join(content_lines) if content_lines else ""
            
            message = {
                'date': current_date,
                'time': time,
                'sender': sender,
                'content': content,
                'timestamp': f"{current_date} {time}"
            }
            
            chat_messages.append(message)
        else:
            i += 1
    
    return chat_messages

def analyze_images_content(image_paths):
    """
    使用GPT-4o-mini分析图片内容
    """
    if not image_paths:
        return ""
    
    try:
        image_descriptions = []
        
        for image_path in image_paths:
            # 打开并编码图片
            with open(image_path, "rb") as image_file:
                base64_image = base64.b64encode(image_file.read()).decode('utf-8')
            
            # 调用GPT-4o-mini进行图片分析
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": "请详细描述这张图片的内容，包括图片中的文字、人物、场景、情感表达等所有重要信息。用中文回复。"
                            },
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{base64_image}"
                                }
                            }
                        ]
                    }
                ],
                max_tokens=500
            )
            
            description = response.choices[0].message.content
            image_descriptions.append(f"图片内容：{description}")
        
        return "\n\n".join(image_descriptions)
    
    except Exception as e:
        print(f"图片分析错误: {str(e)}")
        return "图片分析失败"

@app.route('/api/analyze', methods=['POST'])
def analyze_emotion():
    """
    主要的情感分析API
    """
    try:
        data = request.get_json()
        
        # 获取输入数据
        relationship = data.get('relationship', '')
        user_identity = data.get('userIdentity', '')
        past_experience = data.get('pastExperience', '')
        chat_records = data.get('chatRecords', [])
        
        # 处理聊天记录
        all_chat_messages = []
        for chat_record in chat_records:
            if chat_record.strip():
                parsed_messages = parse_wechat_chat(chat_record)
                all_chat_messages.extend(parsed_messages)
        
        # 构建分析提示词
        analysis_prompt = f"""
作为一名专业的心理咨询师，请基于以下信息对用户进行全面的情感分析：

**基本信息：**
- 聊天对象关系：{relationship}
- 用户身份标识：{user_identity}

**用户往事经历：**
{past_experience}

**聊天记录分析：**
{json.dumps(all_chat_messages, ensure_ascii=False, indent=2)}

请按照以下格式进行专业分析：

## 情绪评估
[分析用户当前的整体情绪状态，包括主要情绪、情绪强度、持续时间等]

## 原因分析  
[深入分析情绪产生的具体原因，引用具体的聊天内容或往事片段作为佐证]

## 解决方案
[提供3-5个具体、可行的改善建议，包括沟通技巧、自我调节方法、必要时的专业求助建议]

请用温和、专业、富有同理心的语言进行分析，避免过于直接的判断，多使用鼓励和支持的表达方式。
"""

        # 调用GPT-4o-mini进行分析
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system", 
                    "content": "你是一名专业的心理咨询师，擅长情感分析和心理疏导。请用温和、专业的语言提供分析和建议。"
                },
                {
                    "role": "user", 
                    "content": analysis_prompt
                }
            ],
            max_tokens=2000,
            temperature=0.7
        )
        
        analysis_result = response.choices[0].message.content
        
        return jsonify({
            'success': True,
            'analysis': analysis_result,
            'chatCount': len(all_chat_messages)
        })
        
    except Exception as e:
        print(f"分析错误: {str(e)}")
        traceback.print_exc()
        return jsonify({
            'success': False,
            'error': f'分析过程中出现错误: {str(e)}'
        }), 500

@app.route('/api/upload-images', methods=['POST'])
def upload_images():
    """
    图片上传API
    """
    try:
        if 'images' not in request.files:
            return jsonify({'success': False, 'error': '没有上传文件'}), 400
        
        files = request.files.getlist('images')
        uploaded_files = []
        
        for file in files:
            if file and file.filename and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                timestamp = datetime.now().strftime('%Y%m%d_%H%M%S_')
                filename = timestamp + filename
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                
                file.save(filepath)
                uploaded_files.append({
                    'filename': filename,
                    'path': filepath
                })
        
        # 分析上传的图片
        image_paths = [f['path'] for f in uploaded_files]
        image_analysis = analyze_images_content(image_paths)
        
        return jsonify({
            'success': True,
            'files': uploaded_files,
            'imageAnalysis': image_analysis
        })
        
    except Exception as e:
        print(f"上传错误: {str(e)}")
        return jsonify({
            'success': False,
            'error': f'上传过程中出现错误: {str(e)}'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """
    健康检查API
    """
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })

@app.errorhandler(413)
def too_large(e):
    return jsonify({
        'success': False,
        'error': '上传文件过大，请选择小于10MB的文件'
    }), 413

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 