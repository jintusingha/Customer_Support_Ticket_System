const Ticket = require('../models/ticketModel');

exports.getAllTickets = (req, res) => {
    Ticket.getAll((err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
};

exports.getTicketById = (req, res) => {
    Ticket.getById(req.params.id, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results[0]);
    });
};

exports.createTicket = (req, res) => {
    const ticket = req.body;
    Ticket.create(ticket, (err, results) => {
        if (err) res.status(500).send(err);
        else res.status(201).send({ id: results.insertId });
    });
};

exports.updateTicket = (req, res) => {
    const ticket = req.body;
    Ticket.update(req.params.id, ticket, (err, results) => {
        if (err) res.status(500).send(err);
        else res.send({ message: 'Ticket updated successfully!' });
    });
};

exports.deleteTicket = (req, res) => {
    Ticket.delete(req.params.id, (err, results) => {
        if (err) res.status(500).send(err);
        else res.send({ message: 'Ticket deleted successfully!' });
    });
};
