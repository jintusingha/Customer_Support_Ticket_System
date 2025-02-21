import React, { useState } from 'react';
import api from '../api'; // Correct relative path

function TicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Open');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTicket = { subject, description, status };
      await api.post('/api/tickets', newTicket);
      alert('Ticket created successfully!');
      setSubject('');
      setDescription('');
      setStatus('Open');
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Failed to create ticket.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>
      <button type="submit">Create Ticket</button>
    </form>
  );
}

export default TicketForm;
