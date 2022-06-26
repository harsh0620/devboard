import styled from "styled-components";
const Wrapper = styled.article`
  background: var(--white);
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  position: relative;
  &:hover {
    box-shadow: var(--shadow-2);
    border-radius: var(--borderRadius);
  }
  .info {
    text-decoration: none;
  }
  .verticals {
    position: absolute;
    left: auto;
    right: 1rem;
    width: 30px;
    visibility: hidden;
  }
  &:hover .verticals {
    visibility: visible;
  }
  &:hover .info {
    text-decoration: none;
  }
  .h5 {
    margin-top: 1rem;
    font-family: var(--headingFont);
    font-weight: 400;
    line-height: 1.3;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
  .main-icon {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    background: var(--grey-500);
    border-radius: 50%;
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    align-items: center;
    justify-content: center;
    color: var(--white);
    margin: auto;
  }
`;

export default Wrapper;
