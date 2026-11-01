import { Composition } from "remotion";
import { Reel, TOTAL_SECONDS } from "./Reel";
import { Aula, AULA_DURATION, AULA_FPS } from "./Aula";
import { FPS } from "./theme";

export const MyComposition = () => {
  return (
    <>
      <Composition
        id="Reel"
        component={Reel}
        durationInFrames={Math.round(TOTAL_SECONDS * FPS)}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Aula"
        component={Aula}
        durationInFrames={Math.floor(AULA_DURATION * AULA_FPS)}
        fps={AULA_FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
