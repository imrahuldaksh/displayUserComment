import React, {useState, useEffect} from 'react';
import './App.css';
import { mockUser } from './localMockDataInfo';
import CommentsList from './components/CommentsList';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px;
  background-color: #49836c;
  color: #fff;
  margin-bottom: 50px;
  position: sticky;
  top: 0;
  z-index: 99;
  transition: background-color 0.3s ease;

  &.scrolled {
    background-color: #325e4d;
  }
`;

const AppName = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const appName = 'Baya | UserComment Reviews';
  return (
    <div className="App">
      <HeaderContainer className={isScrolled ? 'scrolled' : ''}>
        <AppName>{appName}</AppName>
        <UserName>
          {
            mockUser.isLoggedIn ? `Logged in As ${mockUser.username}` : 'Sign In'
          }
        </UserName>
      </HeaderContainer>
      <CommentsList />
    </div>
  );
}

export default App;
