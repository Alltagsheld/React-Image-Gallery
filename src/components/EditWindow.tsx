import styled from "styled-components";
import { Headline, SubHeadline, Text } from "./BodyText";
import { useState, useEffect } from "react";
import { ImageWithTag } from "../pages/LandingPage";
import Check from './../icons/CheckGreen.png';
import PlusIcon from './../icons/plus-icon-white.png';

const EditImageContainer = styled.div`
    position: relative;
    display: block;
    width: 290px;
    height: 50%;
    background-color: rgba(255, 255, 255, 0.96);
    padding: 10px;
    z-index: 1;
    box-shadow: 0 0 3px 3px rgba(255, 255, 255, 0.404);
    box-sizing: border-box;
    margin: 0px auto;
    margin-bottom: 10px;
`;

export const HashTagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 5px 0 5px 0;
`;

const TextArea = styled.textarea`
        width: 80%;
        height: 60px;
        border: 0;
        box-shadow: 0 0 15px 4px rgba(0,0,0,0.06);
        padding: 10px;
        resize: none;
        outline: none;
        &:focus{
            border: 1px solid grey;
        }
        margin-top: 10px;
        overflow: auto;
    `;

export type EditWindowProps = {
    setImages?: (images: ImageWithTag[]) => void;
    image: ImageWithTag;
    closePopup?: () => void;
    images?: ImageWithTag[];
}

export const EditWindow = (props: EditWindowProps) => {
    const [customHashtag, setCustomHashtag] = useState<string>("#");
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [imageTags, setImageTags] = useState<string[]>([]);
    const [images, setImages] = useState<ImageWithTag[]>(props.images ? props.images : [{
        path: "",
        tags: [],
        message: ""
    }]);
    const TAGS =[
        "#picture", "#photography", "#photo",  "#picoftheday", "#photooftheday",
        "#instagood", "#pic", "#art", "#love", "#instagram", "#beautiful",
        "#like", "#nature", "#pictureoftheday", "#follow", "#photographer",
        "#pictures", "#photos", "#artist", "#foto", "#instalike", "#me",
        "#likes", "#pics", "#drawing", "#instapic", "#instaphoto",
        "#travel", "#myself", "#girl", "#fotografia", "#portrait",
        "#followme", "#selfie", "#instadaily", "#smile", "#cute",
        "#sky", "#likeforlikes", "#fashion", "#followforfollowback", 
        "#color", "#naturephotography", "#life", "#happy", "#sunset",
        "#summer", "#landscape", "#insta", "#lifestyle", "#model", "#l",
        "#style", "#blackandwhite", "#illustration", "#capture", "#beauty",
        "#photographylovers"
    ];

    const addHashtag = (e: any) => {
        if(!imageTags.includes(e.target.value)){
            let result: string[] = [...imageTags];
            result.push(e.target.value);
            setImageTags(result);
        }
    }
    const addCustomHashTag = (e: any) => {
        if(!imageTags.includes(customHashtag) && customHashtag.indexOf("#") === 0){
            imageTags.push(customHashtag);
            setCustomHashtag("#");
        }
    }

    const uploadImage = (img: string) => {
        let newArray: ImageWithTag[] = [];
        if(images !== undefined){
            newArray = [...images];
        }
        const newImage: ImageWithTag = {
            path: img,
            tags: imageTags,
            message: statusMessage
        }
        newArray.push(newImage);
        if(props.setImages)props.setImages(newArray);
    }

    const submit = () => {
        uploadImage(props.image.path);
        if(props.closePopup)props.closePopup();
    }

    return(
        <EditImageContainer>
            <Headline bold >Das ist dein Bild</Headline>
            <div style={{textAlign: "left", marginLeft: "6px"}}>
                <Text >was denkst du gerade?</Text>
                <TextArea placeholder="Remember, be nice!" onChange={(e: any) => setStatusMessage(e.target.value)}/>
                <Text >Dein eigener Hashtag</Text>
                <Input type="text" placeholder="#anything" onChange={(e: any) => setCustomHashtag(e.target.value)}/>
                <Button onClick={addCustomHashTag}>Hinzufügen</Button>
                <HashTagContainer>
                    {imageTags.map((element, key) => {

                        return <HashTags value={element} key={key} color="#eb9d9d"></HashTags>
                    })}
                </HashTagContainer>
                <Text >
                    Oft genutzte Hashtags:
                    <Input  multiple placeholder="auswählen.." list="hashtagList" type="text" onClick={(e: any) => {e.target.value="";}} onChange={addHashtag}/>
                    <datalist id="hashtagList">
                        {TAGS && TAGS.map((element, key) => {
                            return <option value={element} key={key}/>
                        })}
                    </datalist>
                </Text>
                <SubmitContainer>
                    <Text color="white">Akzeptieren und weiter</Text>
                    <Submit src={Check} onClick={submit}/>
                </SubmitContainer>
            </div>
        </EditImageContainer>
    );
}

type HashTagProps = {
    value?: string;
    color?: string;
}
export const HashTags = (props: HashTagProps) => {
    return (
        <HashTagLabel color={props.color}>
            <Text color="white">{props.value}</Text>
        </HashTagLabel>
    );
}
const SubmitContainer = styled.div`
    position: absolute;
    bottom: -50px;
`;

const Button = styled.button`
    width: 35%;
    border: 0;
    background-color: #f0f0f0;
    padding: 5px;
    resize: none;
    outline: none;
    &:focus{
        border: 1px solid grey;
    }
    margin-top: 10px;
    overflow: auto;
`;
const Submit = styled.img`
    cursor: pointer;
    position: absolute;
    bottom: -100px;
    left: 0;
    width: 80px;
    height: 80px;
    &:hover{
        opacity: 0.6;
    }
`;
const HashTagLabel = styled.div<{color?: string}>`
    background-color: ${props => props.color? props.color : "#2b9e48"};
    padding: 2px 5px 2px 5px;
    margin: 5px 5px 5px 0px;
    border-radius: 8px;
    display: block;
    grid-column: auto;
    grid-row: auto;
`;

const Input = styled.input`
    width: 35%;
    border: 0;
    box-shadow: 0 0 15px 4px rgba(0,0,0,0.06);
    padding: 5px;
    resize: none;
    outline: none;
    &:focus{
        border: 1px solid grey;
    }
    margin-top: 10px;
    overflow: auto;
`;

export default EditWindow;
