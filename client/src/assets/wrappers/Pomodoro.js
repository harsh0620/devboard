import styled from "styled-components";
const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-2);
  border-radius: var(--borderRadius);
  justify-content: center;
  width: 50%;

  margin: auto;
  align-items: center;
  text-align: center;
  padding: 2rem 0rem;
  @media (max-width: 992px) {
    width: 100%;
  }
  .pomodoro {
    width: 100%;
  }
  .clockCircle {
    color: var(--primary-500);
  }
  .controls {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .start_stop {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background: var(--primary-500);
    box-shadow: var(--shadow-4);
    border: none;
    color: white;
  }
  .reset {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background: var(--black);
    box-shadow: var(--shadow-4);
    border: none;
    color: white;
  }
  .timeHandler {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .session {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .session__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }
  .session__controls--btn {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background: var(--grey-700);
    box-shadow: var(--shadow-4);
    border: none;
    color: white;
  }

  .session__length {
    font-size: 26px;
    line-height: 1;
    font-weight: 400;
    padding: 0 0.4em;
    min-width: 27px;
  }
  .session__label {
    font-weight: 600;
  }
  .break {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .break__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }
  .break__controls--btn {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background: var(--grey-700);
    box-shadow: var(--shadow-4);
    border: none;
    color: white;
  }

  .break__length {
    font-size: 26px;
    line-height: 1;
    font-weight: 400;
    padding: 0 0.4em;
    min-width: 27px;
  }
  .break__label {
    font-weight: 600;
  }
`;

export default Wrapper;
