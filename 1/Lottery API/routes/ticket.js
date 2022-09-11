const router = require('express').Router();
const db = require('../db/db');

// Finding a single ticket by id
router.get('/t/:ticketId', (req, res) => {
  const ticketId = req.params.ticketId;
  const ticket = db.findById(ticketId);
  res.status(200).json(ticket);
});

// Updating a single ticket by id
router.patch('/t/:ticketId', (req, res) => {
  const ticketId = req.params.ticketId;
  const updatedTicket = db.updateById(ticketId, req.body);
  res.status(200).json({ message: 'Updated Successfully', updatedTicket });
});

// Update all tickets by username
router.patch('/u/:username', (req, res) => {
  const username = req.params.username;
  const updatedTickets = db.updateByUsername(username, req.body);
  res.status(200).json({ message: 'Updated Successfully', updatedTickets });
});

// Delete a ticket by id
router.delete('/t/:ticketId', (req, res) => {
  const ticketId = req.params.ticketId;
  db.deleteById(ticketId);
  res.status(203).send();
});

// Delete all tickets for a given user
router.delete('/u/:username', (req, res) => {
  const username = req.params.username;
  db.deleteByUsername(username);
  res.status(203).send();
});

// Finding tickets by username
router.get('/u/:username', (req, res) => {
  const username = req.params.username;
  const tickets = db.findByUsername(username);
  res.status(200).json(tickets);
});

// Create a single ticket
router.post('/sell', (req, res) => {
  const { username, price } = req.body;
  const ticket = db.create(username, price);
  res.status(201).json({ message: 'Ticket Created Successfully', ticket });
});

// Crate multiple tickets for a given user
router.post('/bulk', (req, res) => {
  const { username, price, quantity } = req.body;
  const tickets = db.bulkCreate(username, price, quantity);
  res.status(201).json({ message: 'Ticket Created Successfully', tickets });
});

// Raffle Draw
router.get('/draw', (req, res) => {
  const winnerCount = req.query.wc ?? 3;
  const winners = db.draw(winnerCount);
  res.status(200).json(winners);
});

// Get all tickets
router.get('', (_req, res) => {
  const tickets = db.find();
  res.status(200).json(tickets);
});

module.exports = router;
