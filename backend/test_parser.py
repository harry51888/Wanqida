#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试聊天记录解析功能
"""

import re
import json
from app import parse_wechat_chat

def test_with_example_file():
    """使用example.txt测试解析功能"""
    try:
        with open('../example.txt', 'r', encoding='utf-8') as f:
            content = f.read()
        
        print("=" * 50)
        print("开始解析聊天记录...")
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
        
        # 输出完整的JSON结果到文件
        with open('parsed_result.json', 'w', encoding='utf-8') as f:
            json.dump(parsed_messages, f, ensure_ascii=False, indent=2)
        
        print(f"完整解析结果已保存到 parsed_result.json")
        print("=" * 50)
        
    except FileNotFoundError:
        print("错误：找不到 example.txt 文件")
    except Exception as e:
        print(f"解析过程中出现错误: {str(e)}")

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

if __name__ == "__main__":
    print("万千达 - 聊天记录解析测试")
    print("=" * 50)
    
    # 测试简单示例
    test_with_simple_example()
    
    # 测试example.txt文件
    test_with_example_file() 