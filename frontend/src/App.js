import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import WelcomePage from './pages/WelcomePage';
import RelationshipSetup from './pages/RelationshipSetup';
import DataInput from './pages/DataInput';
import AnalysisResult from './pages/AnalysisResult';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
    color: #333;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  /* 滚动条样式 */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  /* 动画效果 */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .fade-in {
    animation: fadeIn 0.6s ease-out;
  }

  .slide-in {
    animation: slideIn 0.6s ease-out;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 0;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Footer = styled.footer`
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    padding: 15px;
    font-size: 0.8rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Logo = styled.span`
  font-weight: bold;
  color: #6366f1;
  font-size: 1.1rem;
`;

const Links = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const Link = styled.a`
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #6366f1;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <MainContent>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/setup" element={<RelationshipSetup />} />
            <Route path="/input" element={<DataInput />} />
            <Route path="/result" element={<AnalysisResult />} />
          </Routes>
        </MainContent>
        
        <Footer>
          <FooterContent>
            <div>
              <Logo>万千达</Logo> - AI情感分析平台
            </div>
            <Links>
              <Link href="#privacy">隐私政策</Link>
              <Link href="#terms">使用条款</Link>
              <Link href="#contact">联系我们</Link>
            </Links>
            <div>
              © 2024 万千达. 保留所有权利.
            </div>
          </FooterContent>
        </Footer>
      </AppContainer>
    </Router>
  );
}

export default App; 