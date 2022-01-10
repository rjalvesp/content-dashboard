import React from 'react';
import styled from 'styled-components';

const Canvas = styled.div`
  height: calc(100vh - 42px);
  width: 100%;

  display: flex;
  flex-direction: column;
  
  padding: 24px;
`;

const Container = ({ children }) => {
  return <Canvas>
    {children}
  </Canvas>
};

export default Container;