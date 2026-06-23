import React, { createContext, useCallback, useContext, useState } from "react";

const WindowContext = createContext(null);

export function WindowProvider({ children }) {
  const [activeWindow, setActiveWindow] = useState(null);

  const openWindow = useCallback((id) => {
    setActiveWindow(id);
  }, []);

  const closeWindow = useCallback(() => {
    setActiveWindow(null);
  }, []);

  const toggleWindow = useCallback((id) => {
    setActiveWindow((current) => (current === id ? null : id));
  }, []);

  return (
    <WindowContext.Provider
      value={{ activeWindow, openWindow, closeWindow, toggleWindow }}
    >
      {children}
    </WindowContext.Provider>
  );
}

export function useWindows() {
  const ctx = useContext(WindowContext);
  if (!ctx) {
    throw new Error("useWindows must be used within a WindowProvider");
  }
  return ctx;
}
