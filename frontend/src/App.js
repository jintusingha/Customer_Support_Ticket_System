import React from 'react';
import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm';

function App() {
  return (
    <div className="app-container">
      <h1>Customer Support Ticket System</h1>
      <TicketForm />
      <TicketList />
    </div>
  );
}

export default App;
