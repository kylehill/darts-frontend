import React from "react";

import StatSheet from "components/StatSheet";

import "./index.scss";

const rate = (numerator, denominator, digits = 2) => {
  if (denominator === 0) {
    return "--";
  }

  return (numerator / denominator).toFixed(digits);
};

const X01Stats = ({ state }) => {
  const tables = [
    {
      header: ["", "Average", "First 9"],
      rows: state.players.map((p, idx) => {
        const stats = state.stats[idx];
        const average = rate(stats.all.points, stats.all.darts / 3);
        const f9 = rate(stats.f9.points, stats.f9.darts / 3);

        return [p.name, average, f9];
      }),
    },
    {
      header: ["", "90+", "130+", "170+"],
      rows: state.players.map((p, idx) => {
        const stats = state.stats[idx];
        const turnCount = Object.entries(stats.turns).reduce(
          (mem, [score, count]) => {
            if (Number(score) >= 90) {
              mem[90] += count;
              if (Number(score) >= 130) {
                mem[130] += count;
                if (Number(score) >= 170) {
                  mem[170] += count;
                }
              }
            }
            return mem;
          },
          { 90: 0, 130: 0, 170: 0 }
        );

        return [p.name, turnCount["90"], turnCount["130"], turnCount["170"]];
      }),
    },
    {
      header: ["", "Avg Out", "High Out"],
      rows: state.players.map((p, idx) => {
        const stats = state.stats[idx];
        return [
          p.name,
          rate(
            stats.checkouts.reduce((mem, checkout) => mem + checkout, 0),
            stats.checkouts.length
          ),
          stats.checkouts.reduce((mem, checkout) => (checkout > mem ? checkout : mem), 0) || "--",
        ];
      }),
    },
  ];

  if (state.variants.trackDoubles === "yes") {
    const doubleStart = state.variants.start === "double";
    const doubleEnd = state.variants.end === "double";

    const cols = ["Doubles"];
    if (doubleStart) {
      cols.push("In %");
    }
    if (doubleEnd) {
      cols.push("Out %");
    }

    tables.push({
      header: cols,
      rows: state.players.map((p, idx) => {
        const row = [p.name];
        const stats = state.stats[idx];

        if (doubleStart) {
          row.push(rate(stats.doubleIn.hits * 100, stats.doubleIn.hits + stats.doubleIn.misses, 1));
        }
        if (doubleEnd) {
          row.push(
            rate(stats.doubleOut.hits * 100, stats.doubleOut.hits + stats.doubleOut.misses, 1)
          );
        }

        return row;
      }),
    });
  }

  return (
    <div className="x01-stats">
      <StatSheet tables={tables} />
    </div>
  );
};

export default X01Stats;
