import React, { useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../store/useStore";

function LoadingScreen() {
  const { progress, active } = useProgress();
  const { isSceneReady, uiText } = useStore();

  const [finished, setFinished] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (progress > displayProgress || progress === 100) {
      setDisplayProgress(progress);
    }
  }, [progress, displayProgress]);

  useEffect(() => {
    if (!active && displayProgress === 100 && isSceneReady) {
      const timer = setTimeout(() => {
        setFinished(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [active, displayProgress, isSceneReady]);

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "#2c1810",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            fontFamily: "'Courier New', Courier, monospace",
            color: "#eecfa1",
            pointerEvents: "auto",
          }}
        >
          <motion.h1
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              marginBottom: "40px",
              fontSize: "2rem",
              textTransform: "uppercase",
              letterSpacing: "5px",
              textShadow: "2px 2px 0 #000",
              textAlign: "center",
              padding: "0 20px",
            }}
          >
            {displayProgress === 100 ? uiText.init : uiText.loading}
          </motion.h1>

          <div
            style={{
              width: "300px",
              height: "24px",
              border: "4px solid #5c4033",
              padding: "4px",
              borderRadius: "12px",
              background: "rgba(0,0,0,0.5)",
              boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${displayProgress}%` }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
              style={{
                height: "100%",
                maxWidth: "100%",
                background: "linear-gradient(90deg, #8b4513, #eecfa1)",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(238, 207, 161, 0.5)",
              }}
            />
          </div>

          <div
            style={{
              marginTop: "15px",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            {Math.floor(displayProgress)}%
          </div>

          <p
            style={{
              marginTop: "30px",
              fontSize: "0.8rem",
              opacity: 0.7,
              fontStyle: "italic",
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            {displayProgress < 100
              ? uiText.download
              : !isSceneReady
              ? uiText.compiling
              : uiText.launching}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
