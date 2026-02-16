import { Suspense, lazy, useEffect } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import useStore from "./store/useStore";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

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

function ViewModeHandler() {
  const location = useLocation();
  const setViewMode = useStore((state) => state.setViewMode);

  useEffect(() => {
    if (location.pathname === "/world") {
      setViewMode("3d");
    } else if (location.pathname === "/classic") {
      setViewMode("2d");
    } else {
      setViewMode("menu");
    }
  }, [location.pathname, setViewMode]);

  return null;
}

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
          <ViewModeHandler />
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
