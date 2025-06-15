import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  animation: fadeIn 0.8s ease-out;
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
  background: #6366f1;
  transition: background 0.3s ease;
`;

const ProgressLine = styled.div`
  width: 30px;
  height: 2px;
  background: #6366f1;
  transition: background 0.3s ease;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  color: #333;
  margin-bottom: 16px;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StatsCard = styled.div`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  color: white;
  text-align: center;
  animation: slideIn 0.8s ease-out;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 30px;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const ResultCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 40px;
  margin-bottom: 24px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.8s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  animation-fill-mode: both;
  
  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 20px;
  }
`;

const SectionIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
  background: ${props => props.bg || '#f3f4f6'};
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MarkdownContent = styled.div`
  line-height: 1.8;
  color: #374151;
  
  h2 {
    color: #1f2937;
    font-size: 1.4rem;
    margin-top: 32px;
    margin-bottom: 16px;
    font-weight: 600;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 8px;
  }
  
  h3 {
    color: #374151;
    font-size: 1.2rem;
    margin-top: 24px;
    margin-bottom: 12px;
    font-weight: 600;
  }
  
  p {
    margin-bottom: 16px;
    font-size: 1rem;
  }
  
  ul, ol {
    margin-bottom: 16px;
    padding-left: 24px;
  }
  
  li {
    margin-bottom: 8px;
    font-size: 1rem;
  }
  
  blockquote {
    border-left: 4px solid #6366f1;
    background: rgba(99, 102, 241, 0.05);
    padding: 16px 20px;
    margin: 20px 0;
    border-radius: 8px;
    
    p {
      margin-bottom: 0;
      color: #4c5563;
      font-style: italic;
    }
  }
  
  code {
    background: #f3f4f6;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.9rem;
    color: #6366f1;
  }
  
  strong {
    color: #1f2937;
    font-weight: 600;
  }
`;

const ActionSection = styled.div`
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: 16px;
  padding: 30px;
  margin-top: 40px;
  text-align: center;
`;

const ActionTitle = styled.h3`
  color: #333;
  font-size: 1.3rem;
  margin-bottom: 16px;
  font-weight: 600;
`;

const ActionText = styled.p`
  color: #666;
  margin-bottom: 24px;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
  }
`;

const SecondaryButton = styled(Button)`
  background: white;
  color: #6366f1;
  border: 2px solid #6366f1;
  
  &:hover:not(:disabled) {
    background: #6366f1;
    color: white;
    transform: translateY(-2px);
  }
`;

const OutlineButton = styled(Button)`
  background: transparent;
  color: #666;
  border: 1px solid #d1d5db;
  
  &:hover:not(:disabled) {
    border-color: #6366f1;
    color: #6366f1;
    transform: translateY(-1px);
  }
`;

const TimestampCard = styled.div`
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  margin-bottom: 20px;
  color: #666;
  font-size: 0.9rem;
`;

function AnalysisResult() {
  const navigate = useNavigate();
  const [resultData, setResultData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 从localStorage获取分析结果
    const data = localStorage.getItem('analysisResult');
    if (!data) {
      navigate('/');
      return;
    }
    
    const parsedData = JSON.parse(data);
    setResultData(parsedData);
    setIsLoading(false);
  }, [navigate]);

  const handleNewAnalysis = () => {
    // 清除之前的数据
    localStorage.removeItem('analysisResult');
    localStorage.removeItem('relationshipData');
    navigate('/');
  };

  const handleExport = () => {
    if (!resultData) return;
    
    const exportData = {
      timestamp: resultData.timestamp,
      analysis: resultData.analysis,
      statistics: {
        chatCount: resultData.chatCount,
        imageCount: resultData.imageCount
      }
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `万千达分析结果_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <Container>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <div>加载中...</div>
        </div>
      </Container>
    );
  }

  if (!resultData) {
    return null;
  }

  return (
    <Container>
      <Content>
        <Header>
          <Progress>
            <ProgressBar>
              <ProgressStep />
              <ProgressLine />
              <ProgressStep />
              <ProgressLine />
              <ProgressStep />
              <ProgressLine />
              <ProgressStep />
            </ProgressBar>
          </Progress>
          
          <Title>✨ 分析完成</Title>
          <Subtitle>
            基于您提供的信息，我们为您生成了专业的心理分析报告
          </Subtitle>
        </Header>

        <TimestampCard>
          📅 分析时间：{formatTimestamp(resultData.timestamp)}
        </TimestampCard>

        <StatsCard>
          <StatsGrid>
            <StatItem>
              <StatNumber>{resultData.chatCount || 0}</StatNumber>
              <StatLabel>聊天消息</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{resultData.imageCount || 0}</StatNumber>
              <StatLabel>分析图片</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>1</StatNumber>
              <StatLabel>分析报告</StatLabel>
            </StatItem>
          </StatsGrid>
        </StatsCard>

        <ResultCard delay="0.2s">
          <SectionTitle>
            <SectionIcon bg="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)">
              🧠
            </SectionIcon>
            AI分析报告
          </SectionTitle>
          
          <MarkdownContent>
            <ReactMarkdown>{resultData.analysis}</ReactMarkdown>
          </MarkdownContent>
        </ResultCard>

        <ActionSection>
          <ActionTitle>接下来您可以</ActionTitle>
          <ActionText>
            如果您需要进一步的帮助，建议寻求专业心理咨询师的建议。
            万千达的分析仅供参考，不能替代专业的心理治疗。
          </ActionText>
          
          <ButtonGroup>
            <PrimaryButton onClick={handleNewAnalysis}>
              开始新的分析
            </PrimaryButton>
            <SecondaryButton onClick={handleExport}>
              导出报告
            </SecondaryButton>
            <OutlineButton onClick={handlePrint}>
              打印报告
            </OutlineButton>
          </ButtonGroup>
        </ActionSection>
      </Content>
    </Container>
  );
}

export default AnalysisResult; 