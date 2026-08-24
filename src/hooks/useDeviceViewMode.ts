import { useState, useEffect } from "react";

export type ViewMode = "tablet" | "standard" | "desktop";

export function useDeviceViewMode() {
  const [isAndroid, setIsAndroid] = useState<boolean>(false);
  const [viewMode, setViewModeState] = useState<ViewMode>("standard");
  const [isAutoDetected, setIsAutoDetected] = useState<boolean>(false);

  useEffect(() => {
    // Check if running on an Android device or Android browser
    const userAgent = typeof navigator !== "undefined" ? navigator.userAgent || "" : "";
    const isAndroidDevice = /Android/i.test(userAgent);
    setIsAndroid(isAndroidDevice);

    // Check user preference in localStorage
    const savedMode = typeof localStorage !== "undefined" ? localStorage.getItem("gbs_view_mode") as ViewMode | null : null;

    if (savedMode && ["tablet", "standard", "desktop"].includes(savedMode)) {
      setViewModeState(savedMode);
      setIsAutoDetected(false);
    } else if (isAndroidDevice) {
      // Auto-enable Tablet Mode for all Android devices by default
      setViewModeState("tablet");
      setIsAutoDetected(true);
    } else {
      setViewModeState("standard");
      setIsAutoDetected(false);
    }
  }, []);

  // Update DOM and Viewport meta tags when view mode changes
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    let viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null;

    if (!viewportMeta) {
      viewportMeta = document.createElement("meta");
      viewportMeta.name = "viewport";
      document.head.appendChild(viewportMeta);
    }

    // Clean previous classes
    root.classList.remove("tablet-mode-active", "desktop-mode-active", "standard-mode-active");
    body.classList.remove("tablet-mode-active", "desktop-mode-active", "standard-mode-active");

    if (viewMode === "tablet") {
      root.classList.add("tablet-mode-active");
      body.classList.add("tablet-mode-active");
      
      // If on Android / Mobile phone, adjust viewport to allow comfortable wide tablet layout
      if (typeof window !== "undefined" && window.innerWidth < 900) {
        viewportMeta.setAttribute("content", "width=1024, initial-scale=0.75, maximum-scale=2.5, user-scalable=yes");
      } else {
        viewportMeta.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=2.5, user-scalable=yes");
      }
    } else if (viewMode === "desktop") {
      root.classList.add("desktop-mode-active");
      body.classList.add("desktop-mode-active");
      viewportMeta.setAttribute("content", "width=1280, initial-scale=0.65, maximum-scale=2.5, user-scalable=yes");
    } else {
      root.classList.add("standard-mode-active");
      body.classList.add("standard-mode-active");
      viewportMeta.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=2.5, user-scalable=yes");
    }
  }, [viewMode]);

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    setIsAutoDetected(false);
    try {
      localStorage.setItem("gbs_view_mode", mode);
    } catch {
      // ignore
    }
  };

  const toggleTabletMode = () => {
    const nextMode = viewMode === "tablet" ? "standard" : "tablet";
    setViewMode(nextMode);
  };

  return {
    viewMode,
    isAndroid,
    isAutoDetected,
    setViewMode,
    toggleTabletMode,
  };
}
