// src/components/ImportForm.js
import React, { useState } from 'react';
import { audienceService } from '../services/api';
import ListSelector from './ListSelector';

const ImportForm = () => {
  const [listId, setListId] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [results, setResults] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleListSelect = (id) => {
    setListId(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!listId) {
      setError('Please select a mailing list');
      return;
    }

    if (!file) {
      setError('Please select a CSV file');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      setResults(null);

      const response = await audienceService.bulkImport(listId, file);
      
      setSuccess('Subscribers imported successfully!');
      setResults(response.data.results);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to import subscribers');
      setLoading(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h3>Import Subscribers</h3>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <ListSelector onSelect={handleListSelect} />

          <div className="form-group mb-3">
            <label htmlFor="csvFile">Upload CSV File</label>
            <input 
              type="file" 
              id="csvFile" 
              className="form-control" 
              accept=".csv"
              onChange={handleFileChange} 
            />
            <small className="form-text text-muted">
              CSV should have columns: email, first_name, last_name
            </small>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading || !listId || !file}
          >
            {loading ? 'Importing...' : 'Import Subscribers'}
          </button>
        </form>

        {results && (
          <div className="mt-4">
            <h4>Import Results</h4>
            <ul className="list-group">
              <li className="list-group-item list-group-item-success">
                Successful imports: {results.success}
              </li>
              <li className="list-group-item list-group-item-danger">
                Failed imports: {results.failed}
              </li>
            </ul>
            {results.errors && results.errors.length > 0 && (
              <div className="mt-3">
                <h5>Errors:</h5>
                <ul className="list-group">
                  {results.errors.map((error, index) => (
                    <li key={index} className="list-group-item list-group-item-danger">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportForm;