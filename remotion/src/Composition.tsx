import { Composition } from "remotion";
import { Reel, TOTAL_SECONDS } from "./Reel";
import { FPS } from "./theme";

export const MyComposition = () => {
  return (
    <Composition
      id="Reel"
      component={Reel}
      durationInFrames={Math.round(TOTAL_SECONDS * FPS)}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
