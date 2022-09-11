const ticketCollection = require('./tickets');

// Ticket selling controllers
exports.sellSingleTicket = (req, res) => {
  const { username, price } = req.body;
  const ticket = ticketCollection.create(username, price);
  res.status(201).json({ message: 'Ticket Created Successfully', ticket });
};

exports.sellBulkTicket = (req, res) => {
  const { username, price, quantity } = req.body;
  const tickets = ticketCollection.bulkCreate(username, price, quantity);
  res.status(201).json({ message: 'Tickets Created Successfully', tickets });
};

// Find tickets controllers
exports.findAll = (_req, res) => {
  const tickets = ticketCollection.find();
  res.status(200).json({ item: tickets, total: tickets.length });
};

exports.findById = (req, res) => {
  const id = req.params.id;
  const ticket = ticketCollection.findById(id);
  if (!ticket) {
    return res.status(404).json({ message: '404 not found' });
  }
  res.status(200).json(ticket);
};

exports.findByUsername = (req, res) => {
  const username = req.params.username;
  const tickets = ticketCollection.findByUsername(username);
  if (!tickets) {
    return res.status(404).json({ message: '404 not found' });
  }
  res.status(200).json({ item: tickets, total: tickets.length });
};

// Update controllers
exports.updateById = (req, res) => {
  const id = req.params.id;
  const ticket = ticketCollection.updateById(id, req.body);

  if (!ticket) {
    return res.status(404).json({ message: '404 not found' });
  }
  res.status(200).json(ticket);
};

exports.updateByUsername = (req, res) => {
  const username = req.params.username;
  const tickets = ticketCollection.updateByUsername(username, req.body);
  res.status(200).json({ item: tickets, total: tickets.length });
};

// Delete controllers
exports.deleteById = (req, res) => {
  const id = req.params.id;
  const isDeleted = ticketCollection.deleteById(id);

  if (isDeleted) {
    return res.status(204).send();
  }

  res.status(400).json({ message: 'Delete operation failed' });
};

exports.deleteByUsername = (req, res) => {
  const username = req.params.username;
  const isDeleted = ticketCollection.bulkDelete(username);

  if (isDeleted) {
    return res.status(204).send();
  }
  res.status(400).json({ message: 'Delete operation failed' });
};

// Draw controller
exports.drawWinners = (req, res) => {
  const winnerCount = req.query.wc ?? 1;
  const winners = ticketCollection.draw(winnerCount);
  res.status(200).json(winners);
}