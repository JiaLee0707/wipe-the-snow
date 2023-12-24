import styled, {css, keyframes} from 'styled-components';

export const Container = styled.div`
  background-color: #cbf3f5;
  min-height: 100vh;
  overflow: hidden;
`;
// const animate = (size, count) => keyframes`
//   0% {
//     transform: translateY(0) rotate(0deg);
//   }
//   100% {
//     //transform: translateY(100vh) rotate(360deg);
//     transform: translateY(calc(100vh - ${size}px * ${count} / ${Math.ceil(window.innerWidth / size)})) rotate(360deg);
//   }
// `;

export const SnowWrap = styled.div`
  position: absolute;
  top: -20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  //background-color: #fff;
  filter: blur(0.8px); /* 흐림 효과 설정 */
  
  img {
    border-radius: 50%;
    object-fit: fill;
    ${({theme}) => theme.common.wh('100%')}
  }
  left: ${({$left}) => $left && `${$left}px`};
  ${({theme, size}) => theme.common.wh(`${size}px`)}
`;

//animation: ${animate} 5s linear infinite;
//animation: ${animate} 5s linear forwards;
//animation: ${({ size, count }) => css`${animate(size, count)} 5s linear forwards`};
