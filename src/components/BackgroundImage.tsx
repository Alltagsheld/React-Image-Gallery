import styled from 'styled-components';
import { BodyText } from './BodyText';

const BackgroundImage = styled.img<{popupPressed?: boolean}>`
  position: fixed;
  top: 0;
  object-fit: fill;
  opacity: ${props => props.popupPressed ? "0.3" : "0.1"};
  z-index: -1;
  height: 100vh;
  width: 100vw;
`;

export default BackgroundImage;