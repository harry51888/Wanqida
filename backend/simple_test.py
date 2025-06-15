#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
简单的聊天记录解析测试（不依赖Flask）
"""

import re
import json

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

def test_with_simple_example():
    """使用简单示例测试解析功能"""
    simple_chat = """
—————  2025-01-01  —————

张三  10:30
你好，最近怎么样？

李四  10:32
还不错，工作挺忙的

张三  10:35
[图片]

张三  10:36
看看我昨天拍的照片

李四  10:40
哇，好漂亮的风景！

—————  2025-01-02  —————

李四  09:15
早上好！

张三  09:20
早上好，今天天气不错呢
"""
    
    print("=" * 50)
    print("测试简单示例...")
    print("=" * 50)
    
    parsed_messages = parse_wechat_chat(simple_chat)
    
    print(f"解析结果：共找到 {len(parsed_messages)} 条消息")
    
    for i, msg in enumerate(parsed_messages):
        print(f"消息 {i+1}:")
        print(f"  日期: {msg['date']}")
        print(f"  时间: {msg['time']}")
        print(f"  发送者: {msg['sender']}")
        print(f"  内容: {msg['content']}")
        print(f"  时间戳: {msg['timestamp']}")
        print("-" * 30)

def test_with_example_file():
    """使用example.txt测试解析功能"""
    try:
        with open('../example.txt', 'r', encoding='utf-8') as f:
            content = f.read()
        
        print("=" * 50)
        print("开始解析example.txt...")
        print("=" * 50)
        
        # 调用解析函数
        parsed_messages = parse_wechat_chat(content)
        
        print(f"解析结果：共找到 {len(parsed_messages)} 条消息")
        print("=" * 50)
        
        # 打印前几条消息作为示例
        for i, msg in enumerate(parsed_messages[:5]):
            print(f"消息 {i+1}:")
            print(f"  日期: {msg['date']}")
            print(f"  时间: {msg['time']}")
            print(f"  发送者: {msg['sender']}")
            print(f"  内容: {msg['content'][:50]}...")
            print(f"  时间戳: {msg['timestamp']}")
            print("-" * 30)
        
        if len(parsed_messages) > 5:
            print(f"... 还有 {len(parsed_messages) - 5} 条消息")
        
        print("=" * 50)
        print("✅ 解析测试成功！")
        
    except FileNotFoundError:
        print("❌ 错误：找不到 example.txt 文件")
    except Exception as e:
        print(f"❌ 解析过程中出现错误: {str(e)}")

if __name__ == "__main__":
    print("万千达 - 聊天记录解析测试")
    print("=" * 50)
    
    # 测试简单示例
    test_with_simple_example()
    
    print()
    
    # 测试example.txt文件
    test_with_example_file() 