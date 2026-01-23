const KeyCap = ({ label, width = "auto" }) => (
  <span
    style={{
      display: "inline-block",
      minWidth: width,
      padding: "4px 8px",
      margin: "0 4px",
      borderRadius: "6px",
      background: "#e6dcb8",
      color: "#4a332a",
      border: "2px solid #6d4c41",
      borderBottom: "4px solid #6d4c41",
      fontWeight: "bold",
      fontSize: "0.8rem",
      fontFamily: "sans-serif",
      textAlign: "center",
      transform: "translateY(-2px)",
      textShadow: "none",
      boxShadow: "0 2px 3px rgba(0,0,0,0.1)",
    }}
  >
    {label}
  </span>
);

export default KeyCap;
