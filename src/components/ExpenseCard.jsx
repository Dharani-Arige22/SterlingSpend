import React from 'react';
import { Trash2, Users, Calendar } from 'lucide-react';

export default function ExpenseCard({ item, onDelete }) {
  return (
    <div className="glass-card">
      <div className="card-content-left">
        <div className="card-meta">
          <span className="category-tag">{item.category}</span>
          <span className="date-tag"><Calendar size={12}/> {item.date}</span>
          {item.split && <span className="split-badge"><Users size={12} /> Shared</span>}
        </div>
        <h4>{item.label}</h4>
      </div>
      <div className="card-content-right">
        <span className="amount">£{item.value.toFixed(2)}</span>
        <button className="delete-btn" onClick={() => onDelete(item.id)}><Trash2 size={16} /></button>
      </div>
    </div>
  );
}