import styled from 'styled-components';

export type BodyTextProps = {
    bold?: boolean;
    color?: string;
}
export const Description = styled.p<BodyTextProps>`
    font-size: 0.6em;
    font-weight: ${props => props.bold ? 'bold' : 'normal'};
    color: ${props => props.color? props.color : "#443f3f"};
    margin: 0 auto;
`;
export const Text = styled.p<BodyTextProps>`
    font-size: 0.8em;
    font-weight: ${props => props.bold ? 'bold' : 'normal'};
    color: ${props => props.color? props.color : "#443f3f"};
    margin: 0 auto;
`;
export const Headline = styled.h1<BodyTextProps>`
    font-size: 1.8em;
    font-weight: ${props => props.bold ? 'bold' : 'normal'};
    color: ${props => props.color? props.color : "#443f3f"};
    font-family: Dense;
    margin: 0 auto;
`;
export const SubHeadline = styled.h2<BodyTextProps>`
    font-size: 1.3em;
    font-weight: ${props => props.bold ? 'bold' : 'normal'};
    color: ${props => props.color? props.color : "#443f3f"};
    font-family: Dense;
    margin: 10px auto;
`;
