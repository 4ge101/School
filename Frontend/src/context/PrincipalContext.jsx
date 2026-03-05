import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

const API    = "http://localhost:5000/api/principal";
const WS_URL = "ws://localhost:5000";

const PrincipalContext = createContext(null);

export function PrincipalProvider({ children }) {
  const [principal, setPrincipal] = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const wsRef        = useRef(null);
  const reconnectRef = useRef(null);
  const mountedRef   = useRef(true);

  // 1. Fetch initial data on mount
  useEffect(() => {
    mountedRef.current = true;

    console.log("Fetching principal from:", API);

    fetch(API)
      .then((r) => {
        console.log("Response status:", r.status);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        console.log("Principal data loaded:", data);
        if (mountedRef.current) {
          setPrincipal(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load principal:", err.message);
        if (mountedRef.current) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { mountedRef.current = false; };
  }, []);

  // 2. WebSocket — receive live updates
  useEffect(() => {
    mountedRef.current = true;

    const connect = () => {
      if (!mountedRef.current) return;

      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => console.log("✅ WebSocket connected");

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === "PRINCIPAL_UPDATED" && mountedRef.current) {
            console.log("📡 Live update received:", msg.data);
            setPrincipal(msg.data);
          }
        } catch (_) {}
      };

      ws.onerror = () => console.warn("WebSocket error — retrying in 5s");

      ws.onclose = () => {
        if (mountedRef.current) {
          reconnectRef.current = setTimeout(connect, 5000);
        }
      };
    };

    connect();

    return () => {
      mountedRef.current = false;
      clearTimeout(reconnectRef.current);
      if (wsRef.current) {
        wsRef.current.onclose = null;
        wsRef.current.close();
      }
    };
  }, []);

  // 3. Save to backend — triggers WS broadcast to all clients
  const save = useCallback(async (updated) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token — please log in again");

    const res = await fetch(API, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(updated),
    });

    if (res.status === 401) throw new Error("Session expired — please log in again");
    if (!res.ok) throw new Error(`Save failed (${res.status})`);

    const saved = await res.json();
    if (mountedRef.current) setPrincipal(saved);
    return saved;
  }, []);

  return (
    <PrincipalContext.Provider value={{ principal, setPrincipal, loading, error, save }}>
      {children}
    </PrincipalContext.Provider>
  );
}

export function usePrincipal() {
  const ctx = useContext(PrincipalContext);
  if (!ctx) throw new Error("usePrincipal must be inside <PrincipalProvider>");
  return ctx;
}