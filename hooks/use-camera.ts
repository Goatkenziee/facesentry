"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export interface CameraState {
  stream: MediaStream | null;
  isActive: boolean;
  error: string | null;
  faceDetected: boolean;
  faceCount: number;
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
  });
  const animFrameRef = useRef<number>(0);

  const startCamera = useCallback(async () => {
    try {
      setState((s) => ({ ...s, error: null }));
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setState({ stream, isActive: true, error: null, faceDetected: false, faceCount: 0 });
    } catch (err: unknown) {
      const msg = err instanceof DOMException
        ? err.name === "NotAllowedError"
          ? "Camera permission denied. Please allow camera access."
          : err.name === "NotFoundError"
            ? "No camera found on this device."
            : `Camera error: ${err.message}`
        : "Failed to access camera.";
      setState((s) => ({ ...s, error: msg, isActive: false }));
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (state.stream) {
      state.stream.getTracks().forEach((t) => t.stop());
    }
    cancelAnimationFrame(animFrameRef.current);
    if (videoRef.current) videoRef.current.srcObject = null;
    setState({ stream: null, isActive: false, error: null, faceDetected: false, faceCount: 0 });
  }, [state.stream]);

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

  // Simulated face detection (in production, this would call a real ML model API)
  const simulateFaceDetection = useCallback(() => {
    // This is a visual placeholder — real face detection would use
    // TensorFlow.js / face-api.js or a cloud API
    const detected = Math.random() > 0.3;
    setState((s) => ({
      ...s,
      faceDetected: detected,
      faceCount: detected ? Math.floor(Math.random() * 3) + 1 : 0,
    }));
  }, []);

  // Run simulated detection every 2s while camera is active
  useEffect(() => {
    if (!state.isActive) return;
    const interval = setInterval(simulateFaceDetection, 2000);
    return () => clearInterval(interval);
  }, [state.isActive, simulateFaceDetection]);

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
