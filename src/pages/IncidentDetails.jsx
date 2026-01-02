import { useEffect, useState } from "react";
import { fetchIncidentById, updateIncident } from "../api/incidentApi";
import { useParams } from "react-router-dom";

const IncidentDetails = () => {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const incidentData = await fetchIncidentById(id);
      setIncident(incidentData);

      const timelineData = await fetchIncidentTimeline(id);
      setTimeline(timelineData);
    };

    fetchData();

    const interval = setInterval(fetchData, 20000); // refresh both every 20 seconds
    return () => clearInterval(interval);
  }, [id]);


  const handleStatusChange = async (newStatus) => {
    const previousStatus = incident.status;

    setIncident({ ...incident, status: newStatus });

    try {
      await updateIncident(id, {
        status: newStatus,
        severity: incident.severity,
      });
    } catch (error) {
      setIncident({ ...incident, status: previousStatus });
      alert("Status update failed");
    }
  };

  if (!incident) return <div>Loading...</div>;

  return (
    <div>
      <h2>{incident.title}</h2>
      <p><strong>Severity:</strong> {incident.severity}</p>
      <p>
        <strong>Status:</strong>{" "}
        <select
          value={incident.status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="OPEN">OPEN</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>
      </p>
      <p><strong>Type:</strong> {incident.type}</p>
      <p><strong>Description:</strong> {incident.description}</p>
      <p><strong>Created By:</strong> {incident.createdBy}</p>
      <p><strong>Created At:</strong> {new Date(incident.createdAt).toLocaleString()}</p>
      
      <h3>Incident Timeline</h3>
      {timeline.length === 0 ? (
        <p>No activity yet</p>
      ) : (
        <ul>
          {timeline.map((log) => (
            <li key={log.id}>
              [{new Date(log.createdAt).toLocaleString()}]{" "}
              <strong>{log.action}</strong>{" "}
              ({log.oldValue} → {log.newValue}) by {log.changedBy}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IncidentDetails;
