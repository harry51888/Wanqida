import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: white;
  border-radius: 24px;
  padding: 40px;
  margin-bottom: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.8s ease-out;
  
  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 20px;
  }
`;

const Progress = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProgressStep = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? '#6366f1' : '#e5e7eb'};
  transition: background 0.3s ease;
`;

const ProgressLine = styled.div`
  width: 30px;
  height: 2px;
  background: ${props => props.active ? '#6366f1' : '#e5e7eb'};
  transition: background 0.3s ease;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 12px;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #666;
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SectionDescription = styled.p`
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const FormGroup = styled.div`
  margin-bottom: 40px;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 20px;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;
  background: #f9fafb;
  font-family: inherit;
  line-height: 1.6;
  resize: vertical;
  
  &:focus {
    border-color: #6366f1;
    background: white;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const ChatRecordSection = styled.div`
  margin-bottom: 40px;
`;

const ChatRecordList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ChatRecordItem = styled.div`
  position: relative;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 20px;
  background: #f9fafb;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #6366f1;
    background: rgba(99, 102, 241, 0.02);
  }
`;

const ChatRecordHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 12px;
`;

const ChatRecordLabel = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 1rem;
`;

const RemoveButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  top: 16px;
  right: 16px;
  
  &:hover {
    background: #dc2626;
    transform: translateY(-1px);
  }
`;

const AddChatButton = styled.button`
  width: 100%;
  padding: 16px;
  background: rgba(99, 102, 241, 0.1);
  border: 2px dashed #6366f1;
  border-radius: 12px;
  color: #6366f1;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(99, 102, 241, 0.15);
    transform: translateY(-2px);
  }
`;

const DropzoneContainer = styled.div`
  border: 2px dashed ${props => props.isDragActive ? '#6366f1' : '#d1d5db'};
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  background: ${props => props.isDragActive ? 'rgba(99, 102, 241, 0.05)' : '#f9fafb'};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    border-color: #6366f1;
    background: rgba(99, 102, 241, 0.02);
  }
`;

const DropzoneIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 16px;
  color: #6366f1;
`;

const DropzoneText = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 8px;
`;

const DropzoneSubtext = styled.p`
  color: #9ca3af;
  font-size: 0.9rem;
`;

const UploadedImages = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
  margin-top: 20px;
`;

const ImagePreview = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #f3f4f6;
  aspect-ratio: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageRemoveButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 16px 24px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const BackButton = styled(Button)`
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  
  &:hover:not(:disabled) {
    background: #e5e7eb;
    transform: translateY(-1px);
  }
`;

const AnalyzeButton = styled(Button)`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const LoadingContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  max-width: 400px;
  width: 90%;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const LoadingSubtext = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

function DataInput() {
  const navigate = useNavigate();
  const [pastExperience, setPastExperience] = useState('');
  const [chatRecords, setChatRecords] = useState(['']);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [relationshipData, setRelationshipData] = useState(null);

  useEffect(() => {
    // 从localStorage获取关系数据
    const data = localStorage.getItem('relationshipData');
    if (!data) {
      navigate('/setup');
      return;
    }
    setRelationshipData(JSON.parse(data));
  }, [navigate]);

  const onDrop = (acceptedFiles) => {
    const imageFiles = acceptedFiles.filter(file => 
      file.type.startsWith('image/')
    );
    
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImages(prev => [...prev, {
          file,
          preview: reader.result,
          id: Date.now() + Math.random()
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    multiple: true
  });

  const handleChatRecordChange = (index, value) => {
    const newRecords = [...chatRecords];
    newRecords[index] = value;
    setChatRecords(newRecords);
  };

  const addChatRecord = () => {
    setChatRecords([...chatRecords, '']);
  };

  const removeChatRecord = (index) => {
    if (chatRecords.length > 1) {
      setChatRecords(chatRecords.filter((_, i) => i !== index));
    }
  };

  const removeImage = (id) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  const handleSubmit = async () => {
    if (!pastExperience.trim() && !chatRecords.some(record => record.trim())) {
      alert('请至少填写往事经历或聊天记录中的一项');
      return;
    }

    setIsLoading(true);

    try {
      // 准备分析数据
      const analysisData = {
        relationship: relationshipData.relationship,
        userIdentity: relationshipData.userIdentity,
        pastExperience: pastExperience.trim(),
        chatRecords: chatRecords.filter(record => record.trim())
      };

      // 如果有图片，先上传图片获取分析结果
      let imageAnalysis = '';
      if (uploadedImages.length > 0) {
        const formData = new FormData();
        uploadedImages.forEach(img => {
          formData.append('images', img.file);
        });

        const imageResponse = await axios.post('/api/upload-images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (imageResponse.data.success) {
          imageAnalysis = imageResponse.data.imageAnalysis;
        }
      }

      // 发送分析请求
      const response = await axios.post('/api/analyze', {
        ...analysisData,
        imageAnalysis
      });

      if (response.data.success) {
        // 保存分析结果到localStorage
        localStorage.setItem('analysisResult', JSON.stringify({
          analysis: response.data.analysis,
          chatCount: response.data.chatCount,
          imageCount: uploadedImages.length,
          timestamp: new Date().toISOString()
        }));

        navigate('/result');
      } else {
        throw new Error(response.data.error || '分析失败');
      }
    } catch (error) {
      console.error('分析错误:', error);
      alert(`分析过程中出现错误: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/setup');
  };

  if (!relationshipData) {
    return null;
  }

  return (
    <Container>
      <Content>
        <Card className="fade-in">
          <Progress>
            <ProgressBar>
              <ProgressStep active />
              <ProgressLine active />
              <ProgressStep active />
              <ProgressLine active />
              <ProgressStep active />
              <ProgressLine />
              <ProgressStep />
            </ProgressBar>
          </Progress>

          <Title>数据输入</Title>
          <Subtitle>
            请详细填写您的往事经历和聊天记录，信息越完整，分析结果越准确
          </Subtitle>

          <FormGroup>
            <SectionTitle>📝 往事经历</SectionTitle>
            <SectionDescription>
              请详细描述您最近的经历、感受、困扰或任何您认为重要的事情。
              这些信息将帮助AI更好地理解您的心理状态。
            </SectionDescription>
            <Textarea
              value={pastExperience}
              onChange={(e) => setPastExperience(e.target.value)}
              placeholder="请在这里详细描述您的往事经历、感受和困扰...&#10;&#10;例如：&#10;- 最近发生了什么让您困扰的事情？&#10;- 您的情绪状态如何？&#10;- 有什么特别想要解决的问题？&#10;- 您对某段关系的感受如何？"
            />
          </FormGroup>

          <ChatRecordSection>
            <SectionTitle>💬 微信聊天记录</SectionTitle>
            <SectionDescription>
              请粘贴您与{relationshipData.relationship}的聊天记录。
              可以分段添加多次导出的记录，系统会自动整理和分析。
            </SectionDescription>
            
            <ChatRecordList>
              {chatRecords.map((record, index) => (
                <ChatRecordItem key={index}>
                  <ChatRecordHeader>
                    <ChatRecordLabel>聊天记录 {index + 1}</ChatRecordLabel>
                    {chatRecords.length > 1 && (
                      <RemoveButton onClick={() => removeChatRecord(index)}>
                        删除
                      </RemoveButton>
                    )}
                  </ChatRecordHeader>
                  <Textarea
                    value={record}
                    onChange={(e) => handleChatRecordChange(index, e.target.value)}
                    placeholder="请粘贴微信聊天记录...&#10;&#10;格式示例：&#10;————— 2024-01-01 —————&#10;张三 14:30&#10;你好，最近怎么样？&#10;&#10;李四 14:32&#10;还不错，你呢？"
                    style={{ minHeight: '200px' }}
                  />
                </ChatRecordItem>
              ))}
            </ChatRecordList>
            
            <AddChatButton onClick={addChatRecord}>
              + 添加更多聊天记录
            </AddChatButton>
          </ChatRecordSection>

          <FormGroup>
            <SectionTitle>🖼️ 相关图片</SectionTitle>
            <SectionDescription>
              上传聊天中提到的图片，AI会分析图片内容并结合到整体分析中。
              支持 PNG、JPG、JPEG、GIF 格式，单个文件不超过10MB。
            </SectionDescription>
            
            <DropzoneContainer {...getRootProps()} isDragActive={isDragActive}>
              <input {...getInputProps()} />
              <DropzoneIcon>📸</DropzoneIcon>
              {isDragActive ? (
                <DropzoneText>松开鼠标上传图片</DropzoneText>
              ) : (
                <>
                  <DropzoneText>点击或拖拽图片到此处上传</DropzoneText>
                  <DropzoneSubtext>支持多张图片同时上传</DropzoneSubtext>
                </>
              )}
            </DropzoneContainer>

            {uploadedImages.length > 0 && (
              <UploadedImages>
                {uploadedImages.map((image) => (
                  <ImagePreview key={image.id}>
                    <Image src={image.preview} alt="上传的图片" />
                    <ImageRemoveButton onClick={() => removeImage(image.id)}>
                      ×
                    </ImageRemoveButton>
                  </ImagePreview>
                ))}
              </UploadedImages>
            )}
          </FormGroup>

          <ButtonGroup>
            <BackButton onClick={handleBack}>
              上一步
            </BackButton>
            <AnalyzeButton onClick={handleSubmit}>
              开始AI分析
            </AnalyzeButton>
          </ButtonGroup>
        </Card>
      </Content>

      {isLoading && (
        <LoadingOverlay>
          <LoadingContent>
            <LoadingSpinner />
            <LoadingText>正在分析中...</LoadingText>
            <LoadingSubtext>AI正在深度分析您的数据，请稍候</LoadingSubtext>
          </LoadingContent>
        </LoadingOverlay>
      )}
    </Container>
  );
}

export default DataInput; 