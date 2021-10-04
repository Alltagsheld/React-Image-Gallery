import styled from "styled-components";
import { Description, Headline, SubHeadline, Text } from "./BodyText";
import { ImageWithTag } from "../pages/LandingPage";
import { HashTags, HashTagContainer } from "./EditWindow";

export type InformationWindowProps = {
    image: ImageWithTag;
}

const InformationWindowContainer = styled.section`
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    transform: translate(0, -20px);
    width: 290px;
    background-color: rgba(255, 255, 255, 0.96);
    padding: 10px;
    z-index: 3;
    margin-left: 20px;
    margin-right: 100px;
    box-shadow: 0 0 3px 3px rgba(255, 255, 255, 0.404);
    box-sizing: border-box;
    @media (max-width: 750px){
        transform: translate(0, 20px);
    }
`;
const InformationWindow = (props: InformationWindowProps) => {

    return(
        <InformationWindowContainer>
            <SubHeadline bold >{props.image.message}</SubHeadline>
            <div style={{textAlign: "left", marginLeft: "6px"}}>
                <HashTagContainer>
                    {props.image.tags.map((element, key) => {
                        return <HashTags value={element} key={key} color="#eb9d9d"></HashTags>
                    })}
                </HashTagContainer>
            </div>
        </InformationWindowContainer>
    );

}
export default InformationWindow;