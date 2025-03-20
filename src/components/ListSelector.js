// src/components/ListSelector.js
import React, { useState, useEffect } from 'react';
import { audienceService } from '../services/api';

const ListSelector = ({ onChange }) => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        const response = await audienceService.getAllLists();
        setLists(response);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching lists:', err);
        setError('Failed to load mailing lists');
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  if (loading) return <p>Loading mailing lists...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="form-group mb-3">
      <label htmlFor="listSelector">Select Mailing List</label>
      <select 
        id="listSelector" 
        className="form-control" 
        onChange={handleChange}
      >
        <option value="">-- Select a list --</option>
        {lists.map(list => (
          <option key={list.id} value={list.id}>
            {list.name} ({list.stats.member_count} subscribers)
          </option>
        ))}
      </select>
    </div>
  );
};

export default ListSelector;
