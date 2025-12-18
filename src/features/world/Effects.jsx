import React from "react";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

const Effects = () => {
  return (
    <EffectComposer disableNormalPass>
      <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.6} />
      <Vignette eskil={false} offset={0.1} darkness={0.5} />
    </EffectComposer>
  );
};

export default Effects;
