"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface GroupMenu {
  id: number;
  name: string;
}

interface MenuContextType {
  groupMenus: GroupMenu[];
  addGroupMenu: (groupMenu: Omit<GroupMenu, "id">) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [groupMenus, setGroupMenus] = useState<GroupMenu[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("groupMenus");
    if (stored) {
      setGroupMenus(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("groupMenus", JSON.stringify(groupMenus));
  }, [groupMenus]);

  const addGroupMenu = (groupMenu: Omit<GroupMenu, "id">) => {
    const newGroup = { ...groupMenu, id: Date.now() };
    setGroupMenus((prev) => [...prev, newGroup]);
  };

  return (
    <MenuContext.Provider value={{ groupMenus, addGroupMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}
