import { pick } from "lib";

const getSectorOptions = (state) => {
  const currentScores = state.scores[state.currentThrow];
  const opponentScores = state.scores[(state.currentThrow + 1) % 2];

  const highestScoreSector = currentScores.marks.findIndex((marks, idx) => {
    return marks >= 3 && opponentScores.marks[idx] < 3;
  });

  const highestOpenSector = currentScores.marks.findIndex((marks, idx) => {
    return marks < 3 && opponentScores.marks[idx] < 3;
  });

  const highestProgressSector = currentScores.marks.findIndex((marks) => {
    return marks < 3;
  });

  const activeSectors = currentScores.marks.reduce((mem, marks, idx) => {
    if (marks < 3 || (marks >= 3 && opponentScores.marks[idx] < 3)) {
      mem.push(idx);
    }

    return mem;
  }, []);

  const randomSector = pick(activeSectors);

  return {
    score: highestScoreSector > -1 ? highestScoreSector : highestOpenSector,
    open: highestOpenSector > -1 ? highestOpenSector : highestProgressSector,
    progress: highestProgressSector > -1 ? highestProgressSector : randomSector,
    random: randomSector,
  };
};

const getTarget = (cpuLevel, options, margin) => {
  switch (cpuLevel) {
    case "hard":
      if (margin > 0) {
        if (Math.random() < 0.8) {
          return options.progress;
        }
        return options.score;
      }
      if (Math.random() < 0.8) {
        return options.score;
      }
      return options.open;

    case "medium":
      if (margin < 0) {
        if (Math.random() < 0.667) {
          return options.score;
        }
        return options.open;
      }
      if (Math.random() < 0.667) {
        return options.progress;
      }
      return options.score;

    case "easy":
    default:
      if (Math.random() < 0.2) {
        return options.random;
      }
      if (Math.random() < 0.3) {
        return options.score;
      }
      return options.open;
  }
};

const getDisplayValue = (sector, multiple) => {
  if (sector === 6) {
    return multiple === 2 ? "DB" : "B";
  }
  if (multiple === 3) {
    return `T${20 - sector}`;
  }
  if (multiple === 2) {
    return `D${20 - sector}`;
  }
  return `${20 - sector}`;
};

const getResult = (cpuLevel, target) => {
  const accuracy = Math.random();
  const bonus = Math.random();

  switch (cpuLevel) {
    case "hard":
      if (target === 6 && accuracy < 0.45) {
        const multiple = bonus < 0.35 ? 2 : 1;
        return { sector: target, multiple, display: getDisplayValue(target, multiple) };
      }

      if (target < 6 && accuracy < 0.55) {
        const multiple = bonus < 0.2 ? (bonus < 0.15 ? 3 : 2) : 1;
        return { sector: target, multiple, display: getDisplayValue(target, multiple) };
      }

      return { miss: true };

    case "medium":
      if (target === 6 && accuracy < 0.35) {
        const multiple = bonus < 0.25 ? 2 : 1;
        return { sector: target, multiple, display: getDisplayValue(target, multiple) };
      }

      if (target < 6 && accuracy < 0.45) {
        const multiple = bonus < 0.15 ? (bonus < 0.1 ? 3 : 2) : 1;
        return { sector: target, multiple, display: getDisplayValue(target, multiple) };
      }

      return { miss: true };

    case "easy":
    default:
      if (target === 6 && accuracy < 0.25) {
        const multiple = bonus < 0.15 ? 2 : 1;
        return { sector: target, multiple, display: getDisplayValue(target, multiple) };
      }

      if (target < 6 && accuracy < 0.38) {
        const multiple = bonus < 0.09 ? (bonus < 0.04 ? 3 : 2) : 1;
        return { sector: target, multiple, display: getDisplayValue(target, multiple) };
      }

      return { miss: true };
  }
};

export default (state) => {
  const cpuLevel = state.players[state.currentThrow].cpu;
  const options = getSectorOptions(state);

  let target = getTarget(
    cpuLevel,
    options,
    state.scores[state.currentThrow].points - state.scores[(state.currentThrow + 1) % 2].points
  );
  if (target === -1 || Math.random() < 0.035) {
    target = options.random;
  }

  return getResult(cpuLevel, target);
};
