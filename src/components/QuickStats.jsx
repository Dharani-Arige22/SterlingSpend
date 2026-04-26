import React from 'react';
import { PlusCircle, PieChart, Users } from 'lucide-react';

export default function QuickStats({ expenses }) {
  const total = expenses.reduce((s, i) => s + i.value, 0);
  const peak = expenses.length > 0 ? Math.max(...expenses.map(e => e.value)) : 0;
  const shared = expenses.filter(e => e.split).length;
  const progress = Math.min((total / 1000) * 100, 100);

  return (
    <div className="stats-wrapper">
      <section className="stats-container">
        <StatCard icon={<PlusCircle />} color="pink" label="Peak" val={`£${peak.toFixed(2)}`} />
        <StatCard icon={<PieChart />} color="purple" label="Total" val={`£${total.toFixed(2)}`} />
        <StatCard icon={<Users />} color="blue" label="Shared" val={shared} />
      </section>
      <div className="budget-progress-section">
        <div className="budget-header"><span>Goal (£1000)</span><span>{progress.toFixed(0)}%</span></div>
        <div className="budget-bar-bg"><div className="budget-bar-fill" style={{ width: `${progress}%`, backgroundColor: progress > 90 ? '#f43f5e' : '#6366f1' }}></div></div>
      </div>
    </div>
  );
}

function StatCard({ icon, color, label, val }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>{icon}</div>
      <div className="stat-data"><small>{label}</small><h4>{val}</h4></div>
    </div>
  );
}