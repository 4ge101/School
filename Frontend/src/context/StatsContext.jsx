import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  Users,
  Award,
  BookOpen,
  Building2,
  BookOpen as BookOpenIcon,
  BarChart3,
  Calendar,
  GraduationCap,
} from "lucide-react";

// ─── Default values ───────────────────────────────────────────────────────────

const DEFAULT_HOME_STATS = [
  { id: 1, iconName: "Users", value: "2500+", label: "Students" },
  { id: 2, iconName: "Award", value: "30+", label: "Years of Excellence" },
  { id: 3, iconName: "BookOpen", value: "Class 2-12", label: "Grade Levels" },
  { id: 4, iconName: "Building2", value: "1990", label: "Established" },
];

const DEFAULT_DASHBOARD_STATS = [
  {
    id: 1,
    iconName: "BookOpen",
    label: "Courses Enrolled",
    value: "8",
    color: "blue",
  },
  { id: 2, iconName: "Award", label: "GPA", value: "3.8", color: "green" },
  {
    id: 3,
    iconName: "Calendar",
    label: "Classes Today",
    value: "5",
    color: "orange",
  },
  {
    id: 4,
    iconName: "BarChart3",
    label: "Attendance",
    value: "94%",
    color: "purple",
  },
];

const LS_HOME_KEY = "school_home_stats";
const LS_DASH_KEY = "school_dashboard_stats";

// ─── Icon map (serialisable over localStorage) ────────────────────────────────
export const ICON_MAP = {
  Users,
  Award,
  BookOpen,
  Building2,
  Calendar,
  BarChart3,
  GraduationCap,
};

// ─── Context ──────────────────────────────────────────────────────────────────
const StatsContext = createContext(null);

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function StatsProvider({ children }) {
  const [homeStats, setHomeStatsState] = useState(() =>
    load(LS_HOME_KEY, DEFAULT_HOME_STATS),
  );
  const [dashboardStats, setDashboardStatsState] = useState(() =>
    load(LS_DASH_KEY, DEFAULT_DASHBOARD_STATS),
  );

  // Persist + broadcast on every change
  const setHomeStats = useCallback((updater) => {
    setHomeStatsState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      localStorage.setItem(LS_HOME_KEY, JSON.stringify(next));
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: LS_HOME_KEY,
          newValue: JSON.stringify(next),
        }),
      );
      return next;
    });
  }, []);

  const setDashboardStats = useCallback((updater) => {
    setDashboardStatsState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      localStorage.setItem(LS_DASH_KEY, JSON.stringify(next));
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: LS_DASH_KEY,
          newValue: JSON.stringify(next),
        }),
      );
      return next;
    });
  }, []);

  // Listen for changes from other tabs
  useEffect(() => {
    const handler = (e) => {
      if (e.key === LS_HOME_KEY && e.newValue) {
        try {
          setHomeStatsState(JSON.parse(e.newValue));
        } catch {}
      }
      if (e.key === LS_DASH_KEY && e.newValue) {
        try {
          setDashboardStatsState(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <StatsContext.Provider
      value={{ homeStats, setHomeStats, dashboardStats, setDashboardStats }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const ctx = useContext(StatsContext);
  if (!ctx) throw new Error("useStats must be used inside <StatsProvider>");
  return ctx;
}
