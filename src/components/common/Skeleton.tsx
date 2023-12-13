import styled from 'styled-components';

export const Skeleton = styled.div`
  background: #eee;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  &::before {
    content: ' ';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: loading 1.2s infinite;
  }
`;

type SkeletonTextWidth = 'ssm' | 'sm' | 'md' | 'base' | 'lg' | 'xl' | 'full';

export const SkeletonText = styled(Skeleton)<{ $width?: SkeletonTextWidth }>`
  width: ${({ $width }) => {
    switch ($width) {
      case 'ssm':
        return '3rem';
      case 'sm':
        return '5rem';
      case 'md':
        return '10rem';
      case 'lg':
        return '15rem';
      case 'xl':
        return '20rem';
      case 'base':
        return '50%';
      case 'full':
      default:
        return '100%';
    }
  }};
  min-height: 1rem;
`;

export const SkeletonImage = styled(Skeleton)`
  width: 100%;
  height: 100%;
`;
