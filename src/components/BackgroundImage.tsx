import styled from 'styled-components';

const BackgroundImage = styled.img<{popupPressed?: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  object-fit: fill;
  opacity: ${props => props.popupPressed ? "0.3" : "0.1"};
  z-index: 2;
  height: 100vh;
  width: 100%;
  pointer-events: none;
`;

export default BackgroundImage;