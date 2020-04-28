import React from "react";

import "./index.scss";

const HeaderTab = ({ title, active, clickPane }) => {
  return (
    <div onClick={clickPane} className={`tab ${active ? "tab-active" : ""}`}>
      {title}
    </div>
  );
};

export default HeaderTab;
