import React, { useEffect, useRef } from "react";
import Wrapper from "../../assets/wrappers/Pomodoro";
import { useAppContext } from "../../context/appContext";
import { FaPlay, FaPause, FaRedo, FaPlus, FaMinus } from "react-icons/fa";
import {
  RESET_TIMERS,
  START_TIMER,
  TOGGLE_ISBUSY_INDICATOR,
  TOGGLE_TIMER_LABEL,
} from "../../context/actions";
const Pomodoro = () => {
  const {
    timerLabel,
    busyIndicator,
    sessionValue,
    breakValue,
    handleBreakDecrement,
    handleBreakIncrement,
    handleSessionDecrement,
    handleSessionIncrement,
    clockValue,
    state,
    dispatch,
  } = useAppContext();
  const audioSoundRef = useRef();
  const bellSoundUrl = "https://www.soundjay.com/misc/bell-ringing-01c.mp3";
  const handleReset = () => {
    dispatch({
      ...state,
      type: RESET_TIMERS,
    });
    audioSoundRef.current.pause();
    audioSoundRef.current.time = 0;
  };

  const handlePlayPause = () => {
    dispatch({
      ...state,
      type: TOGGLE_ISBUSY_INDICATOR,
      busyIndicator: !state.busyIndicator,
    });
  };

  const handleCount = () => {
    const { timerValue, timerLabel, breakValue, sessionValue } = state;
    dispatch({
      ...state,
      type: START_TIMER,
      timerValue: timerValue - 1,
    });
    if (timerValue === 0) audioSoundRef.current.play();
    if (timerValue < 0) {
      if (timerLabel === "Session") {
        dispatch({
          ...state,
          type: TOGGLE_TIMER_LABEL,
          timerLabel: "Break",
        });
        dispatch({
          ...state,
          type: START_TIMER,
          timerValue: breakValue * 60 - 1,
        });
      } else {
        dispatch({
          ...state,
          type: TOGGLE_TIMER_LABEL,
          timerLabel: "Session",
        });
        dispatch({
          ...state,
          type: START_TIMER,
          timerValue: sessionValue * 60 - 1,
        });
      }
    }
  };
  useEffect(() => {
    if (busyIndicator) {
      let timerInterval = setInterval(() => {
        handleCount();

        document.title = `[${timerLabel}] - ${clockValue()}`;
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  });

  return (
    <Wrapper>
      <div className="pomodoro">
        <div className="clockCircle">
          <h3>{timerLabel}</h3>
          <h3> {clockValue()}</h3>
        </div>
        <div className="controls">
          <button
            type="button"
            className="start_stop"
            onClick={handlePlayPause}
          >
            {!busyIndicator ? <FaPlay /> : <FaPause />}
          </button>
          <button type="button" className="reset" onClick={handleReset}>
            <FaRedo />
          </button>
          <audio
            id="beep"
            src={bellSoundUrl}
            ref={audioSoundRef}
            preload="auto"
          />
        </div>
        <div className="timeHandler">
          <div className="break">
            <span id="break-label" className="break__label">
              Break Length
            </span>
            <div className="break__controls">
              <button
                type="button"
                className="break__controls--btn"
                onClick={handleBreakDecrement}
                disabled={busyIndicator || breakValue <= 1}
              >
                <FaMinus />
              </button>
              <p id="break-length" className="break__length">
                {breakValue}
              </p>
              <button
                type="button"
                className="break__controls--btn"
                onClick={handleBreakIncrement}
                disabled={busyIndicator || breakValue > 59}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="session">
            <span id="session-label" className="session__label">
              Session Length
            </span>
            <div className="session__controls">
              <button
                type="button"
                id="session-decrement"
                className="session__controls--btn"
                onClick={handleSessionDecrement}
                disabled={busyIndicator || sessionValue <= 1}
              >
                <FaMinus />
              </button>
              <p id="session-length" className="session__length">
                {sessionValue}
              </p>
              <button
                type="button"
                id="session-increment"
                className="session__controls--btn"
                onClick={handleSessionIncrement}
                disabled={busyIndicator || sessionValue > 59}
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Pomodoro;
