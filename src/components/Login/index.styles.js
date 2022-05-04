import styled from "styled-components";

export const StyledCard = styled.div`
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12),
    0px 2px 4px rgba(0, 0, 0, 0.2);
  height: 45vh;
  width: 30vw;
  background-color: white;
  margin: auto;
  transform: translateY(27.5vh);
  .form-group {
    margin-left: 5vw;
    margin-right: 5vw;
    padding-top: 5vh;
  }
  .form-group-password {
    margin-left: 0.2vw;
    margin-right: 0.2vw;
  }
`;
export const StyledBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #5e43c4;
  z-index: -1;
`;
