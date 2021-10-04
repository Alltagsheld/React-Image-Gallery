import styled from 'styled-components';
import { useState } from 'react';
import BoxedImage from './BoxedImage';
import { ImageWithTag } from '../pages/LandingPage';
import Stripes from './../icons/stripes.png';
import ImageGallery from './ImageGallery';
import BackgroundImage from './BackgroundImage';


const AllImages = styled.div<{blurred: boolean}>`
    position: relative;
    pointer-events: ${props => props.blurred? "none" : "all"};
    z-index: 1;
    margin: 1rem;
    justify-content: center;
    text-align: center;
    display: grid;
    grid-gap: 1rem;
    filter: ${props => props.blurred ? "blur(4px)" : 0};
    @media (min-width: 750px){
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        grid-auto-rows: 240px;
    }
`;

const DisplayWrapper = styled.article`
    overflow-y: scroll;
    width: 100%;
    ::-webkit-scrollbar{
        display: none;
    }
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
`;
export type ImageDisplayProps = {
    images: ImageWithTag[];
    galleryOpen?: () => void;
    galleryClose?: () => void;
}

const ImageDisplay = (props: ImageDisplayProps) => {
    const [fullscreenMode, setFullscreenMode] = useState<boolean>(false);
    const [fullscreenAtIndex, setFullscreenAtIndex] = useState<number>(-1);

    const prepareFullscreenMode = (index: number) => {
        setFullscreenAtIndex(index);
        setFullscreenMode(true);
        if(props.galleryOpen)props.galleryOpen();
    }   

    const endFullscreenMode = () => {
        setFullscreenMode(false);
        if(props.galleryClose)props.galleryClose();
    }

    return(
        <DisplayWrapper>
            <AllImages blurred={fullscreenMode}>
                {props.images && props.images.map((element, key) => {
                    console.log(props.images);
                return <BoxedImage index={key} key={key} imageWithTag={element} onClick={prepareFullscreenMode}/>
                })}
            </AllImages>
            {fullscreenMode && <BackgroundImage src={Stripes}/>}
            {fullscreenMode && <ImageGallery preview={false} startAtIndex={fullscreenAtIndex} images={props.images} closeGallery={endFullscreenMode}/>}
        </DisplayWrapper>
    );
}
export default ImageDisplay;