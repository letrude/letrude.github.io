import { create } from "zustand";
import translations from "../data/content";

const getInitialViewMode = () => {
  const path = window.location.pathname;
  if (path === "/world") return "3d";
  if (path === "/classic") return "2d";
  return "menu";
};

const useStore = create((set) => ({
  currentZone: null,
  isReadingMode: false,
  viewMode: getInitialViewMode(),

  isDarkMode: true,
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  language: "fr",
  toggleLanguage: () =>
    set((state) => {
      const newLang = state.language === "fr" ? "en" : "fr";
      return {
        language: newLang,
        content: translations[newLang].zones,
        uiText: translations[newLang].ui,
        menuText: translations[newLang].menu,
      };
    }),

  content: translations.fr.zones,
  uiText: translations.fr.ui,
  menuText: translations.fr.menu,

  volume: 0.4,
  setVolume: (val) => set({ volume: val }),

  isSceneReady: false,
  setSceneReady: (ready) => set({ isSceneReady: ready }),

  setZone: (zone) => set({ currentZone: zone }),
  enableReadingMode: (active) => set({ isReadingMode: active }),
  setViewMode: (mode) => set({ viewMode: mode }),

  isContactOpen: false,
  setContactOpen: (isOpen) => set({ isContactOpen: isOpen }),
}));

export default useStore;
