import styled from "styled-components";

const Wrapper = styled.main`
  background: var(--white);
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    height: auto;
    display: grid;
    align-items: center;
    margin-top: -3rem;
    border-bottom: 2px solid black;
    padding-top: 4rem;
    padding-bottom: 3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: block;
    margin-top: 30px;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
      border-bottom: 2px solid black;
    }
    .main-img {
      display: block;
    }
    .main-img {
      display: block;
      margin-top: 0px;
    }
  }
`;
export default Wrapper;
