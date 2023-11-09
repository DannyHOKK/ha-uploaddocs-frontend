import React from "react";

function iconpopup({ props }) {
  return props.trigger ? (
    <div>
      <div>{props.children}</div>
    </div>
  ) : (
    ""
  );
}

export default iconpopup;
