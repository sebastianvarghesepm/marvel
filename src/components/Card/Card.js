import React from "react";

import { VisibilityContext } from "react-horizontal-scrolling-menu";

export function Card({ title, itemId, type }) {
  const visibility = React.useContext(VisibilityContext);

  const visible = visibility.isItemVisible(itemId);

  return (
    <div
      role="button"
      style={{
        border: "1px solid",
        display: "inline-block",
        margin: "0 10px",
        width: "160px",
        height: "250px",
      }}
      tabIndex={0}
      className="card"
    >
      <div>
        <div>{title}</div>
        <div>{type}</div>
        {/* <div style={{ backgroundColor: visible ? "transparent" : "gray" }}>
          visible: {JSON.stringify(visible)}
        </div> */}
      </div>
      <div
        style={{
          height: "200px"
        }}
      />
    </div>
  );
}
