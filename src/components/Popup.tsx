import styled from 'styled-components';
import { BodyText } from './BodyText';

const PopupWindow = styled.div`
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

export type PopupProps={
    onClick?: () => void; 
}

const Popup = (props: PopupProps) => {
    return(
        <PopupWindow>
            <BodyText>Hello. This is a demonstration of how i would program an image upload with carousel.</BodyText>
            <Button onClick={props.onClick}>Danke und weiter</Button>
        </PopupWindow>
    );
}
export default Popup;