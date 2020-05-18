const newScoreObject = () => ({
  points: 0,
  marks: [0, 0, 0, 0, 0, 0, 0],
});

const newStatsObject = () => ({
  darts: 0,
  hits: 0,
  marks: 0,
  mpr: 0,
  hitRate: 0,
  turns: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
});

export default ({ roomCode, players, variants, title }) => {
  const legs = players.map((_) => 0);
  const stats = players.map((_) => newStatsObject());

  const scores = [newScoreObject(), newScoreObject()];

  return {
    legs,
    stats,
    scores,
    roomCode,
    title: title || `Room Code: ${roomCode}`,
    isActive: true,
    tx: 0,
    game: "cricket",
    players: players,
    variants: variants,
    firstThrow: 0,
    currentThrow: 0,
    priorTurns: [],
    priorLegs: [],
    currentTurn: [],
    winner: null,
    cpuControl: !!players[0].cpu,
  };
};
