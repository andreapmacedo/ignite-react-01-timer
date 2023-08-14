import styled from 'styled-components';

export type ButttonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning';

interface ButtonContainerProps {
  variant: ButttonVariant
}

const ButttonVariants = {
  primary: {
    backgroundColor: '#000',
    color: '#fff',
    border: '1px solid #ff0000',
  },
  secondary: {
    backgroundColor: '#fff',
    border: '1px solid #000',
    color: '#000',
  },
  danger: {
    backgroundColor: '#fff',
    border: '1px solid #ff0000',
    color: '#ff0000',
  },
  success: {
    backgroundColor: '#fff',
    border: '1px solid #00ff00',
    color: '#00ff00',
  },
  warning: {
    backgroundColor: '#fff',
    border: '1px solid #ffcc00',
    color: '#ffcc00',
  },
};

const variantToCSS = (variantProps: any): string => {
  return Object.entries(variantProps).map(([key, value]) => `${key}: ${value};`).join(' ');
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  // one way
  background-color: ${({ variant }) => ButttonVariants[variant].backgroundColor};
  // another way
  /* background-color: ${props => ButttonVariants[props.variant].backgroundColor}; */

  // another way (using function variantToCSS for all properties)
  ${props => variantToCSS(ButttonVariants[props.variant])}
`;

// defaul
// export const ButtonContainer = styled.button<ButtonContainerProps>`
//   background-color: #fff;
//   border: 1px solid #000;
//   border-radius: 4px;
//   color: #000;
//   cursor: pointer;
//   font-size: 1rem;
//   font-weight: 600;
//   padding: 0.5rem 1rem;
//   transition: all 0.2s ease-in-out;
// `;
