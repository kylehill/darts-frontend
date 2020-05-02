import React from "react";

import HeaderTab from "components/HeaderTab";
import CricketLog from "components/CricketLog";
import CricketStats from "components/CricketStats";
import CricketMenu from "components/CricketMenu";

import "./index.scss";

const VisibleContent = (props) => {
  const { currentPane, state } = props;

  switch (currentPane) {
    case 1:
      return <CricketLog state={state} />;

    case 2:
      return <CricketMenu {...props} />;

    case 0:
    default:
      return <CricketStats state={state} />;
  }
};

const CricketTabs = (props) => {
  const [currentPane, setCurrentPane] = React.useState(0);
  const tabTitles = ["Stats", "Log", "Menu"];

  return (
    <div className="tab-container">
      <div className="tab-header">
        {tabTitles.map((title, idx) => {
          return (
            <HeaderTab key={idx} title={title} active={idx === currentPane} clickPane={() => setCurrentPane(idx)} />
          );
        })}
      </div>
      <div className="tab-content">
        <VisibleContent currentPane={currentPane} {...props} />
      </div>
    </div>
  );
};

export default CricketTabs;
