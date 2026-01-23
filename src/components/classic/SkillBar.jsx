import { motion } from "framer-motion";

const SkillBar = ({ name, level, theme }) => (
  <div style={{ marginBottom: "20px" }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        color: theme.textSec,
        fontSize: "0.95rem",
        marginBottom: "8px",
        fontWeight: "500",
      }}
    >
      <span>{name}</span>
      <span style={{ color: theme.accent }}>{level}%</span>
    </div>
    <div
      style={{
        width: "100%",
        height: "8px",
        background: theme.barBg,
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          height: "100%",
          background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentGradient})`,
          borderRadius: "4px",
        }}
      />
    </div>
  </div>
);

export default SkillBar;
