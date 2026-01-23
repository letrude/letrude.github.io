import { useState, Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, Grid } from "@react-three/drei";
import useStore from "../../store/useStore";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitchButton from "../../components/common/LanguageSwitchButton";
import ThemeSwitch from "../../components/common/ThemeSwitch";
import ProjectCard from "../../components/classic/ProjectCard";
import SkillBar from "../../components/classic/SkillBar";
import ContactCard from "../../components/classic/ContactCard";
import useIsMobile from "../../hooks/useIsMobile";

const StaticGrid = () => (
  <group>
    <ambientLight intensity={1} />
    <directionalLight position={[10, 10, 5]} intensity={1} />
    <Grid
      position={[0, -5, 0]}
      args={[100, 100]}
      cellSize={2}
      cellThickness={1}
      cellColor="#cbd5e1"
      sectionSize={6}
      sectionThickness={1.5}
      sectionColor="#94a3b8"
      fadeDistance={40}
      fadeStrength={1.5}
      infiniteGrid
    />
  </group>
);

function ClassicPortfolio() {
  const { content, setViewMode, isDarkMode, toggleTheme, uiText } = useStore();
  const [activeTab, setActiveTab] = useState("Propos");
  const scrollContainerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const checkTouch = () => {
      const touch =
        window.matchMedia("(pointer: coarse)").matches ||
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      setIsTouch(touch);
    };
    checkTouch();
  }, []);

  const theme = {
    bg: isDarkMode ? "#050505" : "#f0f4f8",
    text: isDarkMode ? "#ffffff" : "#1e293b",
    textSec: isDarkMode ? "#dbdbdbff" : "#353e4aff",
    textMuted: isDarkMode ? "#bdbdbdff" : "#646c76ff",
    accent: isDarkMode ? "#00f3ff" : "#2563eb",
    accentGradient: isDarkMode ? "#0066ff" : "#4f46e5",
    accentBg: isDarkMode ? "rgba(0, 243, 255, 0.1)" : "rgba(37, 99, 235, 0.1)",
    accentBorder: isDarkMode
      ? "rgba(0, 243, 255, 0.2)"
      : "rgba(37, 99, 235, 0.2)",
    cardBg: isDarkMode
      ? "rgba(255, 255, 255, 0.08)"
      : "rgba(255, 255, 255, 0.7)",
    cardHover: isDarkMode ? "rgba(255,255,255,0.12)" : "#ffffff",
    cardBorder: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
    navBg: isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)",
    shadow: isDarkMode ? "none" : "0 4px 20px rgba(0,0,0,0.05)",
    borderLeft: isDarkMode ? "#333" : "#cbd5e1",
    barBg: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.1)",
  };

  const handleGlobalWheel = (e) => {
    if (scrollContainerRef.current) {
      if (scrollContainerRef.current.contains(e.target)) {
        return;
      }
      scrollContainerRef.current.scrollTop += e.deltaY;
    }
  };

  const tabs = [
    { id: "Propos", label: content["Propos"].title },
    { id: "Projets", label: content["Projets"].title },
    { id: "Competences", label: content["Competences"].title },
    { id: "Parcours", label: content["Parcours"].title },
    { id: "Loisirs", label: content["Loisirs"].title },
    { id: "Contact", label: content["Contact"].title },
  ];

  const propos = content["Propos"];
  const projets = content["Projets"];
  const competences = content["Competences"];
  const parcours = content["Parcours"];
  const loisirs = content["Loisirs"];
  const contact = content["Contact"];

  return (
    <div
      onWheel={handleGlobalWheel}
      style={{
        width: "100vw",
        height: "100dvh",
        background: theme.bg,
        color: theme.text,
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: ${
                      isDarkMode
                        ? "rgba(255, 255, 255, 0.2)"
                        : "rgba(0, 0, 0, 0.2)"
                    };
                    border-radius: 20px;
                    border: 2px solid transparent;
                    background-clip: content-box;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: ${
                      isDarkMode
                        ? "rgba(255, 255, 255, 0.4)"
                        : "rgba(0, 0, 0, 0.4)"
                    };
                }
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: ${
                      isDarkMode
                        ? "rgba(255, 255, 255, 0.2) transparent"
                        : "rgba(0, 0, 0, 0.2) transparent"
                    };
                }
            `}</style>
      {!isMobile && (
        <>
          <ThemeSwitch
            isDark={isDarkMode}
            toggle={toggleTheme}
            isMobile={false}
          />
          <div
            style={{
              position: "absolute",
              top: "35px",
              left: "30px",
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <LanguageSwitchButton style={{ position: "static" }} />

            <motion.button
              onClick={() => setViewMode("menu")}
              whileHover={{
                scale: 1.1,
                backgroundColor: isDarkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
              }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "12px",
                background: "transparent",
                border: isDarkMode
                  ? "2px solid rgba(255, 255, 255, 0.3)"
                  : "2px solid rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                color: isDarkMode ? "#fff" : "#333",
                padding: 0,
                outline: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              title="Retour au Menu Principal"
            >
              🏠
            </motion.button>
          </div>
        </>
      )}

      {isMobile && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: 200,
          }}
        >
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            style={{
              background: theme.navBg,
              border: `1px solid ${theme.cardBorder}`,
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              color: theme.text,
              backdropFilter: "blur(10px)",
              cursor: "pointer",
            }}
          >
            {isMenuOpen ? "✕" : "☰"}
          </motion.button>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Canvas camera={{ position: [0, 0, 10] }}>
          <color attach="background" args={[theme.bg]} key={theme.bg} />
          <Suspense fallback={null}>
            {isDarkMode ? (
              <Stars radius={100} depth={50} count={2000} factor={4} fade />
            ) : (
              <StaticGrid />
            )}
          </Suspense>
        </Canvas>
      </div>

      {!isMobile && (
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            width: "90%",
            maxWidth: "950px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "40px",
            padding: "20px",
            background: theme.navBg,
            backdropFilter: "blur(10px)",
            gap: "10px",
            borderRadius: "20px",
            border: `1px solid ${theme.cardBorder}`,
            boxShadow: theme.shadow,
            zIndex: 100,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              letterSpacing: "2px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: theme.text,
              width: "150px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                background: theme.accent,
                borderRadius: "50%",
                boxShadow: `0 0 10px ${theme.accent}`,
              }}
            ></div>
            ANGE GRIMAUD
          </div>

          <nav style={{ display: "flex", gap: "5px" }}>
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                animate={{
                  backgroundColor:
                    activeTab === tab.id ? theme.accentBg : "transparent",
                  color: activeTab === tab.id ? theme.accent : theme.textSec,
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: theme.accentBg,
                  color: theme.accent,
                  boxShadow: `0 0 15px ${theme.accent}40`,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                style={{
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: activeTab === tab.id ? "bold" : "normal",
                  position: "relative",
                  fontFamily: "inherit",
                }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="underline"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "2px",
                      background: theme.accent,
                      boxShadow: `0 0 10px ${theme.accent}`,
                    }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          <motion.button
            onClick={() => {
              if (!isTouch) setViewMode("3d");
            }}
            whileHover={
              !isTouch
                ? {
                    scale: 1.05,
                    backgroundColor: theme.accentBg,
                    boxShadow: `0 0 20px ${theme.accent}66`,
                  }
                : {}
            }
            whileTap={!isTouch ? { scale: 0.95 } : {}}
            style={{
              borderWidth: "1px",
              borderStyle: "solid",
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "inherit",
              transition: "all 0.3s ease",

              cursor: isTouch ? "not-allowed" : "pointer",
              boxShadow: isTouch ? "none" : `0 0 10px ${theme.accent}1A`,

              backgroundColor: isTouch
                ? isDarkMode
                  ? "#450a0a"
                  : "#fca5a5"
                : "transparent",

              borderColor: isTouch ? "#ef4444" : theme.accent,

              color: isTouch
                ? isDarkMode
                  ? "#fecaca"
                  : "#7f1d1d"
                : theme.accent,
            }}
          >
            <span>{isTouch ? "⚠️" : "🎮"}</span>

            {uiText.experience3d}
          </motion.button>
        </motion.header>
      )}

      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: isDarkMode
                ? "rgba(5, 5, 5, 0.95)"
                : "rgba(240, 244, 248, 0.95)",
              backdropFilter: "blur(20px)",
              zIndex: 150,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <h2 style={{ marginBottom: "20px", color: theme.text }}>Menu</h2>
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMenuOpen(false);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                  color: activeTab === tab.id ? theme.accent : theme.textSec,
                  fontWeight: activeTab === tab.id ? "bold" : "normal",
                  cursor: "pointer",
                }}
              >
                {tab.label}
              </motion.button>
            ))}

            <motion.button
              onClick={() => setViewMode("menu")}
              whileTap={{ scale: 0.9 }}
              style={{
                marginTop: "20px",
                background: isDarkMode ? "#4377aaff" : theme.accent,
                color: "#fff",
                border: "none",
                padding: "12px 30px",
                borderRadius: "30px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: isDarkMode
                  ? `0 0 20px ${theme.accent}40`
                  : `0 10px 20px ${theme.accent}40`,
                cursor: "pointer",
              }}
            >
              <span>🏠</span> {uiText.backToMenu}
            </motion.button>

            <div
              style={{
                width: "100px",
                height: "1px",
                background: theme.cardBorder,
                margin: "20px 0",
              }}
            ></div>

            <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
              <ThemeSwitch
                isDark={isDarkMode}
                toggle={toggleTheme}
                isMobile={true}
              />
              <LanguageSwitchButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={scrollContainerRef}
        className="custom-scrollbar"
        style={{
          width: "100%",
          flex: 1,
          overflowY: "auto",
          padding: isMobile ? "80px 20px 20px" : "40px 20px",
          position: "relative",
          zIndex: 10,
          boxSizing: "border-box",
        }}
      >
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollTop = 0;
            }
          }}
        >
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ maxWidth: "900px", margin: "0 auto", width: "100%" }}
          >
            {activeTab === "Propos" && (
              <div>
                <h2
                  style={{
                    fontSize: isMobile ? "1.8rem" : "2rem",
                    marginBottom: "30px",
                    borderLeft: `4px solid ${theme.accent}`,
                    paddingLeft: "15px",
                    color: theme.text,
                  }}
                >
                  {propos.title}
                </h2>
                {propos.pages.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: "25px",
                      background: theme.cardBg,
                      padding: "20px",
                      borderRadius: "10px",
                      border: `1px solid ${theme.cardBorder}`,
                      boxShadow: theme.shadow,
                    }}
                  >
                    <p
                      style={{
                        whiteSpace: "pre-line",
                        lineHeight: "1.7",
                        color: theme.textSec,
                        margin: 0,
                      }}
                    >
                      {p.content}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Projets" && (
              <div>
                <h2
                  style={{
                    fontSize: isMobile ? "1.8rem" : "2rem",
                    marginBottom: "30px",
                    borderLeft: `4px solid ${theme.accent}`,
                    paddingLeft: "15px",
                    color: theme.text,
                  }}
                >
                  {projets.title}
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "1fr"
                      : "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {projets.pages.map((p, i) => (
                    <ProjectCard key={i} data={p} theme={theme} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Competences" && (
              <div>
                <h2
                  style={{
                    fontSize: isMobile ? "1.8rem" : "2rem",
                    marginBottom: "30px",
                    borderLeft: `4px solid ${theme.accent}`,
                    paddingLeft: "15px",
                    color: theme.text,
                  }}
                >
                  {competences.title}
                </h2>

                <div
                  style={{
                    marginBottom: "40px",
                    background: theme.cardBg,
                    padding: "20px",
                    borderRadius: "10px",
                    border: `1px solid ${theme.cardBorder}`,
                    boxShadow: theme.shadow,
                  }}
                >
                  <p
                    style={{
                      whiteSpace: "pre-line",
                      lineHeight: "1.7",
                      color: theme.textSec,
                      margin: 0,
                    }}
                  >
                    {competences.pages[0].content}
                  </p>
                </div>

                <div
                  style={{
                    marginBottom: "40px",
                    background: theme.cardBg,
                    padding: "20px",
                    borderRadius: "10px",
                    border: `1px solid ${theme.cardBorder}`,
                    boxShadow: theme.shadow,
                  }}
                >
                  <p
                    style={{
                      whiteSpace: "pre-line",
                      lineHeight: "1.7",
                      color: theme.textSec,
                      margin: 0,
                    }}
                  >
                    {competences.pages[1].content}
                  </p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "1fr"
                      : "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "40px",
                  }}
                >
                  <div>
                    <h3 style={{ color: theme.accent, marginBottom: "20px" }}>
                      {competences.pages[2].category}
                    </h3>
                    {competences.pages[2].items.map((s, i) => (
                      <SkillBar
                        key={i}
                        name={s.name}
                        level={s.level}
                        theme={theme}
                      />
                    ))}
                  </div>
                  <div>
                    <h3 style={{ color: theme.accent, marginBottom: "20px" }}>
                      {competences.pages[3].category}
                    </h3>
                    {competences.pages[3].items.map((s, i) => (
                      <SkillBar
                        key={i}
                        name={s.name}
                        level={s.level}
                        theme={theme}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Parcours" && (
              <div>
                <h2
                  style={{
                    fontSize: isMobile ? "1.8rem" : "2rem",
                    marginBottom: "30px",
                    borderLeft: `4px solid ${theme.accent}`,
                    paddingLeft: "15px",
                    color: theme.text,
                  }}
                >
                  {parcours.title}
                </h2>
                <div style={{ position: "relative", paddingLeft: "20px" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "2px",
                      background: `linear-gradient(to bottom, ${theme.accent}, transparent)`,
                    }}
                  ></div>
                  {parcours.pages.slice().map((p, i) => {
                    if (!p.content.includes("20")) return null;
                    return (
                      <div
                        key={i}
                        style={{
                          marginBottom: "40px",
                          paddingLeft: "20px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            left: "-5px",
                            top: "0",
                            width: "12px",
                            height: "12px",
                            background: theme.accent,
                            borderRadius: "50%",
                            boxShadow: `0 0 10px ${theme.accent}`,
                          }}
                        ></div>
                        <div
                          style={{
                            whiteSpace: "pre-line",
                            lineHeight: "1.6",
                            color: theme.textSec,
                          }}
                        >
                          {p.content}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: "30px",
                    marginTop: "50px",
                  }}
                >
                  <div
                    style={{
                      background: theme.cardBg,
                      padding: "25px",
                      borderRadius: "12px",
                      border: `1px solid ${theme.cardBorder}`,
                      boxShadow: theme.shadow,
                    }}
                  >
                    <h4 style={{ margin: "0 0 15px 0", color: theme.text }}>
                      {parcours.pages[0].content.split("\n\n")[0]}
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        color: theme.textSec,
                        lineHeight: "1.6",
                      }}
                    >
                      {parcours.pages[0].content
                        .split("\n\n")
                        .slice(1)
                        .join("\n\n")}
                    </p>
                  </div>
                  <div
                    style={{
                      background: theme.cardBg,
                      padding: "25px",
                      borderRadius: "12px",
                      border: `1px solid ${theme.cardBorder}`,
                      boxShadow: theme.shadow,
                    }}
                  >
                    <h4 style={{ margin: "0 0 15px 0", color: theme.text }}>
                      {parcours.pages[1].content.split("\n\n")[0]}
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        color: theme.textSec,
                        lineHeight: "1.6",
                      }}
                    >
                      {parcours.pages[1].content
                        .split("\n\n")
                        .slice(1)
                        .join("\n\n")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Loisirs" && (
              <div>
                <h2
                  style={{
                    fontSize: isMobile ? "1.8rem" : "2rem",
                    marginBottom: "30px",
                    borderLeft: `4px solid ${theme.accent}`,
                    paddingLeft: "15px",
                    color: theme.text,
                  }}
                >
                  {loisirs.title}
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "1fr"
                      : "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {loisirs.pages.map((p, i) => (
                    <div
                      key={i}
                      style={{
                        background: theme.cardBg,
                        padding: "25px",
                        borderRadius: "16px",
                        border: `1px solid ${theme.cardBorder}`,
                        boxShadow: theme.shadow,
                      }}
                    >
                      <h3 style={{ marginTop: 0, color: theme.accent }}>
                        {p.content.split("\n")[0]}
                      </h3>
                      <p
                        style={{
                          whiteSpace: "pre-line",
                          lineHeight: "1.6",
                          color: theme.textSec,
                          margin: 0,
                        }}
                      >
                        {p.content.split("\n").slice(1).join("\n")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Contact" && contact && (
              <div>
                <h2
                  style={{
                    fontSize: isMobile ? "1.8rem" : "2rem",
                    marginBottom: "30px",
                    borderLeft: `4px solid ${theme.accent}`,
                    paddingLeft: "15px",
                    color: theme.text,
                  }}
                >
                  {contact.title}
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "1fr"
                      : "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {contact.pages
                    .filter((p) => p.type === "contact_card")
                    .map((p, i) => (
                      <ContactCard key={i} data={p} theme={theme} />
                    ))}
                </div>

                <div style={{ marginTop: "40px" }}>
                  {contact.pages
                    .filter((p) => p.type === "cv_download")
                    .map((p, i) => (
                      <motion.a
                        key={i}
                        href="/pdf/CV_Ange_GRIMAUD.pdf"
                        target="_blank"
                        initial={{
                          backgroundColor: theme.cardBg,
                          borderColor: theme.accent,
                          color: theme.accent,
                        }}
                        animate={{
                          backgroundColor: theme.cardBg,
                          borderColor: theme.accent,
                          color: theme.accent,
                        }}
                        whileHover={{
                          scale: 1.02,
                          backgroundColor: isDarkMode
                            ? theme.accentBg
                            : "#ffffff",
                          boxShadow: isDarkMode
                            ? "none"
                            : `0 15px 30px ${theme.accent}33`,
                          borderColor: isDarkMode
                            ? theme.accent
                            : "transparent",
                        }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "15px",
                          width: "100%",
                          padding: "30px",
                          borderWidth: "1px",
                          borderStyle: "solid",
                          borderRadius: "16px",
                          textDecoration: "none",
                          cursor: "pointer",
                          boxSizing: "border-box",
                          boxShadow: theme.shadow,
                          transition: "border-color 0.3s",
                        }}
                      >
                        <span style={{ fontSize: "2rem" }}>📜</span>
                        <div style={{ textAlign: "center" }}>
                          <div
                            style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                          >
                            {p.title}
                          </div>
                          <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>
                            {p.desc}
                          </div>
                        </div>
                      </motion.a>
                    ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ClassicPortfolio;
