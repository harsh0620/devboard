import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .logs {
    margin: 2rem 0rem 2rem 0rem;
  }
  @media (min-width: 992px) {
    .logs {
      margin: 2rem 0rem 2rem 0rem;
    }
  }
`;
export default Wrapper;
