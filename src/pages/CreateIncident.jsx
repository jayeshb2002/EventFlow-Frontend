import { useState } from "react";
import { createIncident } from "../api/incidentApi";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateIncident = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("LOW");
  const { role } = useAuth();
  const navigate = useNavigate();

  if (!["ADMIN", "OPERATOR"].includes(role)) {
    return <p>Not authorized to create incidents</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createIncident({ title, description, severity });
    navigate("/incidents");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Incident</h2>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <select onChange={e => setSeverity(e.target.value)} value={severity}>
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
        <option value="CRITICAL">CRITICAL</option>
      </select>
      <button>Create</button>
    </form>
  );
};

export default CreateIncident;
