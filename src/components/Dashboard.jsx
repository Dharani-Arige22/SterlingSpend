import React, { useState } from 'react';
import QuickStats from './QuickStats';
import ExpenseCard from './ExpenseCard';

export default function Dashboard({ expenses, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortPrice, setSortPrice] = useState('none'); 
  const [sortDate, setSortDate] = useState('newest');

  const filteredExpenses = expenses
    .filter((item) => {
      const matchesStore = item.label.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' ? true :
                            statusFilter === 'shared' ? item.split : !item.split;
      return matchesStore && matchesStatus;
    })
    .sort((a, b) => {
      if (sortPrice === 'high') return b.value - a.value;
      if (sortPrice === 'low') return a.value - b.value;
      return sortDate === 'newest' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
    });

  return (
    <main className="content">
      <header className="main-header">
        <h1>Financial Overview</h1>
        <p>You have {expenses.length} records this month.</p>
      </header>

      <QuickStats expenses={expenses} />

      <div className="filter-bar">
        <div className="filter-group">
          <label>Search Store</label>
          <input className="filter-input" placeholder="e.g. Tesco" onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="filter-group">
          <label>Status</label>
          <select className="filter-input" onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="shared">Shared</option>
            <option value="private">Personal</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Price</label>
          <select className="filter-input" onChange={e => {setSortPrice(e.target.value); setSortDate('none');}}>
            <option value="none">Default</option>
            <option value="high">High to Low</option>
            <option value="low">Low to High</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Date</label>
          <select className="filter-input" value={sortDate} onChange={e => {setSortDate(e.target.value); setSortPrice('none');}}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      <section className="expense-list">
        {filteredExpenses.map(item => <ExpenseCard key={item.id} item={item} onDelete={onDelete} />)}
      </section>
    </main>
  );
}