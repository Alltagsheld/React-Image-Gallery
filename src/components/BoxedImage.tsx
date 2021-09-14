import styled from 'styled-components';
import { BodyText } from './BodyText';
import PlusIcon from './../icons/plus-icon-white.png';
import { InputHTMLAttributes, useState } from 'react';
import { ImageWithTag } from './ImageDisplay';
import { NumericLiteral } from 'typescript';

const BoxContainer = styled.article<{addImage?: boolean}>`
    display: block;
    grid-column: auto;
    grid-row: auto;
    cursor: ${props => props.addImage ? "auto" : "pointer" };
`;

const Image = styled.img<{addImage?: boolean}>` //!important
    height: 300px;
    box-shadow: 0px 0px 6px rgba(0,0,0,0.1);
    background-color: white;
    border-radius: 6px;
    display: block;
    object-fit: scale-down;
    cursor: pointer;
    opacity: ${props => props.addImage ? "0.8" : 1};
    outline: ${props => props.addImage ? "dashed grey" : "none"};
    @media screen and (min-width: 768px){
        width: 200px;
    }
    @media screen and (max-width: 768px){
        width: 100%;
    }
    &:hover{
        opacity: 0.6;
    }
`;
const UploadPopup = styled.div`
    position: absolute;
    display: block;
    background-color: white;
    top: 50vh;
    left: 50vw;
    padding: 50px;
    transform: translate(-50%, -50%);
    text-align: center;
    align-items: center;
    align-content: center;
`;

const Button = styled.button`
    background-color: white;
    box-shadow: 0px 0px 6px rgba(0,0,0,0.1);
    width: 200px;
    height: 50px;
    margin: 50px 0 20px 0;
    cursor: pointer;
`;

const InputField = styled.input`
    padding-bottom: 20px;
`;
const InputContainer = styled.div`
    display: block;
    padding: 20px;
    text-align: left;
`;

const FlexContainer = styled.div`
    margin-top: 20px;
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

export type BoxedImageProps = {
    index: number;
    imageWithTag: ImageWithTag;
    addImage?: boolean;
    uploadImage? : (img: string, tags: string[]) => void;
    fullscreenMode?: (index: number) => void;
}

const BoxedImage = (props: BoxedImageProps) => {
    const [addImage, setAddImage] = useState<boolean>(props.addImage ? true : false);
    const [shownImage, setShownImage] = useState<string>(props.addImage ? PlusIcon : (props.imageWithTag.img ? props.imageWithTag.img : ""));
    const [imageToStore, setImageToStore] = useState<string>("");
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [tags, setTags] = useState<string[]>([""]);

    const addNewImage = (e: any) => {
        const uploadedFile = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(uploadedFile);
        reader.onloadend = () => {
            const newImage = {
                url: reader.result as string,
                name: "tmp",
                type: "Image",
            }
            setImageToStore(newImage.url);
        }
    }

    const updateTags = (e: any) => {
        setTags(e.target.value.split(", "));
    }

    const commitUpload = () => {
        if(props.uploadImage){
            setPopupOpen(false);
            props.uploadImage(imageToStore, tags);
            console.log("should have been called");
        }
    }

    const switchToFullscreen = () => {
        if(props.fullscreenMode) props.fullscreenMode(props.index);
    }

    return(
        <BoxContainer addImage={addImage} onClick={switchToFullscreen}>
            <Image addImage={addImage} src={shownImage} onClick={addImage ? () => {setPopupOpen(true)} : () => {}}/>
            <BodyText>{props.imageWithTag.tags.join(", ")}</BodyText>
            {popupOpen && <UploadPopup>
                <BodyText bold={true}>Wähle ein Bild aus!</BodyText>
                <FlexContainer>
                    {imageToStore!="" && <Image src={imageToStore}/>}
                    <InputContainer>
                        <InputField type="file" onChange={addNewImage}/>
                        {imageToStore!="" && <InputField type="text" placeholder="gib deinem Bild Tags!" value={tags} onInput={updateTags}/>}
                    </InputContainer>
                </FlexContainer>
                    <Button onClick={props.uploadImage ? commitUpload: () => {}}>Upload me!</Button>
            </UploadPopup>}
        </BoxContainer>
    );
}

export default BoxedImage;