import api from "./apiClient";

export const getSeverityStats = () =>
  api.get("/api/analytics/severity").then(res => res.data);

export const getTypeStats = () =>
  api.get("/api/analytics/type").then(res => res.data);

export const getDailyStats = () =>
  api.get("/api/analytics/daily").then(res => res.data);
