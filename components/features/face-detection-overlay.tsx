"use client";

import { useMemo } from "react";
import type { FaceBox } from "@/hooks/use-camera";

interface FaceDetectionOverlayProps {
  isDetecting: boolean;
  faceCount: number;
  faces: FaceBox[];
  videoWidth: number;
  videoHeight: number;
}

export function FaceDetectionOverlay({
  isDetecting,
  faceCount,
  faces,
  videoWidth,
  videoHeight,
}: FaceDetectionOverlayProps) {
  const scaleX = 100 / videoWidth;
  const scaleY = 100 / videoHeight;

  const boundingBoxes = useMemo(() => {
    if (!isDetecting || faces.length === 0) return [];
    return faces.map((face, index) => ({
      id: `face-${index}`,
      left: face.x * scaleX,
      top: face.y * scaleY,
      width: face.width * scaleX,
      height: face.height * scaleY,
      confidence: face.confidence,
    }));
  }, [faces, isDetecting, scaleX, scaleY]);

  if (!isDetecting || faces.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Bounding boxes */}
      {boundingBoxes.map((box) => (
        <div
          key={box.id}
          className="absolute border-2 border-primary/70"
          style={{
            left: `${box.left}%`,
            top: `${box.top}%`,
            width: `${box.width}%`,
            height: `${box.height}%`,
          }}
        >
          <div className="absolute -top-6 left-0 rounded-t bg-primary/80 px-1.5 py-0.5 text-[10px] font-medium text-white">
            {(box.confidence * 100).toFixed(0)}%
          </div>
        </div>
      ))}

      {/* Face count badge */}
      <div className="absolute top-3 right-3 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
        {faceCount} face{faceCount !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
