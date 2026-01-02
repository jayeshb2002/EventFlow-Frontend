import api from "./apiClient";

export const fetchIncidents = () =>
  api.get("/api/incidents").then(res => res.data);

export const fetchIncidentById = (id) =>
  api.get(`/api/incidents/${id}`).then(res => res.data);

export const createIncident = (incident) =>
  api.post("/api/incidents", incident).then(res => res.data);

