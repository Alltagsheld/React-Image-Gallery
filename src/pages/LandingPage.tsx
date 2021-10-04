import ImageDisplay from './../components/ImageDisplay';
import { useEffect, useState } from 'react';
import Wallpaper from './../icons/wallpaper.jpg';
import styled from 'styled-components';
import Popup from '../components/Popup';
import PlusIcon from './../icons/plus-icon-white.png';
import Stripes from './../icons/stripes.png';
import Abort from '../icons/x.png';

export const BackgroundImage = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  object-fit: cover;
  z-index: 0;
  opacity: 0.3;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const Background = styled.div`
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    opacity: 0.3;
    height: 100vh;
    width: 100vw;
    
    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`;
const Blur = styled.section<{isBlurred: boolean}>`
    position: fixed;
    background: linear-gradient(-45deg, #ee7652b0, #e73c7ebc, #23a5d5ab#23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    filter: ${props => props.isBlurred ? "blur(4px)" : 0};
    display: flex;
    justify-content: center;
    overflow: hidden;
    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`;

const Image = styled.img` 
    position: fixed;
    z-index: 2;
    bottom: 0;
    right: 0;
    margin: 50px;
    box-shadow: 0px 0px 6px rgba(0,0,0,0.1);
    background-color: transparent;
    border-radius: 50%;
    height: 80px;
    width: 80px;
    display: block;
    object-fit: contain;
    cursor: pointer;
    transform: rotate(45deg);
    &:hover{
        opacity: 0.6;
    }
`;

export type ImageWithTag = {
    path: string;
    tags: string[];
    message: string;
}

export const LandingPage = () => {
    const [popupActive, setPopupActive] = useState<boolean>(false);
    const [galleryOpen, setGalleryOpen] = useState<boolean>(false);
    const [images, setImages] = useState<ImageWithTag[]>([]);

    return(
        <>
            <Blur isBlurred={popupActive}>
                <Background/>
                {!galleryOpen && <Image src={Abort} onClick={() => setPopupActive(true)}/>}
                <ImageDisplay galleryClose={() => setGalleryOpen(false)}  galleryOpen={() => setGalleryOpen(true)} images={images}/>
            </Blur>
            {popupActive && <BackgroundImage src={Stripes}/>}
            {popupActive && !galleryOpen &&<Popup images={images} setImages={(data: ImageWithTag[]) => setImages(data)} closePopup={() => setPopupActive(false)}/>} 
        </>
    );
}
export default LandingPage;