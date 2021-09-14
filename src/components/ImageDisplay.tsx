import styled from 'styled-components';
import { BodyText } from './BodyText';
import PlusIcon from './../icons/plus-icon-white.png';
import { InputHTMLAttributes, useState } from 'react';
import BoxedImage from './BoxedImage';
import logo from './../logo.svg';
import LessThan from './../icons/lessThan.png';
import GreaterThan from './../icons/greaterThan.png';
import Abort from './../icons/abort.jpg';

const AllImages = styled.article`
  margin: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 20px;
  justify-content: center;
  text-align: center;
  @media screen and (min-width: 768px){
    grid-template-columns: repeat(auto-fill, 200px);
  }
  @media screen and (max-width: 768px){
    grid-template-columns: repeat(auto-fill, 100%);
  }
`;

export type ImageWithTag = {
    img: string;
    tags: string[];
}

const ImageDisplay = () => {
    const [images, setImages] = useState<ImageWithTag[]>([]);
    const [fullscreenMode, setFullscreenMode] = useState<boolean>(false);
    const [fullscreenAtIndex, setFullscreenAtIndex] = useState<number>(-1);

    const addNewImage :ImageWithTag = {
        img: PlusIcon,
        tags: ["add new Image"]
    }

    const uploadImage = (img: string, tags: string[]) => {
        let newArray: ImageWithTag[] = [];
        if(images !== undefined){
            newArray = [...images];
        }
            const newImage: ImageWithTag = {
                img: img,
                tags: tags
            }
            newArray.push(newImage);
            setImages(newArray);
    }

    const prepareFullscreenMode = (index: number) => {
        setFullscreenAtIndex(index);
        setFullscreenMode(true);
    }   

    const endFullscreenMode = () => {
        setFullscreenMode(false);
    }

    return(
        <div>
            <AllImages>
                {images && images.map((element, key) => {
                return <BoxedImage index={key} fullscreenMode={prepareFullscreenMode} key={key} imageWithTag={element}/>
                })}
                <BoxedImage index={images.length} addImage={true} uploadImage={uploadImage} imageWithTag={addNewImage}/>
            </AllImages>
            {fullscreenMode &&<BlurContainer/>}
            {fullscreenMode && <ImageGallery startAtIndex={fullscreenAtIndex} images={images} closeGallery={endFullscreenMode}/>}
        </div>
    );
}

const GalleryContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 10vh;
    bottom: 10vh;
    left: 10vw;
    right: 10vw;
    background-color: white;
    opacity: 0.95;
    width: 80vw;
    height: 80vh;
`;

const BlurContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    filter: blur(4px);
`;

const GalleryImage = styled.img`
    object-fit: scale-down;
    width: auto;
    max-width: 90%;
    height: 100%;
    z-index: 2;
`;

const GalleryButton = styled.img<{left: boolean}>`
    width: 50px;
    height: 50px;
    cursor: pointer;
    &:hover{
        opacity: 0.6;
    }
    transform: ${props => props.left ? "translate(-100%)" : "translate(100%)"};
`;
const AbortButton = styled(GalleryButton)`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(120%, -100%);
`;

type ImageGalleryProps = {
    images: ImageWithTag[];
    startAtIndex: number;
    closeGallery: () => void;
}

const ImageGallery = (props: ImageGalleryProps) => {

    const [current, setCurrent] = useState<number>(props.startAtIndex);

    const getImageAtIndex = (index: number) => {
        return props.images[index].img;
    }
    const nextElement = () => {
        if((current +1) < props.images.length) setCurrent(current+1);
    }
    const prevElement = () => {
        if((current - 1) >= 0 )setCurrent(current-1);
    }
    const closeGallery = () => {
        props.closeGallery();
    }

    return(
        <GalleryContainer>
            <GalleryButton left={true} src={LessThan} onClick={prevElement}/>
            <GalleryImage src={getImageAtIndex(current)}/>
            <GalleryButton left={false} src={GreaterThan} onClick={nextElement}/>
            <AbortButton src={Abort} left={false} onClick={closeGallery}/>
        </GalleryContainer>
    );
}
export default ImageDisplay;