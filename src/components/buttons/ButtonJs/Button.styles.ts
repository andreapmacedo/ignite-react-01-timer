import styled, { css } from 'styled-components';

export type ButttonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning';

interface ButtonContainerProps {
  variant: ButttonVariant
}

const butttonVariants = {
  primary: "blue",
  secondary: "orange",
  danger: "red",
  success: "green",
  warning: "yellow"
};

export const ButtonContainer = styled.button<ButtonContainerProps>`

  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
  /* ${props => {
    return css`background-color: ${butttonVariants[props.variant]};`
  }} */
`;
