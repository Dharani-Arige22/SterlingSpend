import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import './index.css';
import { supabase } from './supabaseClient';

export default function App() {
  const [expenses, setExpenses] = useState([]);

  // --- 1. FETCH DATA FROM SUPABASE ---
  const fetchExpenses = async () => {
    const { data, error } = await supabase
      .from('Sterling_Spend') // This must match your table name exactly
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error("Error fetching data:", error.message);
    } else {
      setExpenses(data || []);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // --- 2. ADD DATA TO SUPABASE ---
  const handleAdd = async (payload) => {
    const { error } = await supabase
      .from('Sterling_Spend')
      .insert([payload]);

    if (error) {
      console.error("Error adding expense:", error.message);
    } else {
      fetchExpenses(); // Refresh the list
    }
  };

  // --- 3. DELETE DATA FROM SUPABASE ---
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('Sterling_Spend')
      .delete()
      .eq('id', id); // This matches the ID of the row to delete

    if (error) {
      console.error("Error deleting expense:", error.message);
    } else {
      fetchExpenses(); // Refresh the list
    }
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar 
        onAdd={handleAdd} 
        existingLabels={[...new Set(expenses.map(e => e.label))]} 
      />
      <Dashboard 
        expenses={expenses} 
        onDelete={handleDelete} 
      />
    </div>
  );
}