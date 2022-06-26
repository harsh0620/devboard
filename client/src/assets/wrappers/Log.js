import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 1rem;
  box-shadow: var(--shadow-2);
  margin: 1rem 0rem 1rem 0rem;
  h5 {
    margin-top: 0.5rem;
  }
  .log {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  Popup {
    .popups {
      display: flex;
      flex-direction: column;
    }
  }

  /* @media (min-width: 992px) {
    
  }
  @media (min-width: 1120px) {

  } */
`;

export default Wrapper;
