import logo from './logo.svg';
import './App.css';
import BoxedImage from './components/BoxedImage';
import Background from './icons/wallpaper.jpg';
import styled from 'styled-components';
import Popup from './components/Popup';
import { useEffect, useState } from 'react';
import ImageDisplay from './components/ImageDisplay';

const BackgroundImage = styled.img`
  position: fixed;
  top: 0;
  object-fit: fill;
  opacity: 0.3;
  z-index: -1;
  height: 100vh;
  width: 100vw;
`;

const App = () => {
  return (
    <div>
      <BackgroundImage src={Background}/>
      <ImageDisplay/>
    </div>
  );
}

export default App;
