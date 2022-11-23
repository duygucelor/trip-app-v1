import { useState } from "react";

export function useStaticMapMarkerSize(
  markerRadius: number,
  initialMapScaleFactor: number = 1
): [number, (scaleFactor: number) => void] {
  const [scaleFactor, setScaleFactor] = useState<number>(initialMapScaleFactor);
  const scaledRadius = Math.abs(markerRadius / (scaleFactor - initialMapScaleFactor + 1));
  return [
    scaledRadius < markerRadius ? scaledRadius : markerRadius,
    setScaleFactor,
  ];
}
