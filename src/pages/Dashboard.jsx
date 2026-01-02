import { useEffect, useState } from "react";
import { getSeverityStats, getTypeStats, getDailyStats } from "../api/analyticsApi";
import { Bar, Pie, Line } from "react-chartjs-2";

const Dashboard = () => {
  const [severity, setSeverity] = useState([]);
  const [type, setType] = useState([]);
  const [daily, setDaily] = useState([]);

  useEffect(() => {
    getSeverityStats().then(setSeverity);
    getTypeStats().then(setType);
    getDailyStats().then(setDaily);
  }, []);

  const severityData = {
    labels: severity.map(s => s.severity),
    datasets: [{ label: 'Incidents', data: severity.map(s => s.count), backgroundColor: 'rgba(255,99,132,0.6)' }]
  };

  const typeData = {
    labels: type.map(t => t.type),
    datasets: [{ label: 'Incidents', data: type.map(t => t.count), backgroundColor: 'rgba(54,162,235,0.6)' }]
  };

  const dailyData = {
    labels: daily.map(d => d.date),
    datasets: [{ label: 'Incidents', data: daily.map(d => d.total), fill: false, borderColor: 'rgba(75,192,192,1)' }]
  };

  useEffect(() => {
    fetchData(); // initial load
    const interval = setInterval(fetchData, 10000); // poll every 10 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Analytics Dashboard</h2>
      <div style={{ width: '400px', marginBottom: '20px' }}>
        <Pie data={severityData} />
      </div>
      <div style={{ width: '400px', marginBottom: '20px' }}>
        <Bar data={typeData} />
      </div>
      <div style={{ width: '600px', marginBottom: '20px' }}>
        <Line data={dailyData} />
      </div>
    </div>
  );
};

export default Dashboard;
