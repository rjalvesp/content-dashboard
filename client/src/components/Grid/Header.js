import styled from 'styled-components';

export const AccessMatrixGridHeader = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 150px 150px 1fr;

  margin-top: 24px;

  .ant-typography {
    padding-right: 16px;
    margin: 0 !important;
  }
`;

export const RestrictedAccessGridHeader = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 200px 1fr;

  margin-top: 24px;

  .ant-typography {
    padding-right: 16px;
    margin: 0 !important;
  }
`;

export const ActionHeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 8px;

  button {
    margin-right: 12px;
    &:last-child {
      margin-right: 0;
    }
  }
`;
