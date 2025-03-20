// src/components/EmailForm.js
import React, { useState } from 'react';
import { campaignService } from '../services/api';
import ListSelector from './ListSelector';

const DEFAULT_HTML_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <title>Email Campaign</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto;">
    <h1 style="color: #333;">Your Email Title</h1>
    <p>Hello,</p>
    <p>Your email content goes here.</p>
    <p>Best regards,</p>
    <p>Your Name</p>
  </div>
</body>
</html>
`;

const EmailForm = () => {
  const [listId, setListId] = useState('');
  const [formData, setFormData] = useState({
    subject: '',
    fromName: '',
    replyTo: '',
    htmlContent: DEFAULT_HTML_TEMPLATE
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleListChange = (value) => {
    console.log("List selected:", value);
    setListId(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!listId) {
      setError('Please select a mailing list');
      return;
    }

    if (!formData.htmlContent.trim()) {
      setError('Email content cannot be empty');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const emailData = {
        listId,
        ...formData
      };
      console.log('Submitting email data:', emailData);

      const response = await campaignService.bulkSend(emailData);
      console.log('Campaign sent response:', response);

      if (response.success) {
        setSuccess('Email campaign sent successfully!');
        // Clear form after successful send
        setFormData({
          subject: '',
          fromName: '',
          replyTo: '',
          htmlContent: DEFAULT_HTML_TEMPLATE
        });
        setListId('');
      } else {
        throw new Error(response.error || 'Failed to send campaign');
      }
    } catch (err) {
      console.error('Error sending campaign:', err);
      setError(err.error || err.message || 'Failed to send email campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="email-form">
      <h2>Create New Email Campaign</h2>
      {error && (
        <div className="alert alert-danger">
          <strong>Error: </strong>{error}
        </div>
      )}
      {success && (
        <div className="alert alert-success">
          <strong>Success! </strong>{success}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <ListSelector onChange={handleListChange} value={listId} />
        
        <div className="form-group mb-3">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="form-control"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="fromName">From Name</label>
          <input
            type="text"
            id="fromName"
            name="fromName"
            className="form-control"
            value={formData.fromName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="replyTo">Reply-To Email</label>
          <input
            type="email"
            id="replyTo"
            name="replyTo"
            className="form-control"
            value={formData.replyTo}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="htmlContent">Email Content (HTML)</label>
          <textarea
            id="htmlContent"
            name="htmlContent"
            className="form-control"
            value={formData.htmlContent}
            onChange={handleInputChange}
            rows="12"
            required
          />
          <small className="form-text text-muted">
            Enter your email content in HTML format. The editor supports full HTML markup for rich formatting.
          </small>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || !listId || !formData.subject || !formData.fromName || !formData.replyTo}
        >
          {loading ? 'Sending...' : 'Send Email Campaign'}
        </button>
      </form>
    </div>
  );
};

export default EmailForm;