import React from "react";

const TextPage = ({ content }) => (
  <div
    style={{
      whiteSpace: "pre-line",
      fontSize: "1.1rem",
      lineHeight: "1.6",
      color: "#4a3b2a",
    }}
  >
    {content}
  </div>
);

export default TextPage;
