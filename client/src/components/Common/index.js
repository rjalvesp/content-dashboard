import styled from 'styled-components';
import { Button } from 'antd';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CenteredButton = styled(Button)`
  display: flex;
  align-items: center;
  width: fit-content;
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: container;
`;

export const Code = styled.pre`
  border-radius: 6px;
  border: 1px solid #dadada;

  background-color: #f6f6f6;

  padding: 1rem;
`;
