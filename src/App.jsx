import { Suspense, lazy } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import useStore from "./store/useStore";
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

const CurrentView = ({ viewMode }) => {
  switch (viewMode) {
    case "menu":
      return <LazyMainMenu />;
    case "2d":
      return <LazyClassicPortfolio />;
    case "3d":
      return <LazyWorld />;
    default:
      return null;
  }
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
        <Suspense fallback={<InitialLoadingFallback />}>
          <CurrentView viewMode={viewMode} />
        </Suspense>
      </LazyMotion>
    </div>
  );
}
