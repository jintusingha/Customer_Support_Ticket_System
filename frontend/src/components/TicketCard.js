import React from 'react';

function TicketCard({ ticket, onDelete, onStatusChange }) {
  const handleStatusChange = (e) => {
    const updatedStatus = e.target.value;
    onStatusChange(ticket.id, updatedStatus);
  };

  return (
    <div className="ticket-card">
      <h3>{ticket.subject}</h3>
      <p>{ticket.description}</p>
      <select value={ticket.status} onChange={handleStatusChange}>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>
      <button onClick={() => onDelete(ticket.id)}>Delete</button>
    </div>
  );
}

export default TicketCard;
