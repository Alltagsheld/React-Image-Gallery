import styled from "styled-components";
import Upload from '../icons/upload.png';
import Cancel from '../icons/x-red.png';
import { useEffect, useState } from "react";
import ImageGallery from '../components/ImageGallery';
import { ImageWithTag } from "../pages/LandingPage";
import EditWindow from "./EditWindow";
import { Headline, Text } from "./BodyText";

const Wrapper = styled.article`
`;

const Input = styled.input`
    position: relative; 
    overflow: hidden;
    height: 0;
    width: 0;
`;
const InputLabel = styled.label`
    background-color: #02b355;
    cursor: pointer;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 200px;
    margin: 0 auto;
    margin-top: 50px;

    &::before {
        color: #fff;
        font-family: "Font Awesome 5 Pro";
        font-size: 100%;
        height: 100%;
        right: 130%;
        line-height: 3.3;
        position: absolute;
        top: 0px;
        transition: all 0.3s;
    }
    &:hover{
        opacity: 0.8;
    }

    animation: blink 2.6s infinite;

    @keyframes blink {
        50% {
            opacity: 0.3;
        }
    }
`;

const CancelButton = styled.img`
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(120%, -100%);
    cursor: pointer;
    &:hover{
        opacity: 0.6;
    }
`;

const NoInputWrapper = styled.div`
    position: absolute;
    display: block;
    align-items: center;
    justify-content: center;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 1rem;
    max-width: 500px;
    width: 100%;
    padding: 2rem;
    animation: enter 3s 1;

    @media(max-widtH: 750px){
        width: 60%;
    }

    @keyframes enter {
        0% {
            width: 0%;
        }
    }
`;
const InputWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    opacity: 0.95;
    @media (max-width: 750px){
        display: block;
        margin-top: 20px;
    }
`;

type PopupProps = {
    closePopup: () => void;
    setImages: (data: ImageWithTag[]) => void;
    images: ImageWithTag[];
}

const Popup = (props: PopupProps) => {
    const [imageToStore, setImageToStore] = useState<ImageWithTag>({
        path: "",
        tags: [],
        message: ""
    });
    const [previewMode, setPreviewMode] = useState<boolean>(false);

    const refreshImages = (data: ImageWithTag[]) => {
        props.setImages(data);
    }

    const selectFile = (e: any) => {
        const uploadedFile = e.target.files[0];
        let reader = new FileReader();
        try{
            reader.readAsDataURL(uploadedFile);
            if(reader.error!== null) throw new Error("error reading from file");
            reader.onloadend = () => {
                const result: ImageWithTag = {
                    path: reader.result as string,
                    tags: [],
                    message: ""
                }
                setImageToStore(result);
                setPreviewMode(true);
            }
        }
        catch(Exception){
            console.error(Exception + " " + reader.error);
        }
    }
    return(
        <Wrapper>
            {!previewMode && <NoInputWrapper>
                <Headline>Lade deine Bilder hoch!</Headline>
                <InputLabel onClick={() => {}}>
                    <img src={Upload} width="30px" style={{margin: "10px"}}/>
                    <Text color="white">Bild auswählen</Text>
                    <Input accept="image/png, image/jpeg" type="file" onChange={(e:any) => {
                        selectFile(e);
                    }}/>
                </InputLabel>
                <CancelButton src={Cancel} onClick={() => props.closePopup()}/>
            </NoInputWrapper>}
            {previewMode && <InputWrapper id="inputwrapper">
                <ImageGallery preview images={[imageToStore]} startAtIndex={0} closeGallery={() => setPreviewMode(false)} deleteImage={() => {}}/>
                <EditWindow images={props.images} image={imageToStore} setImages={refreshImages} closePopup={props.closePopup}/>
                <CancelUploadButton src={Cancel} onClick={() => props.closePopup()}/>
            </InputWrapper>}
        </Wrapper>
    );
}
const CancelUploadButton = styled.img`
    position: relative;
    margin-right: 10px;
    width: 40px;
    height: 40px;
    transform: translate(0, -100%);
    cursor: pointer;
    &:hover{
        opacity: 0.6;
    }
    @media (max-width: 750px){
        position: absolute;
        bottom: -14%;
        right: 20%;
        z-index: 4;

    }
`;

export default Popup;