"use client";
import React, { useState, createContext, useContext } from "react";

interface MenubarType {
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (isOpen: boolean) => void;
}
const MobileMenubarContext = createContext<null | MenubarType>(null);
const MobileMenubarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  return (
    <MobileMenubarContext.Provider
      value={{ isMobileSidebarOpen, setIsMobileSidebarOpen }}
    >
      {children}
    </MobileMenubarContext.Provider>
  );
};

export default MobileMenubarProvider;
export function useMobileMenubarContext() {
  return useContext(MobileMenubarContext);
}
