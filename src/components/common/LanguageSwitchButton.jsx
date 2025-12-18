import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../store/useStore";

const LanguageSwitchButton = ({ style = {} }) => {
  const { language, toggleLanguage, isDarkMode } = useStore();

  const borderColor = isDarkMode
    ? "rgba(255, 255, 255, 0.3)"
    : "rgba(0, 0, 0, 0.2)";
  const bgHover = isDarkMode
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.05)";
  const textColor = isDarkMode ? "#fff" : "#333";

  const handleClick = (e) => {
    toggleLanguage();
    e.currentTarget.blur();
  };

  return (
    <motion.button
      onClick={handleClick}
      tabIndex="-1"
      whileHover={{
        scale: 1.1,
        backgroundColor: bgHover,
        borderColor: textColor,
      }}
      whileTap={{ scale: 0.9 }}
      style={{
        width: "45px",
        height: "45px",
        borderRadius: "12px",
        background: "transparent",
        border: `2px solid ${borderColor}`,
        cursor: "pointer",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        fontSize: "1.4rem",
        color: textColor,
        padding: 0,
        outline: "none",

        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",

        ...style,
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={language}
          initial={{ rotateY: -90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          }}
        >
          <span style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.2))" }}>
            {language === "fr" ? "🇫🇷" : "🇬🇧"}
          </span>

          <span
            style={{
              fontSize: "0.5rem",
              fontWeight: "bold",
              marginTop: "2px",
              opacity: 0.8,
            }}
          >
            {language === "fr" ? "FR" : "EN"}
          </span>
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

export default LanguageSwitchButton;
