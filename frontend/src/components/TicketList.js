import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import api from "../api";
import TicketCard from "./TicketCard";

function TicketList() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const response = await api.get("/api/tickets");
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/tickets/${id}`);
      toast.success("Ticket deleted successfully!");
      fetchTickets();
    } catch (error) {
      console.error("Error deleting ticket:", error);
      toast.error("Failed to delete the ticket."); 
    }
  };

  const handleStatusChange = async (id, updatedStatus) => {
    try {
      const ticket = tickets.find((ticket) => ticket.id === id);
      await api.put(`/api/tickets/${id}`, { ...ticket, status: updatedStatus });
      setTickets((prevTickets) =>
        prevTickets.map((t) =>
          t.id === id ? { ...t, status: updatedStatus } : t
        )
      );
      toast.success(`Status changed to "${updatedStatus}"!`); 
    } catch (error) {
      console.error("Error updating ticket status:", error);
      toast.error("Failed to update ticket status."); 
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="ticket-list">
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      ))}

     
      <ToastContainer
        position="top-right"
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default TicketList;
