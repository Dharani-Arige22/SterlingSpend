import React, { useState } from 'react';
import { Wallet, PlusCircle, Users } from 'lucide-react';

export default function Sidebar({ onAdd, existingLabels }) {
  const [form, setForm] = useState({ label: '', value: '', category: 'Food', notes: '', isSplit: false });
  const [suggestions, setSuggestions] = useState([]);

  const handleLabelChange = (val) => {
    setForm({...form, label: val});
    setSuggestions(val ? existingLabels.filter(l => l.toLowerCase().includes(val.toLowerCase())) : []);
  };

  const submit = (e) => {
    e.preventDefault();
    const finalValue = form.isSplit ? parseFloat(form.value) / 2 : parseFloat(form.value);
    onAdd({ ...form, value: finalValue, split: form.isSplit, date: new Date().toISOString().split('T')[0] });
    setForm({ label: '', value: '', category: 'Food', notes: '', isSplit: false });
  };

  return (
    <aside className="sidebar">
      <div className="logo-section">
        <Wallet color="#6366f1" size={32} />
        <h2>Sterling<span>Spend</span></h2>
      </div>
      <form className="nav-form" onSubmit={submit}>
        <h3>Add New Bill</h3>
        <div style={{ position: 'relative' }}>
          <input className="main-input" placeholder="Item Name" value={form.label} onChange={e => handleLabelChange(e.target.value)} required />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((s, i) => <li key={i} onClick={() => {setForm({...form, label: s}); setSuggestions([]);}}>{s}</li>)}
            </ul>
          )}
        </div>
        <input className="main-input" type="number" placeholder="Amount £" value={form.value} onChange={e => setForm({...form, value: e.target.value})} required />
        <select className="main-input" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
          <option value="Food">🛒 Food</option><option value="Housing">🏠 Housing</option><option value="Transport">🚆 Transport</option>
        </select>
        <div className={`toggle-pill ${form.isSplit ? 'active' : ''}`} onClick={() => setForm({...form, isSplit: !form.isSplit})}>
          <Users size={16} /> <span>{form.isSplit ? "Split: ON" : "Split with Friend?"}</span>
        </div>
        <button type="submit" className="add-btn"><PlusCircle size={18} /> Add</button>
      </form>
    </aside>
  );
}