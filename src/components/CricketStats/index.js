import React from "react";

import StatSheet from "components/StatSheet";

const sumArray = (array) => {
  return array.reduce((mem, val) => mem + val, 0);
};

const cumulativeArray = (array) => {
  return array.map((_, idx, arr) => {
    return sumArray(arr.slice(idx));
  });
};

const CricketStats = ({ state }) => {
  const tables = [
    {
      header: ["", "MPR", "Hit %"],
      rows: state.players.map((p, idx) => {
        return [p.name, state.stats[idx].mpr.toFixed(2), (state.stats[idx].hitRate * 100).toFixed(2) + "%"];
      }),
    },
    {
      header: ["", "3M+", "5M+", "7M+"],
      rows: state.players.map((p, idx) => {
        const progressiveMarks = cumulativeArray(state.stats[idx].turns);
        return [p.name, progressiveMarks[3], progressiveMarks[5], progressiveMarks[7]];
      }),
    },
  ];

  return <StatSheet tables={tables} />;
};

export default CricketStats;
