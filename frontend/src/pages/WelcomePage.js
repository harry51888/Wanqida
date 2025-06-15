import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
  background-image: 
    radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, white 2px, transparent 2px);
  background-size: 50px 50px;
  background-position: 0 0, 25px 25px;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 60px 40px;
  max-width: 800px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeIn 1s ease-out;
  
  @media (max-width: 768px) {
    padding: 40px 24px;
    border-radius: 20px;
    margin: 20px;
  }
`;

const Logo = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 30px;
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 40px;
  }
`;

const FeatureItem = styled.div`
  text-align: left;
  padding: 24px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 30px rgba(102, 126, 234, 0.15);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 16px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 12px;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const PrivacySection = styled.div`
  background: rgba(255, 248, 220, 0.8);
  border: 1px solid rgba(255, 193, 7, 0.3);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 40px;
  text-align: left;
`;

const PrivacyTitle = styled.h3`
  color: #d97706;
  font-size: 1.1rem;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PrivacyText = styled.p`
  color: #92400e;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Button = styled.button`
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
  
  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
  
  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }
`;

function WelcomePage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/setup');
  };

  const handleLearnMore = () => {
    // 滚动到功能介绍部分
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container>
      <Background />
      <Card className="fade-in">
        <Logo>万千达</Logo>
        <Subtitle>
          专业的AI情感分析平台<br />
          通过聊天记录和往事分析，为您提供心理洞察和解决方案
        </Subtitle>

        <Features id="features">
          <FeatureItem>
            <FeatureIcon>🧠</FeatureIcon>
            <FeatureTitle>智能情感分析</FeatureTitle>
            <FeatureDescription>
              基于先进的AI技术，深度分析您的情绪状态和心理模式，提供专业的心理评估
            </FeatureDescription>
          </FeatureItem>

          <FeatureItem>
            <FeatureIcon>💬</FeatureIcon>
            <FeatureTitle>聊天记录解析</FeatureTitle>
            <FeatureDescription>
              自动解析微信聊天记录，从对话中发现隐藏的情感信号和人际关系模式
            </FeatureDescription>
          </FeatureItem>

          <FeatureItem>
            <FeatureIcon>🖼️</FeatureIcon>
            <FeatureTitle>图片内容识别</FeatureTitle>
            <FeatureDescription>
              支持上传聊天中的图片，AI会分析图片内容，为分析提供更全面的信息
            </FeatureDescription>
          </FeatureItem>

          <FeatureItem>
            <FeatureIcon>💡</FeatureIcon>
            <FeatureTitle>专业解决方案</FeatureTitle>
            <FeatureDescription>
              基于分析结果，提供个性化的心理调节建议和人际关系改善方案
            </FeatureDescription>
          </FeatureItem>
        </Features>

        <PrivacySection>
          <PrivacyTitle>
            🔒 隐私保护承诺
          </PrivacyTitle>
          <PrivacyText>
            我们深知隐私的重要性。您的所有数据仅用于AI分析，不会被存储、分享或用于其他目的。
            分析完成后，系统会自动清理所有上传的内容，确保您的隐私得到最大程度的保护。
          </PrivacyText>
        </PrivacySection>

        <ButtonGroup>
          <PrimaryButton onClick={handleStart}>
            开始情感分析
          </PrimaryButton>
          <SecondaryButton onClick={handleLearnMore}>
            了解更多
          </SecondaryButton>
        </ButtonGroup>
      </Card>
    </Container>
  );
}

export default WelcomePage; 