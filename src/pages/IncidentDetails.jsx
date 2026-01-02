import { useEffect, useState } from "react";
import { fetchIncidentById } from "../api/incidentApi";
import { useParams } from "react-router-dom";

const IncidentDetails = () => {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchIncidentById(id).then(setIncident);
    }, 10000); // Poll every 10 seconds for updates

    return () => clearInterval(interval);
  }, [id]);

  if (!incident) return <div>Loading...</div>;

  return (
    <div>
      <h2>{incident.title}</h2>
      <p><strong>Severity:</strong> {incident.severity}</p>
      <p><strong>Status:</strong> {incident.status}</p>
      <p><strong>Type:</strong> {incident.type}</p>
      <p><strong>Description:</strong> {incident.description}</p>
      <p><strong>Created By:</strong> {incident.createdBy}</p>
      <p><strong>Created At:</strong> {new Date(incident.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default IncidentDetails;
