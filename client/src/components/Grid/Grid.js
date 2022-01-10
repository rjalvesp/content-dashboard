import styled from 'styled-components';

const commonStyles = `
  display: grid;

  align-items: center;

  .ant-typography {
    margin: 0 !important;
  }
  .cell {
    min-height: 60px;
    padding: 8px;
    border-bottom: 1px solid #f0f0f0;
  }
`;

export const AccessMatrixGrid = styled.div`
  ${commonStyles}
  grid-template-columns: 150px 150px calc(100% - 454px) 154px;
`;

export const RestrictedAccessGrid = styled.div`
  ${commonStyles}
  grid-template-columns: 200px calc(50% - 177px) calc(50% - 177px) 154px;
`;
