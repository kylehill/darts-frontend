import React from "react";

import HeaderTab from "components/HeaderTab";
import X01Stats from "components/X01Stats";
import X01Log from "components/X01Log";
import X01Menu from "components/X01Menu";

const VisibleContent = (props) => {
  const { currentPane, state } = props;

  switch (currentPane) {
    case 1:
      return <X01Log state={state} />;

    case 2:
      return <X01Menu {...props} />;

    case 0:
    default:
      return <X01Stats state={state} />;
  }
};

const X01Tabs = (props) => {
  const [currentPane, setCurrentPane] = React.useState(0);
  const tabTitles = ["Stats", "Log", "Menu"];

  return (
    <div className="tab-container">
      <div className="tab-header">
        {tabTitles.map((title, idx) => {
          return (
            <HeaderTab
              key={idx}
              title={title}
              active={idx === currentPane}
              clickPane={() => setCurrentPane(idx)}
            />
          );
        })}
      </div>
      <div className="tab-content">
        <VisibleContent currentPane={currentPane} {...props} />
      </div>
    </div>
  );
};

export default X01Tabs;
