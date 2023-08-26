import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: ${(props) => props.theme['gray-900']}; */
  /* background-color: ${(props) => props.theme.primary}; */
  nav {
    display: flex;
    gap: 0.5rem;
    a {
      width: 3rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${(props) => props.theme['gray-100']};
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['green-500']};
      }
      &.active {
        color: ${(props) => props.theme['green-500']};
      }
    }
  }
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme['gray-100']};
  /* img {   
    width: 3rem;
    height: 3rem;
  } */
  `
