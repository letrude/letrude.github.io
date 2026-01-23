import { Suspense, lazy, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import useStore from "./store/useStore";
import UI from "./components/layout/UI";
import LoadingScreen from "./components/layout/LoadingScreen";
const LazyMainMenu = lazy(() => import("./features/menu/MainMenu"));
const LazyClassicPortfolio = lazy(() =>
  import("./features/classic/ClassicPortfolio")
);
const LazyGameScene = lazy(() => import("./features/world/GameScene"));

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
      {menuText.loading}
    </div>
  );
};


export default function App() {
  const viewMode = useStore((state) => state.viewMode);
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);
  return (
    <div
      className="custom-cursor"
      style={{
        width: "100vw",
        height: "100vh",
        background: viewMode === "3d" ? "#aaddff" : "none",
        position: "relative",
      }}
    >
      <Suspense fallback={<InitialLoadingFallback />}>
        {viewMode === "menu" && <LazyMainMenu />}
        {viewMode === "2d" && <LazyClassicPortfolio />}
        {viewMode === "3d" && (
          <>
            <LoadingScreen />
            <Canvas shadows dpr={[1, 2]}>
              <Suspense fallback={null}>
                <LazyGameScene />
              </Suspense>
            </Canvas>
            <UI />
          </>
        )}
      </Suspense>
    </div>
  );
}
