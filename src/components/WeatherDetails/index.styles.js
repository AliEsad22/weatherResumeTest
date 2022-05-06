import styled from "styled-components"

export const StyledBackground = styled.div`
  width: 100vw;
  height: 94vh;
  background-color: #5e43c4;
  align-items: center;
  justify-content: center;
  display: flex;
`
export const StyledCard = styled.div`
  width: 60vw;
  height: 70vh;
  background-color: white;
  border-radius: 5px;
  & .switch {
    transform: translateY(-47.55px);
  }
  & .switch2 {
    position: relative;
    top: -71px;
    transform: translateX(100px);
  }
`
