import styled from "styled-components";
import Upload from '../icons/upload.png';
import Abort from '../icons/x-red.png';
import { useEffect, useState } from "react";
import LessThan from './../icons/lessThan.png';
import GreaterThanWhite from './../icons/greaterThanWhite.png';
import { ImageWithTag } from "../pages/LandingPage";
import Comment from './../icons/comment.png';
import InformationWindow from "./InformationWindow";

const GalleryContainer = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-content: center;
    left: 50vw;
    top: 50vh;
    transform: translate(-50%, -50%);
    z-index: 3;
    width: 100%;
`;

const PreviewContainer = styled.div`
    position: relative;
    z-index: 3;
`;

const GalleryImage = styled.img<{previewMode: boolean}>`
    object-fit: contain;
    height: ${props => props.previewMode ? "auto" : "85vh"};
    max-height: ${props => props.previewMode ? "85vh" : "auto"};
    max-width: ${props => props.previewMode ? "85%" : "100%%"};
    z-index: 2;
    box-shadow: 0 0 3px 3px rgba(255, 255, 255, 0.404);
`;

const GalleryButton = styled.img<{left: boolean}>`
    position: absolute;
    top: 50vh;
    right: 0;
    left: ${props => props.left ? 0 : "auto"};
    transform: ${props => props.left ? "translate(0, -100%) rotate(180deg)" : "translate(0, -100%)"} ;
    width: 50px;
    margin: 20px;
    cursor: pointer;
    z-index: 3;
    opacity: 0.75;
    &:hover{
        opacity: 0.6;
    }
`;
const AbortButton = styled.img`
    position: absolute;
    overflow: hidden;
    top: -10px;
    right: 0;
    width: 40px;
    height: 40px;
    margin: 3vh;
    transform: translate(0, -100%);
    cursor: pointer;
    &:hover{
        opacity: 0.6;
    }
    z-index: 3;
`;
const InfoButton = styled(AbortButton)`
    height: auto;
    opacity: 1.0;
    top: 4%;
    transform: translate(0, 0);
`;

type ImageGalleryProps = {
    images: ImageWithTag[];
    startAtIndex: number;
    closeGallery: () => void;
    preview: boolean;
}

const ImageGallery = (props: ImageGalleryProps) => {
    const [clientWidth, setClientWidth] = useState<number>(0);
    const [openInfoWindow, setOpenInfoWindow] = useState<boolean>(true);
    const [current, setCurrent] = useState<number>(props.startAtIndex);

    const getImageAtIndex = (index: number) => {
        return props.images[index];
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

    useEffect(() => {
        setClientWidth(document.body.clientWidth);
    }, [document.body.clientWidth])

    return(
        props.preview ? <PreviewContainer>
            <GalleryImage previewMode src={getImageAtIndex(current).path}/>
        </PreviewContainer>
        :
        <GalleryContainer>
            {(current - 1) >= 0 && <GalleryButton left={true} src={GreaterThanWhite} onClick={prevElement}/>}
            <GalleryImage previewMode={false} src={getImageAtIndex(current).path}/>
            {openInfoWindow &&  getImageAtIndex(current).message && <InformationWindow image={getImageAtIndex(current)}/>}
            {(current + 1) < props.images.length &&<GalleryButton left={false} src={GreaterThanWhite} onClick={nextElement}/>}
            <InfoButton src={Comment} onClick={() => setOpenInfoWindow(!openInfoWindow)}/>
            <AbortButton id="abortbutton" src={Abort} onClick={closeGallery}/>
        </GalleryContainer>
    );
}
export default ImageGallery;