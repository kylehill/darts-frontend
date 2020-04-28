import React from "react";

import "./index.scss";

const ConfigDropdown = ({ name, value, setValue, optionsObject }) => {
  return (
    <select
      className="config-dropdown"
      value={value}
      onChange={(e) => {
        setValue(name, e.target.value);
      }}
    >
      {Object.entries(optionsObject).map(([value, text], idx) => {
        return (
          <option key={idx} value={value}>
            {text}
          </option>
        );
      })}
    </select>
  );
};

export default ConfigDropdown;
