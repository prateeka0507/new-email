// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="jumbotron p-4 bg-light rounded-3 mb-4">
      <h1 className="display-4">Bulk Email Manager</h1>
      <p className="lead">
        Manage your email campaigns and subscribers with ease
      </p>
      <hr className="my-4" />
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Import Subscribers</h5>
              <p className="card-text">Upload a CSV file to add subscribers to your mailing list.</p>
              <Link to="/import" className="btn btn-primary">
                Import Subscribers
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Send Email Campaign</h5>
              <p className="card-text">Create and send an email campaign to your mailing list.</p>
              <Link to="/send" className="btn btn-primary">
                Send Campaign
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;