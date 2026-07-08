"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export interface CameraState {
  stream: MediaStream | null;
  isActive: boolean;
  error: string | null;
  faceDetected: boolean;
  faceCount: number;
  faces: FaceBox[];
  modelLoading: boolean;
  modelLoaded: boolean;
}

export interface FaceBox {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
}

// Lazy-load TensorFlow + face-detection model so the page loads fast
let tfPromise: Promise<typeof import("@tensorflow/tfjs-core")> | null = null;
let fdPromise: Promise<typeof import("@tensorflow-models/face-detection")> | null = null;
let detectorInstance: any = null;

async function ensureDetector() {
  if (detectorInstance) return detectorInstance;
  if (!tfPromise) {
    tfPromise = import("@tensorflow/tfjs-core").then(async (tf) => {
      await import("@tensorflow/tfjs-backend-webgl");
      await tf.ready();
      return tf;
    });
  }
  if (!fdPromise) {
    fdPromise = import("@tensorflow-models/face-detection");
  }
  const tf = await tfPromise;
  const fd = await fdPromise;
  detectorInstance = await fd.createDetector(fd.SupportedModels.MediaPipeFaceDetector, {
    runtime: "tfjs",
    maxFaces: 10,
  });
  return detectorInstance;
}

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<CameraState>({
    stream: null,
    isActive: false,
    error: null,
    faceDetected: false,
    faceCount: 0,
    faces: [],
    modelLoading: false,
    modelLoaded: false,
  });
  const detectionIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setState((s) => ({ ...s, error: null, modelLoading: true }));
      
      // Load the face detection model
      await ensureDetector();
      setState((s) => ({ ...s, modelLoaded: true, modelLoading: false }));
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setState((s) => ({
        ...s,
        stream,
        isActive: true,
        error: null,
        faceDetected: false,
        faceCount: 0,
        faces: [],
      }));
    } catch (err: unknown) {
      const msg = err instanceof DOMException
        ? err.name === "NotAllowedError"
          ? "Camera permission denied. Please allow camera access."
          : err.name === "NotFoundError"
            ? "No camera found on this device."
            : `Camera error: ${err.message}`
        : "Failed to access camera.";
      setState((s) => ({ ...s, error: msg, isActive: false, modelLoading: false }));
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
    if (state.stream) {
      state.stream.getTracks().forEach((t) => t.stop());
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setState({
      stream: null,
      isActive: false,
      error: null,
      faceDetected: false,
      faceCount: 0,
      faces: [],
      modelLoading: false,
      modelLoaded: state.modelLoaded,
    });
  }, [state.stream, state.modelLoaded]);

  const captureFrame = useCallback((): string | null => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return null;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL("image/jpeg", 0.8);
  }, []);

  // Run real face detection every 1.5s while camera is active
  useEffect(() => {
    if (!state.isActive || !state.modelLoaded) return;

    const runDetection = async () => {
      const video = videoRef.current;
      if (!video || video.readyState < 2) return;
      try {
        const detector = await ensureDetector();
        const detections = await detector.estimateFaces(video);
        const faces: FaceBox[] = detections.map((d: any) => ({
          x: d.box.xMin ?? d.box.x ?? 0,
          y: d.box.yMin ?? d.box.y ?? 0,
          width: d.box.width ?? (d.box.xMax - d.box.xMin),
          height: d.box.height ?? (d.box.yMax - d.box.yMin),
          confidence: d.score ?? d.confidence ?? 0,
        }));
        setState((s) => ({
          ...s,
          faceDetected: faces.length > 0,
          faceCount: faces.length,
          faces,
        }));
      } catch {
        // Silently retry on next interval
      }
    };

    detectionIntervalRef.current = setInterval(runDetection, 1500);
    // Run immediately
    runDetection();

    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
        detectionIntervalRef.current = null;
      }
    };
  }, [state.isActive, state.modelLoaded]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (state.stream) {
        state.stream.getTracks().forEach((t) => t.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    videoRef,
    canvasRef,
    state,
    startCamera,
    stopCamera,
    captureFrame,
  };
}
