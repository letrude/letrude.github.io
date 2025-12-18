import React from "react";
import { motion } from "framer-motion";
import useStore from "../../store/useStore";

const ProjectCard = ({ data, theme }) => {
  const uiText = useStore((state) => state.uiText);

  return (
    <motion.div
      initial={{
        backgroundColor: theme.cardBg,
        borderColor: theme.cardBorder,
      }}
      animate={{
        backgroundColor: theme.cardBg,
        borderColor: theme.cardBorder,
      }}
      whileHover={{
        y: -5,
        borderColor: theme.accent,
        backgroundColor: theme.cardHover,
      }}
      style={{
        borderWidth: "1px",
        borderStyle: "solid",
        padding: "25px",
        borderRadius: "16px",
        marginBottom: "15px",
        transition: "box-shadow 0.3s",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        boxShadow: theme.shadow,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <h3 style={{ margin: 0, color: theme.text, fontSize: "1.3rem" }}>
          {data.title}
        </h3>
        <span
          style={{
            fontSize: "0.75rem",
            background: theme.accentBg,
            color: theme.accent,
            padding: "6px 12px",
            borderRadius: "20px",
            border: `1px solid ${theme.accentBorder}`,
            fontWeight: "bold",
          }}
        >
          {data.tech}
        </span>
      </div>

      <p
        style={{
          fontSize: "1rem",
          color: theme.textSec,
          lineHeight: "1.6",
          marginBottom: "20px",
          marginTop: 0,
        }}
      >
        {data.desc}
      </p>

      <div
        style={{
          fontSize: "0.9rem",
          color: theme.textMuted,
          fontStyle: "italic",
          borderLeft: `3px solid ${theme.borderLeft}`,
          paddingLeft: "15px",
          marginBottom: "25px",
        }}
      >
        {data.details}
      </div>

      {data.link && (
        <div style={{ marginTop: "auto" }}>
          <motion.a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{
              borderColor: theme.accent,
              color: theme.accent,
            }}
            animate={{
              borderColor: theme.accent,
              color: theme.accent,
            }}
            whileHover={{
              scale: 1.02,
              backgroundColor: theme.accentBg,
              boxShadow: `0 0 15px ${theme.accentBg}`,
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 20px",
              borderRadius: "8px",
              borderWidth: "1px",
              borderStyle: "solid",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            <span>🔗</span> {uiText.viewCode}
          </motion.a>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectCard;
