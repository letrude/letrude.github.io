import React, { useEffect, useState, useCallback, useRef } from "react";
import useStore from "../../store/useStore";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitchButton from "../common/LanguageSwitchButton";
import KeyCap from "../common/KeyCap";
import TextPage from "../books/TextPage";
import ProjectPage from "../books/ProjectPage";
import SkillsPage from "../books/SkillsPage";

const BASE_URL = import.meta.env.BASE_URL;

const contactLinkStyle = {
  display: "block",
  background: "rgba(255,255,255,0.4)",
  padding: "12px",
  borderRadius: "8px",
  textDecoration: "none",
  color: "#4a3b2a",
  fontWeight: "bold",
  border: "1px solid rgba(92, 64, 51, 0.2)",
  transition: "0.2s",
};

function UI() {
  const {
    currentZone,
    isReadingMode,
    enableReadingMode,
    content,
    setViewMode,
    volume,
    setVolume,
    uiText,
  } = useStore();
  const [pageIndex, setPageIndex] = useState(0);

  const [showContact, setShowContact] = useState(false);

  const activeContent = currentZone ? content[currentZone] : null;
  const currentPageData = activeContent ? activeContent.pages[pageIndex] : null;
  const totalPages = activeContent ? activeContent.pages.length : 0;

  const pixelFont = {
    fontFamily: "'Courier New', Courier, monospace",
    fontWeight: "bold",
  };

  const contactData = content["Contact"];

  const changePage = useCallback(
    (direction) => {
      if (!activeContent) return;
      if (direction === "next" && pageIndex < totalPages - 1)
        setPageIndex((p) => p + 1);
      if (direction === "prev" && pageIndex > 0) setPageIndex((p) => p - 1);
    },
    [pageIndex, totalPages, activeContent]
  );

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(`${BASE_URL}sounds/background_music.mp3`);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log(
          "Autoplay bloqué par le navigateur, attente d'interaction :",
          error
        );
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        if (showContact) {
          setShowContact(false);
          return;
        }
        enableReadingMode(false);
        return;
      }

      if (isReadingMode && !showContact) {
        if (
          ["KeyD", "KeyS", "ArrowRight", "ArrowDown", "Space"].includes(e.code)
        )
          changePage("next");
        if (
          ["KeyA", "KeyW", "KeyZ", "KeyQ", "ArrowLeft", "ArrowUp"].includes(
            e.code
          )
        )
          changePage("prev");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isReadingMode, changePage, enableReadingMode, showContact]);

  useEffect(() => {
    if (!isReadingMode) setPageIndex(0);
  }, [isReadingMode]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "30px",
          right: "30px",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: "20px",
          pointerEvents: "auto",
        }}
      >
        <div
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            borderRadius: "12px",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <LanguageSwitchButton
            style={{
              border: "none",
              boxShadow: "none",
              background: "transparent",
              color: "white",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(0, 0, 0, 0.5)",
            padding: "8px 15px",
            borderRadius: "30px",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <span style={{ fontSize: "1.2rem" }}>
            {volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
          </span>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            tabIndex="-1"
            style={{
              cursor: "pointer",
              accentColor: "#eecfa1",
            }}
          />
        </div>

        <motion.button
          onClick={(e) => {
            setShowContact(true);
            e.currentTarget.blur();
          }}
          tabIndex="-1"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "#eecfa1",
            opacity: 1,
            color: "#2c1810",
            border: "2px solid #3e2723",
            borderBottom: "5px solid #3e2723",
            cursor: "pointer",
            padding: "10px 20px",
            borderRadius: "8px",
            fontFamily: "'Courier New', Courier, monospace",
            fontWeight: "900",
            fontSize: "1rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
          }}
        >
          <span style={{ fontSize: "1.2rem" }}>✉️</span>
          {uiText.contact}
        </motion.button>
      </div>

      <div
        style={{
          position: "absolute",
          top: "30px",
          left: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "flex-start",
          pointerEvents: "auto",
        }}
      >
        <h1
          style={{
            ...pixelFont,
            margin: 0,
            color: "white",
            fontSize: "1.8rem",
            textShadow: "2px 2px 0 #000",
            letterSpacing: "1px",
          }}
        >
          ANGE GRIMAUD
        </h1>

        <motion.button
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setViewMode("2d")}
          tabIndex="-1"
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "12px",
            padding: "8px 16px",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.85rem",
            fontWeight: "bold",
            fontFamily: "sans-serif",
          }}
        >
          <span>📄</span> {uiText.classic}
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setViewMode("menu")}
          tabIndex="-1"
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "12px",
            padding: "8px 16px",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.85rem",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            marginTop: "5px",
          }}
        >
          <span>🏠</span> {uiText.backToMenu}
        </motion.button>
      </div>

      <AnimatePresence>
        {showContact && contactData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(5px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 200,
              pointerEvents: "auto",
            }}
            onClick={() => setShowContact(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "90%",
                maxWidth: "400px",
                background: "#f4e4bc",
                border: "4px solid #5c4033",
                borderRadius: "16px",
                padding: "30px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                textAlign: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    ...pixelFont,
                    fontSize: "0.75rem",
                    color: "#5c4033",
                    opacity: 0.6,
                  }}
                >
                  [ECHAP]
                </span>

                <motion.button
                  onClick={() => setShowContact(false)}
                  whileHover={{ scale: 1.2, rotate: 90, color: "#a00" }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{
                    background: "transparent",
                    border: "none",
                    fontSize: "1.5rem",
                    color: "#5c4033",
                    cursor: "pointer",
                    fontWeight: "bold",
                    outline: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}
                >
                  ×
                </motion.button>
              </div>

              <h2
                style={{
                  ...pixelFont,
                  margin: "0 0 20px 0",
                  color: "#3e2723",
                  borderBottom: "2px solid rgba(62, 39, 35, 0.2)",
                  paddingBottom: "10px",
                }}
              >
                {contactData.title}
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  marginBottom: "30px",
                }}
              >
                {contactData.pages
                  .filter((p) => p.type === "contact_card")
                  .map((item, i) => (
                    <motion.a
                      key={i}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={contactLinkStyle}
                      whileHover={{
                        scale: 1.04,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderColor: "#8b4513",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      {item.icon}
                      <span style={{ marginLeft: "10px" }}>
                        {item.title === "Email" ? item.value : item.title}
                      </span>
                    </motion.a>
                  ))}
              </div>

              {contactData.pages
                .filter((p) => p.type === "cv_download")
                .map((item, i) => (
                  <motion.a
                    key={i}
                    href="/pdf/CV_Ange_GRIMAUD.pdf"
                    target="_blank"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#3e2723",
                      color: "#fff",
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: "inline-block",
                      width: "100%",
                      padding: "15px 0",
                      background: "#5c4033",
                      color: "#f4e4bc",
                      textDecoration: "none",
                      borderRadius: "8px",
                      fontWeight: "bold",
                      fontFamily: "'Courier New', Courier, monospace",
                      fontSize: "1.1rem",
                      border: "2px solid #3e2723",
                      boxSizing: "border-box",
                    }}
                  >
                    📜 {item.title}
                  </motion.a>
                ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentZone && !isReadingMode && !showContact && (
          <motion.div
            initial={{ y: 50, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: 50, opacity: 0, x: "-50%" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
              position: "absolute",
              bottom: "10%",
              left: "50%",
              background: "rgba(243, 229, 171, 0.95)",
              backdropFilter: "blur(5px)",
              color: "#3e2723",
              border: "2px solid #3e2723",
              padding: "12px 35px",
              borderRadius: "50px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              pointerEvents: "auto",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
            onClick={() => enableReadingMode(true)}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  fontWeight: "bold",
                  color: "#8b4513",
                  opacity: 0.8,
                }}
              >
                {uiText.discovered}
              </span>
              <span style={{ ...pixelFont, fontSize: "1.4rem" }}>
                {activeContent.title}
              </span>
            </div>

            <div
              style={{
                width: "1px",
                height: "35px",
                background: "rgba(62, 39, 35, 0.2)",
              }}
            ></div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#3e2723",
              }}
            >
              <span>{uiText.enter}</span>
              <KeyCap label="ESPACE" width="60px" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isReadingMode && activeContent && !showContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "auto",
              backdropFilter: "blur(8px)",
              zIndex: 100,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              style={{
                width: "90%",
                maxWidth: "600px",
                height: "85vh",
                maxHeight: "750px",
                background: "#f4e4bc",
                backgroundImage: "linear-gradient(#f4e4bc, #e6d2a0)",
                border: "8px solid #5c4033",
                borderRadius: "16px",
                padding: "40px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                boxShadow:
                  "0 25px 50px rgba(0,0,0,0.7), inset 0 0 100px rgba(139, 69, 19, 0.1)",
                color: "#4a3b2a",
                fontFamily: "Georgia, serif",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  zIndex: 10,
                }}
              >
                <span
                  style={{
                    ...pixelFont,
                    fontSize: "12px",
                    color: "#5c4033",
                    opacity: 0.7,
                  }}
                >
                  [ECHAP]
                </span>

                <motion.button
                  onClick={() => enableReadingMode(false)}
                  whileHover={{
                    scale: 1.2,
                    rotate: 90,
                    backgroundColor: "#d32f2f",
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{
                    background: "#a00",
                    color: "white",
                    border: "none",
                    width: "32px",
                    height: "32px",
                    cursor: "pointer",
                    borderRadius: "50%",
                    fontWeight: "bold",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                    fontSize: "1rem",
                    lineHeight: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    outline: "none",
                  }}
                >
                  ×
                </motion.button>
              </div>

              <div
                style={{
                  textAlign: "center",
                  borderBottom: "2px solid rgba(92, 64, 51, 0.3)",
                  paddingBottom: "20px",
                  marginBottom: "20px",
                }}
              >
                <h1
                  style={{
                    ...pixelFont,
                    margin: 0,
                    fontSize: "2rem",
                    textTransform: "uppercase",
                    color: "#3e2723",
                  }}
                >
                  {activeContent.title}
                </h1>
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    color: "#8b4513",
                    background: "rgba(139, 69, 19, 0.1)",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    marginTop: "10px",
                    display: "inline-block",
                  }}
                >
                  Page {pageIndex + 1} / {totalPages}
                </span>
              </div>

              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  overflowX: "hidden",
                  paddingRight: "10px",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={pageIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {currentPageData.type === "text" && (
                      <TextPage content={currentPageData.content} />
                    )}
                    {currentPageData.type === "project" && (
                      <ProjectPage data={currentPageData} />
                    )}
                    {currentPageData.type === "skills" && (
                      <SkillsPage data={currentPageData} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "30px",
                  marginTop: "20px",
                  paddingTop: "20px",
                  borderTop: "1px solid rgba(92, 64, 51, 0.3)",
                }}
              >
                <motion.button
                  onClick={() => changePage("prev")}
                  disabled={pageIndex === 0}
                  whileHover={
                    pageIndex === 0
                      ? {}
                      : {
                          scale: 1.05,
                          x: -5,
                          backgroundColor: "rgba(92, 64, 51, 0.2)",
                        }
                  }
                  whileTap={pageIndex === 0 ? {} : { scale: 0.95 }}
                  style={{
                    background: "rgba(92, 64, 51, 0.1)",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    cursor: pageIndex === 0 ? "default" : "pointer",
                    opacity: pageIndex === 0 ? 0.3 : 1,
                    color: "#5c4033",
                    fontWeight: "bold",
                    transition: "background-color 0.2s",
                  }}
                >
                  ◄ {uiText.prev}
                </motion.button>

                <div
                  style={{
                    fontSize: "0.75rem",
                    opacity: 0.6,
                    textAlign: "center",
                    lineHeight: "1.4",
                  }}
                >
                  {uiText.navHelp}
                </div>

                <motion.button
                  onClick={() => changePage("next")}
                  disabled={pageIndex === totalPages - 1}
                  whileHover={
                    pageIndex === totalPages - 1
                      ? {}
                      : {
                          scale: 1.05,
                          x: 5,
                          backgroundColor: "rgba(92, 64, 51, 0.2)",
                        }
                  }
                  whileTap={pageIndex === totalPages - 1 ? {} : { scale: 0.95 }}
                  style={{
                    background: "rgba(92, 64, 51, 0.1)",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    cursor:
                      pageIndex === totalPages - 1 ? "default" : "pointer",
                    opacity: pageIndex === totalPages - 1 ? 0.3 : 1,
                    color: "#5c4033",
                    fontWeight: "bold",
                    transition: "background-color 0.2s",
                  }}
                >
                  {uiText.next} ►
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isReadingMode && !showContact && (
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: 30,
            ...pixelFont,
            color: "white",
            textShadow: "2px 2px 0 black",
            fontSize: "14px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "8px",
            }}
          >
            <div style={{ display: "flex", gap: "2px" }}>
              <KeyCap label="Z" />
              <KeyCap label="Q" />
              <KeyCap label="S" />
              <KeyCap label="D" />
            </div>
            <span>{uiText.move}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default UI;
