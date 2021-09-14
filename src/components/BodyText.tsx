import styled from 'styled-components';

export type BodyTextProps = {
    bold?: boolean;
}
export const BodyText = styled.div<BodyTextProps>`
    font-weight: ${props => props.bold ? 'bold' : 'normal'};
`;