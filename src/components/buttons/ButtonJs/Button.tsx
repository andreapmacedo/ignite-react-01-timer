
import { ButtonContainer, ButttonVariant } from "./Button.styles";

interface ButtonProps {
  variant?: ButttonVariant;
}


export function Button({variant = 'secondary'}: ButtonProps) {
  return (
    <ButtonContainer
      // variant={"secondary"}
      variant={variant}
    >
      Enviar
    </ButtonContainer>
  )
}