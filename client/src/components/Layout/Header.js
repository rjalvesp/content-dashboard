import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  padding: 12px;

  box-shadow: 0px 1px 2px #dadada;
`;

const StyledLink = styled(Link)`
  padding: 4px 8px;
  margin: 16px;

  border-radius: 6px;

  text-decoration: none;

  &:hover {
    background-color: #f0f0f0;
  }

  &:hover, &:active, &:visited, &:-webkit-any-link {
    text-decoration: none;
  }
`;

const Header = () => {
  return <HeaderContainer>
    <StyledLink to="/">Home</StyledLink>
    <StyledLink to="/restricted-content">Restricted Content</StyledLink>
    <StyledLink to="/access-matrix">Access Matrix</StyledLink>
  </HeaderContainer>
};

export default Header;