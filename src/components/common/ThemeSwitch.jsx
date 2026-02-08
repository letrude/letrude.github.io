import { m as Motion } from "framer-motion";

const ThemeSwitch = ({ isDark, toggle, isMobile = false }) => (
  <div
    onClick={toggle}
    style={
      isMobile
        ? { cursor: "pointer" }
        : {
            position: "absolute",
            top: "60px",
            right: "20px",
            zIndex: 110,
            cursor: "pointer",
          }
    }
  >
    <Motion.div
      layout
      whileHover={{
        scale: 1.1,
        boxShadow: isDark
          ? "0 0 15px rgba(255, 255, 255, 0.4)"
          : "0 0 15px rgba(251, 191, 36, 0.6)",
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      style={{
        width: "70px",
        height: "36px",
        background: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
        borderRadius: "50px",
        display: "flex",
        alignItems: "center",
        padding: "4px",
        border: isDark
          ? "1px solid rgba(255, 255, 255, 0.2)"
          : "1px solid rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        justifyContent: isDark ? "flex-end" : "flex-start",
      }}
    >
      <Motion.div
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: isDark
            ? "linear-gradient(135deg, #4b5563, #1f2937)"
            : "linear-gradient(135deg, #fbbf24, #d97706)",
          boxShadow: isDark
            ? "0 2px 5px rgba(0,0,0,0.5)"
            : "0 2px 5px rgba(217, 119, 6, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
        }}
      >
        <Motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? "🌙" : "☀️"}
        </Motion.span>
      </Motion.div>
    </Motion.div>
  </div>
);

export default ThemeSwitch;
