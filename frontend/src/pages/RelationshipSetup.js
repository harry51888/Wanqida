import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Card = styled.div`
  background: white;
  border-radius: 24px;
  padding: 50px 40px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.8s ease-out;
  
  @media (max-width: 768px) {
    padding: 30px 24px;
    border-radius: 20px;
    margin: 20px;
  }
`;

const Progress = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
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
  font-size: 2.2rem;
  color: #333;
  text-align: center;
  margin-bottom: 12px;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 30px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.label`
  font-size: 1.1rem;
  color: #333;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RequiredMark = styled.span`
  color: #ef4444;
  font-size: 1.2rem;
`;

const Input = styled.input`
  padding: 16px 20px;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;
  background: #f9fafb;
  
  &:focus {
    border-color: #6366f1;
    background: white;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const Select = styled.select`
  padding: 16px 20px;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;
  background: #f9fafb;
  cursor: pointer;
  
  &:focus {
    border-color: #6366f1;
    background: white;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const HelpText = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin-top: -8px;
  line-height: 1.5;
`;

const ExampleBox = styled.div`
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: 12px;
  padding: 16px;
  margin-top: 8px;
`;

const ExampleTitle = styled.h4`
  color: #6366f1;
  font-size: 0.9rem;
  margin-bottom: 8px;
  font-weight: 600;
`;

const ExampleText = styled.p`
  color: #4c5563;
  font-size: 0.85rem;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  
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

const NextButton = styled(Button)`
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

const relationshipOptions = [
  { value: '', label: '请选择关系类型' },
  { value: '恋人', label: '恋人/伴侣' },
  { value: '朋友', label: '朋友' },
  { value: '家人', label: '家人' },
  { value: '同事', label: '同事/同学' },
  { value: '其他', label: '其他关系' }
];

function RelationshipSetup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    relationship: '',
    userIdentity: '',
    customRelationship: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.relationship || !formData.userIdentity) {
      alert('请填写完整的信息');
      return;
    }

    // 保存到localStorage供后续页面使用
    const relationshipData = {
      relationship: formData.relationship === '其他' ? formData.customRelationship : formData.relationship,
      userIdentity: formData.userIdentity
    };
    
    localStorage.setItem('relationshipData', JSON.stringify(relationshipData));
    navigate('/input');
  };

  const handleBack = () => {
    navigate('/');
  };

  const isFormValid = formData.relationship && formData.userIdentity && 
    (formData.relationship !== '其他' || formData.customRelationship);

  return (
    <Container>
      <Card className="fade-in">
        <Progress>
          <ProgressBar>
            <ProgressStep active />
            <ProgressLine active />
            <ProgressStep active />
            <ProgressLine />
            <ProgressStep />
            <ProgressLine />
            <ProgressStep />
          </ProgressBar>
        </Progress>

        <Title>关系背景设置</Title>
        <Subtitle>
          为了提供更精准的分析，请告诉我们一些基本信息
        </Subtitle>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>
              <span>🤝</span>
              聊天对象与您的关系 <RequiredMark>*</RequiredMark>
            </Label>
            <Select
              name="relationship"
              value={formData.relationship}
              onChange={handleInputChange}
              required
            >
              {relationshipOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            
            {formData.relationship === '其他' && (
              <Input
                type="text"
                name="customRelationship"
                value={formData.customRelationship}
                onChange={handleInputChange}
                placeholder="请描述具体关系，如：网友、客户、导师等"
                required
              />
            )}
            
            <HelpText>
              选择最符合您实际情况的关系类型，这将帮助AI更好地理解对话背景
            </HelpText>
          </FormGroup>

          <FormGroup>
            <Label>
              <span>👤</span>
              在聊天记录中，哪个名字代表您本人 <RequiredMark>*</RequiredMark>
            </Label>
            <Input
              type="text"
              name="userIdentity"
              value={formData.userIdentity}
              onChange={handleInputChange}
              placeholder="请输入您在聊天中显示的名字"
              required
            />
            <HelpText>
              准确填写您的昵称或姓名，确保AI能正确识别您的发言
            </HelpText>
            
            <ExampleBox>
              <ExampleTitle>💡 示例说明</ExampleTitle>
              <ExampleText>
                如果聊天记录中显示 "张小明 14:30" 和 "李小红 14:32"，
                而您是张小明，那么请填写"张小明"
              </ExampleText>
            </ExampleBox>
          </FormGroup>

          <ButtonGroup>
            <BackButton type="button" onClick={handleBack}>
              返回首页
            </BackButton>
            <NextButton type="submit" disabled={!isFormValid}>
              下一步
            </NextButton>
          </ButtonGroup>
        </Form>
      </Card>
    </Container>
  );
}

export default RelationshipSetup; 