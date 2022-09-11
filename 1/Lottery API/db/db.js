const Ticket = require('../models/Ticket');

class MyDB {
  constructor() {
    this.tickets = [];
  }

  /**
   * Create and save a new ticket
   * @param {string} username
   * @param {number} price
   * @returns {Ticket} return a ticket object
   */
  create(username, price) {
    const ticket = new Ticket(username, price);
    this.tickets.push(ticket);
    return ticket;
  }

  /**
   * Create multiple tickets for a single user
   * @param {string} username
   * @param {number} price
   * @param {number} quantity
   * @returns {Array<Ticket>} return an array of ticket objects
   */
  bulkCreate(username, price, quantity) {
    const result = [];
    for (let i = 0; i < quantity; i++) {
      const ticket = this.create(username, price);
      result.push(ticket);
    }
    return result;
  }

  /**
   * Return all available tickets
   */
  find() {
    return this.tickets;
  }

  /**
   * Find ticket by ticket id
   * @param {string} ticketId
   * @returns {Ticket}
   */
  findById(ticketId) {
    return this.tickets.find(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => ticket.id === ticketId
    );
  }

  /**
   * Find ticket by ticket username
   * @param {string} username
   * @returns {Array<Ticket>}
   */
  findByUsername(username) {
    return this.tickets.filter(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => ticket.username === username
    );
  }

  /**
   * Update ticket info by id.
   * As the whole system is running over an object and also we are not destructuring anything, so the operations are mutable (Modify the original object)
   * @param {string} ticketId
   * @param {{username: string, price: number}} ticketBody
   * @returns {Ticket}
   */
  updateById(ticketId, ticketBody) {
    const ticket = this.findById(ticketId);
    ticket.username = ticketBody.username ?? ticket.username;
    ticket.price = ticketBody.price ?? ticket.price;
    ticket.updatedAt = new Date();

    return ticket;
  }

  /**
   * Update infos of all tickets by username
   * @param {string} username
   * @param {{username: string, price: number}} ticketBody
   * @returns {Array<Ticket>}
   */
  updateByUsername(username, ticketBody) {
    let index = 0;
    let updatedTickets = [];

    while (index < this.tickets.length) {
      const ticket = this.tickets[index];
      if (ticket.username !== username) continue;

      ticket.username = ticketBody.username ?? ticket.username;
      ticket.price = ticketBody.price ?? ticket.price;
      ticket.updatedAt = new Date();

      updatedTickets.push(ticket);
      index++;
    }
    return updatedTickets;
  }

  /**
   * Delete ticket from DB by id
   * @param {string} ticketId
   * @returns {boolean}
   */
  deleteById(ticketId) {
    const index = this.tickets.findIndex((ticket) => ticket.id === ticketId);

    if (index !== -1) {
      this.tickets.splice(index, 1);
      return true;
    } else return false;
  }

  /**
   * Delete all ticket from DB by username
   * @param {string} username\
   * @returns {boolean}
   */
  deleteByUsername(username) {
    let index = 0;
    while (index < this.tickets.length) {
      if (this.tickets[index].username !== username) {
        if (index === this.tickets.length - 1) return false;
        continue;
      }

      // this will always decrease one element of the "this.tickets" array
      this.tickets.splice(index, 1);
    }
    return true;
  }

  /**
   * Find Winner
   * @param {number} winnerCount
   * @returns {Array<Ticket>}
   */
  draw(winnerCount) {
    let winnerIndexes = new Array(winnerCount);

    let index = 0;
    while (index < winnerCount) {
      let randomIndex = Math.floor(Math.random() * this.tickets.length);

      if (!winnerIndexes.includes(randomIndex)) {
        winnerIndexes[index++] = randomIndex;
      }
    }

    // winners [array of Tickets]
    return winnerIndexes.map((ticketIndex) => this.tickets[ticketIndex]);
  }
}

const myDB = new MyDB();
module.exports = myDB;
