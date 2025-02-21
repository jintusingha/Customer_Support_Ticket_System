const db = require('../config/db');

const Ticket = {
    getAll: (callback) => {
        db.query('SELECT * FROM tickets', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM tickets WHERE id = ?', [id], callback);
    },
    create: (ticket, callback) => {
        const { subject, description, status } = ticket;
        db.query('INSERT INTO tickets (subject, description, status) VALUES (?, ?, ?)', [subject, description, status], callback);
    },
    update: (id, ticket, callback) => {
        const { subject, description, status } = ticket;
        db.query('UPDATE tickets SET subject = ?, description = ?, status = ? WHERE id = ?', [subject, description, status, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM tickets WHERE id = ?', [id], callback);
    },
};

module.exports = Ticket;
