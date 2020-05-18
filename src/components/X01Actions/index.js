import React from "react";

import "./index.scss";

const DoubleButtons = ({ text, currentTurn, clickDouble, showZero }) => {
  return (
    <div className="x01-action-content">
      <div className="x01-action-text">{text}</div>
      <div className="x01-action-buttons">
        {showZero && (
          <button
            className={`x01-action-button x01-action-button-0 ${
              currentTurn.doubleDart === 0 ? "x01-action-button-active" : ""
            }`}
            onClick={() => clickDouble(0)}
          >
            0
          </button>
        )}
        <button
          className={`x01-action-button x01-action-button-1 ${
            currentTurn.doubleDart === 1 ? "x01-action-button-active" : ""
          }`}
          onClick={() => clickDouble(1)}
        >
          1
        </button>
        <button
          className={`x01-action-button x01-action-button-2 ${
            currentTurn.doubleDart === 2 ? "x01-action-button-active" : ""
          }`}
          onClick={() => clickDouble(2)}
        >
          2
        </button>
        <button
          className={`x01-action-button x01-action-button-3 ${
            currentTurn.doubleDart === 3 ? "x01-action-button-active" : ""
          }`}
          onClick={() => clickDouble(3)}
        >
          3
        </button>
      </div>
    </div>
  );
};

const X01Actions = ({
  inputRef,
  spectating,
  state,
  changeScore,
  clickDouble,
  clickBack,
  clickNext,
}) => {
  const { variants, currentTurn } = state;
  const activeScore = state.scores[state.currentThrow];
  const trackDoubles = variants.trackDoubles === "yes";
  const doublingIn =
    trackDoubles &&
    variants.start === "double" &&
    activeScore === Number(variants.target) &&
    currentTurn.score > 0;

  const doublingOut =
    trackDoubles &&
    variants.end === "double" &&
    activeScore === Number(currentTurn.score) &&
    currentTurn.score !== "";

  const missedDoubles =
    trackDoubles &&
    variants.end === "double" &&
    activeScore - Number(currentTurn.score) <= 50 &&
    currentTurn.score !== "";

  const disableNext =
    (doublingIn || doublingOut || missedDoubles) && state.currentTurn.doubleDart === false;

  return (
    <div className="x01-actions">
      {state.winner === null && (
        <div className={`x01-current-thrower x01-current-thrower-${state.currentThrow}`}>
          <strong>Current Turn:</strong> {state.players[state.currentThrow].name}
        </div>
      )}
      <div className="x01-action-score-container">
        <input
          type="text"
          className="x01-action-score"
          value={currentTurn.score}
          ref={inputRef}
          onChange={(e) => {
            changeScore(e.target.value);
          }}
        />
      </div>
      {trackDoubles && (
        <div className="x01-action-doubles">
          {currentTurn.score > 180 && "...wait, what"}
          {doublingIn && (
            <DoubleButtons
              clickDouble={clickDouble}
              currentTurn={currentTurn}
              text={`Which dart did ${state.players[state.currentThrow].name} double in with?`}
            />
          )}
          {missedDoubles && (
            <DoubleButtons
              clickDouble={clickDouble}
              currentTurn={currentTurn}
              showZero={true}
              text={`How many darts did ${state.players[state.currentThrow].name} miss at double?`}
            />
          )}
        </div>
      )}
      {!spectating && (
        <div className="x01-action-current">
          <button className="x01-current-button x01-current-back" onClick={clickBack}>
            Back
          </button>
          <button
            disabled={disableNext || (state.winner === null && state.currentTurn.score === "")}
            className="x01-current-button x01-current-next"
            onClick={clickNext}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default X01Actions;
