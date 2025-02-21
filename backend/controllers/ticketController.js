const Ticket = require('../models/ticketModel');


exports.getAllTickets = (req, res) => {
    Ticket.getAll((err, results) => {
        if (err) {
            res.status(500).send({ error: "Failed to fetch tickets", details: err });
        } else {
            res.json(results);
        }
    });
};


exports.getTicketById = (req, res) => {
    Ticket.getById(req.params.id, (err, results) => {
        if (err) {
            res.status(500).send({ error: "Failed to fetch ticket", details: err });
        } else if (results.length === 0) {
            res.status(404).send({ error: "Ticket not found" });
        } else {
            res.json(results[0]);
        }
    });
};


exports.createTicket = (req, res) => {
    const { subject, description, status = "Open" } = req.body; 
    const ticket = { subject, description, status };

    Ticket.create(ticket, (err, results) => {
        if (err) {
            res.status(500).send({ error: "Failed to create ticket", details: err });
        } else {
            res.status(201).send({ id: results.insertId, ...ticket });
        }
    });
};


exports.updateTicket = (req, res) => {
    const { subject, description, status } = req.body;
    console.log("Updating ticket:", { subject, description, status }); // Debugging
    const ticket = { subject, description, status };

    Ticket.update(req.params.id, ticket, (err, results) => {
        if (err) {
            console.error("Error updating ticket:", err); // Debugging
            res.status(500).send({ error: "Failed to update ticket", details: err });
        } else if (results.affectedRows === 0) {
            console.warn("No ticket found to update"); // Debugging
            res.status(404).send({ error: "Ticket not found" });
        } else {
            console.log("Ticket updated successfully!"); // Debugging
            res.send({ message: "Ticket updated successfully!", ticket });
        }
    });
};



exports.deleteTicket = (req, res) => {
    Ticket.delete(req.params.id, (err, results) => {
        if (err) {
            res.status(500).send({ error: "Failed to delete ticket", details: err });
        } else if (results.affectedRows === 0) {
            res.status(404).send({ error: "Ticket not found" });
        } else {
            res.send({ message: "Ticket deleted successfully!" });
        }
    });
};
