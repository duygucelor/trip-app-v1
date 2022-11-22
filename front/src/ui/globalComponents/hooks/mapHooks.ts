import { useState } from "react";

export function useStaticMapMarkerSize(
  markerRadius: number,
  initialMapScaleFactor: number = 1
): [number, (scaleFactor: number) => void] {
  const [scaleFactor, setScaleFactor] = useState<number>(initialMapScaleFactor);
  const scaledRadius = markerRadius / (scaleFactor - initialMapScaleFactor + 1);

  return [scaledRadius, setScaleFactor];
}
