import styled from 'styled-components';
import PlusIcon from './../icons/plus-icon-white.png';
import {useEffect, useRef, useState } from 'react';
import { ImageWithTag } from '../pages/LandingPage';

export type BoxedImageProps = {
    imageWithTag: ImageWithTag;
    index: number;
    onClick: (index: number) => void
}
const Background = styled.div<{long: boolean, wide: boolean}>`
    z-index: 1;
    grid-column: ${props => props.wide ? "span 2/ auto" : "auto"};
    grid-row: ${props => props.long ? "span 2/ auto" : "auto"};
    overflow: hidden;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover{
        opacity: 0.7;
    }
    box-shadow: 0 0 3px 3px rgba(255, 255, 255, 0.404);
`;

const BoxedImage = (props: BoxedImageProps) => {
    const SIZES = ["long", "wide", "regular", "regular"];
    const[long, setLong] = useState<boolean>(false);
    const[wide, setWide] = useState<boolean>(false);

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            console.log("widht: " + img.width + " height: " + img.height)
            if(img.width > img.height){
                
                SIZES.splice(SIZES.indexOf("long"), 1);
                console.log("removed long, SIZES is now " + SIZES);
            }
            else{
                SIZES.splice(SIZES.indexOf("wide"), 1);
                console.log("removed wide, SIZES is now " + SIZES);
            }
            choseRandomSize();
        }
        img.src = props.imageWithTag.path;
    }, [])

    const choseRandomSize = () => {
        console.log("in choseRandomSize, size is: " +SIZES);
        const random = Math.floor(Math.random() * SIZES.length);
        if(SIZES[random] === "long"){
            setWide(false);
            setLong(true);
        }
        else if(SIZES[random] === "wide"){
            setLong(false);
            setWide(true);
        }
        else{
            setLong(false);
            setWide(false);
        }
    }

    return(
        <Background long={long} wide={wide} onClick={() => props.onClick(props.index)}>
            <Picture long={long} wide={wide} src={props.imageWithTag.path}/>
        </Background>
    );
}
const Picture = styled.img<{long: boolean, wide: boolean}>`
    object-fit: cover;
    min-width: ${props => props.wide ? "calc(480px + 1rem)" : "240px"};
    min-height: ${props => props.long ? "calc(480px + 1rem)" : "240px"};
`;

export default BoxedImage;
