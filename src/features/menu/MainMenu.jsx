import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Grid, Float } from "@react-three/drei";
import { m } from "framer-motion";
import { Object3D, AdditiveBlending } from "three";
import useStore from "../../store/useStore";
import useIsMobile from "../../hooks/useIsMobile";
import ThemeSwitch from "../../components/common/ThemeSwitch";
import LanguageSwitchButton from "../../components/common/LanguageSwitchButton";

const WarpBackground = ({ color }) => {
  const mesh = useRef();
  const count = 400;

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        z: (Math.random() - 0.5) * 100,
        baseSpeed: 0.1 + Math.random() * 0.2,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new Object3D(), []);

  useFrame(() => {
    if (!mesh.current) return;
    const globalSpeed = 0.5;
    particles.forEach((p, i) => {
      p.z += p.baseSpeed + globalSpeed * 0.5;
      if (p.z > 50) p.z = -100;
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.z = 1 + globalSpeed * 2;
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <boxGeometry args={[0.1, 0.1, 1]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.6}
        blending={AdditiveBlending}
      />
    </instancedMesh>
  );
};

const LightBackground = () => {
  return (
    <group>
      <ambientLight intensity={1} />

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

      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[10, 0, -10]} rotation={[1, 1, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#ffffff" wireframe />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-8, 5, -15]} rotation={[0, 1, 1]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="#3b82f6" transparent opacity={0.1} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[-6, -2, -8]} rotation={[0, 0, 1]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#06b6d4" roughness={0.2} />
        </mesh>
      </Float>

      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[2, 8, -20]} rotation={[1, 0, 1]}>
          <octahedronGeometry args={[4, 0]} />
          <meshStandardMaterial color="#94a3b8" wireframe />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[12, 6, -15]} rotation={[0, 1, 0]}>
          <boxGeometry args={[2.5, 2.5, 2.5]} />
          <meshStandardMaterial color="#6366f1" transparent opacity={0.15} />
        </mesh>
      </Float>
    </group>
  );
};

const MenuButton = ({ onClick, title, desc, style, disabled }) => (
  <m.button
    whileHover={disabled ? {} : { scale: 1.05, y: -5 }}
    whileTap={disabled ? {} : { scale: 0.95 }}
    onClick={disabled ? null : onClick}
    disabled={disabled}
    style={{
      backdropFilter: "blur(10px)",
      padding: "20px 40px",
      borderRadius: "16px",
      cursor: disabled ? "not-allowed" : "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "5px",
      minWidth: "250px",
      fontFamily: "inherit",
      textAlign: "center",
      border: "none",
      transition: "background 0.3s, color 0.3s",
      ...style,
    }}
  >
    <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{title}</span>
    <span style={{ fontSize: "0.9rem", opacity: 0.7 }}>{desc}</span>
  </m.button>
);

function MainMenu() {
  const { setViewMode, isDarkMode, toggleTheme, menuText } = useStore();
  const isMobile = useIsMobile();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const hasTouchScreen =
        window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(hover: none)").matches;
      setIsTouchDevice(hasTouchScreen || window.innerWidth < 1024);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const shouldDisable3D = isTouchDevice || window.innerWidth < 900;

  const theme = {
    bg: isDarkMode ? "#050505" : "#eef2ff",
    canvasBg: isDarkMode ? "#02040a" : "#eef2ff",
    fog: isDarkMode ? "#02040a" : "#eef2ff",

    textTitle: isDarkMode ? "white" : "#1e293b",
    textSub: isDarkMode ? "#cbd5e1" : "#475569",

    particles: isDarkMode ? "#ffffff" : "#3b82f6",

    btnPrimaryBg: isDarkMode ? "rgba(255, 255, 255, 0.95)" : "#2563eb",
    btnPrimaryText: isDarkMode ? "#000" : "#fff",

    btnSecBg: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "#ffffff",
    btnSecText: isDarkMode ? "#fff" : "#1e293b",
    btnSecBorder: isDarkMode
      ? "rgba(255, 255, 255, 0.2)"
      : "rgba(0, 0, 0, 0.1)",

    badgeBg: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(255, 255, 255, 0.7)",
    badgeText: isDarkMode ? "#ffffff" : "#2563eb",
    badgeBorder: isDarkMode
      ? "rgba(255,255,255,0.2)"
      : "rgba(37, 99, 235, 0.2)",
  };

  const button3DStyle = shouldDisable3D
    ? {
        background: isDarkMode ? "#450a0a" : "#fee2e2",
        color: isDarkMode ? "#fca5a5" : "#991b1b",
        border: "2px solid #ef4444",
        boxShadow: "none",
        opacity: 1,
      }
    : {
        background: theme.btnPrimaryBg,
        color: theme.btnPrimaryText,
        border: "none",
        boxShadow: isDarkMode
          ? "0 0 20px rgba(255,255,255,0.3)"
          : "0 10px 25px rgba(37,99,235,0.3)",
        opacity: 1,
      };

  return (
    <div
      style={{
        width: "100vw",
        height: "100dvh",
        background: theme.bg,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Courier New', Courier, monospace",
        transition: "background 0.5s ease",
      }}
    >
      <ThemeSwitch isDark={isDarkMode} toggle={toggleTheme} />
      <LanguageSwitchButton
        style={{ position: "absolute", top: "60px", left: "30px", zIndex: 100 }}
      />

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
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]}>
          <color
            attach="background"
            args={[theme.canvasBg]}
            key={`bg-${theme.canvasBg}`}
          />
          <fog
            attach="fog"
            args={[theme.fog, 10, 60]}
            key={`fog-${theme.fog}`}
          />
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
            {isDarkMode ? (
              <>
                <Stars
                  radius={100}
                  depth={50}
                  count={3000}
                  factor={4}
                  saturation={0}
                  fade
                />
                <WarpBackground color={theme.particles} />
              </>
            ) : (
              <LightBackground />
            )}
          </Suspense>
        </Canvas>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <m.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "50px" }}
        >
          <div
            style={{
              marginBottom: "20px",
              display: "inline-block",
              padding: "8px 16px",
              background: theme.badgeBg,
              color: theme.badgeText,
              borderRadius: "50px",
              border: `1px solid ${theme.badgeBorder}`,
              fontSize: "0.9rem",
              fontWeight: "bold",
            }}
          >
            ✨ Portfolio 2025
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              marginBottom: "10px",
              fontWeight: "900",
              color: theme.textTitle,
              textShadow: isDarkMode
                ? "0 0 30px rgba(255,255,255,0.2)"
                : "none",
            }}
          >
            ANGE GRIMAUD
          </h1>
          <h2
            style={{
              fontSize: "1.2rem",
              fontWeight: "normal",
              opacity: 0.8,
              letterSpacing: "2px",
              color: theme.textSub,
            }}
          >
            {menuText.title}
          </h2>
        </m.div>

        <div
          style={{
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "0 20px",
          }}
        >
          <MenuButton
            onClick={() => {
              if (!shouldDisable3D) setViewMode("3d");
            }}
            title={menuText.enter3d}
            desc={shouldDisable3D ? menuText.keyboardReq : menuText.enter3dDesc}
            disabled={shouldDisable3D}
            style={button3DStyle}
          />
          <MenuButton
            onClick={() => setViewMode("2d")}
            title={menuText.enter2d}
            desc={menuText.enter2dDesc}
            style={{
              background: theme.btnSecBg,
              color: theme.btnSecText,
              border: `1px solid ${theme.btnSecBorder}`,
            }}
          />
        </div>

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{
            position: "absolute",
            bottom: "30px",
            fontSize: "0.8rem",
            opacity: 0.5,
            color: "#94a3b8",
          }}
        >
          {menuText.choose}
        </m.div>
      </div>
    </div>
  );
}

export default MainMenu;
