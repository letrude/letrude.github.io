import { Suspense, lazy } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import useStore from "./store/useStore";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
const LazyMainMenu = lazy(() => import("./features/menu/MainMenu"));
const LazyClassicPortfolio = lazy(
  () => import("./features/classic/ClassicPortfolio"),
);
const LazyWorld = lazy(() => import("./features/world/World"));

const InitialLoadingFallback = () => {
  const menuText = useStore((state) => state.menuText);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        color: "white",
        fontSize: "20px",
        backgroundColor: "#000",
        position: "absolute",
        zIndex: 999,
      }}
    >
      {menuText.loading || "Loading application..."}
    </div>
  );
};

export default function App() {
  const viewMode = useStore((state) => state.viewMode);

  return (
    <div
      className={viewMode === "3d" ? "custom-cursor" : ""}
      style={{
        width: "100vw",
        height: "100vh",
        background: viewMode === "3d" ? "#aaddff" : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <LazyMotion features={domAnimation}>
        <BrowserRouter>
          <Suspense fallback={<InitialLoadingFallback />}>
            <Routes>
              <Route path="/" element={<LazyMainMenu />} />
              <Route path="/classic" element={<LazyClassicPortfolio />} />
              <Route path="/world" element={<LazyWorld />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </LazyMotion>
    </div>
  );
}
