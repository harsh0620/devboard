import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  /* width: 100%; */
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    column-gap: 1rem;
  }
  /* .bookmarks {
    display: grid;
    grid-template-columns: 2fr;
    row-gap: 1rem;
  }
  @media (min-width: 992px) {
    .bookmarks {
      display: grid;
      grid-template-columns: 2fr;
      gap: 1rem;
    }
  } */
`;

export default Wrapper;
