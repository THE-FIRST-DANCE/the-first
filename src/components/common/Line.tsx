import styled from 'styled-components';

export const HrLine = styled.hr<{ $strong?: boolean }>`
  width: 100%;
  border: 0;
  border-top: ${({ theme }) => theme.lightTheme.borderColor};
  margin: 0;
`;

export const VrLine = styled.div`
  border-left: ${({ theme }) => theme.lightTheme.borderColor};
  margin: 0;
`;
