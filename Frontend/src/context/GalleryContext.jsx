import { createContext, useContext, useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "ssns_gallery_v2";

function readStorage() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}

const GalleryContext = createContext(null);

export function GalleryProvider({ children }) {
  const [images, setImages] = useState(readStorage);

  // Keep in sync across tabs / components in real time
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setImages(readStorage());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((imgs) => {
    setImages(imgs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(imgs));
    // Dispatch so other open tabs pick it up instantly
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  }, []);

  const addImages = useCallback((newImgs) => {
    setImages((prev) => {
      const updated = [...newImgs, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteImage = useCallback((id) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <GalleryContext.Provider value={{ images, addImages, deleteImage, persist }}>
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error("useGallery must be used within GalleryProvider");
  return ctx;
}

export const GALLERY_CATEGORIES = [
  "Events",
  "Sports",
  "Science",
  "Cultural",
  "Academics",
  "Infrastructure",
];