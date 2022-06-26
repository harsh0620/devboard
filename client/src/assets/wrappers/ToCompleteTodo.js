import styled from "styled-components";

const WrapperToCompletedTodo = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 2rem 2rem 1rem 2rem;
  box-shadow: var(--shadow-2);
  border-radius: var(--borderRadius);
  border-top: 5px solid #d66a6a;
  margin-top: 1rem;
  h3 {
    margin-top: 0;
  }
  header {
    border-bottom: 1px solid var(--black);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    h5 {
      letter-spacing: 0;
    }
  }
  .first {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .box {
    border-bottom: 1px solid var(--black);
    display: flex;
    flex-direction: row;
    padding-bottom: 15px;
  }
`;

export default WrapperToCompletedTodo;
