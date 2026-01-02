import { useEffect, useState } from "react";
import { fetchIncidents } from "../api/incidentApi";

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchIncidents().then(setIncidents);
  }, []);

  const filtered = incidents.filter(i =>
    filter ? i.status === filter : true
  );

  return (
    <div>
      <h2>Incidents</h2>

      <select onChange={e => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="OPEN">OPEN</option>
        <option value="RESOLVED">RESOLVED</option>
      </select>

      <ul>
        {filtered.map(i => (
          <li key={i.id}>
            <strong>{i.title}</strong> — {i.severity} — {i.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Incidents;
