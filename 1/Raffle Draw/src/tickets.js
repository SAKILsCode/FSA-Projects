const Ticket = require('./Ticket');
const { readFile, writeFile } = require('./utils');

const tickets = Symbol('tickets');

class TicketCollection {
  constructor() {
    (async function () {
      this[tickets] = await readFile();
    }.call(this));
  }

  /**
   * Create and save a new ticket
   * @param {string} username
   * @param {number} price
   * @returns {Ticket}
   */
  create(username, price) {
    const ticket = new Ticket(username, price);
    this[tickets].push(ticket);
    writeFile(this[tickets]);
    return ticket;
  }

  /**
   * Create multiple tickets for a single user
   * @param {string} username
   * @param {number} price
   * @param {number} quantity
   * @returns {Ticket[]}
   */
  bulkCreate(username, price, quantity) {
    const result = [];
    for (let i = 0; i < quantity; i++) {
      const ticket = this.create(username, price);
      result.push(ticket);
    }
    writeFile(this[tickets]);
    return result;
  }

  /**
   * Return all available tickets from db
   */
  find() {
    return this[tickets];
  }

  /**
   * Find single ticket by id
   * @param {string} ticketId
   * @returns {Ticket}
   */
  findById(ticketId) {
    return this[tickets].find(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => ticket.id === ticketId
    );
  }

  /**
   * Find tickets by username
   * @param {string} username
   * @returns {Ticket[]}
   */
  findByUsername(username) {
    return this[tickets].filter(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => ticket.username === username
    );
  }

  /**
   * Update ticket by id.
   * @param {string} ticketId
   * @param {{username: string, price: number}} ticketBody
   * @returns {Ticket}
   */
  updateById(ticketId, ticketBody) {
    const ticket = this.findById(ticketId);
    if (ticket) {
      ticket.username = ticketBody.username ?? ticket.username;
      ticket.price = ticketBody.price ?? ticket.price;
      ticket.updatedAt = new Date();
    }
    writeFile(this[tickets]);
    return ticket;
  }

  /**
   * Update ticket by username.
   * @param {string} username
   * @param {{username: string, price: number}} ticketBody
   * @returns {Ticket[]}
   */
  bulkUpdate(username, ticketBody) {
    const userTickets = this.findByUsername(username);

    // Returns Updated Tickets
    const updatedTickets = userTickets.map(
      /**
       * @param {Ticket} ticket
       * @returns {Ticket}
       */
      (ticket) => this.updateById(ticket.id, ticketBody)
    );
    writeFile(this[tickets]);
    return updatedTickets;
  }

  /**
   * Delete ticket from DB by id
   * @param {string} ticketId
   * @returns {boolean}
   */
  deleteById(id) {
    const index = this[tickets].findIndex(
      /**
       * @param {Ticket} ticket
       * @returns {Ticket}
       */
      (ticket) => ticket.id === id
    );

    if (index === -1) return false;
    this[tickets].splice(index, 1);
    writeFile(this[tickets]);
    return true;
  }


  // INCOMPLETE - Weird modification of db.json file.
  /**
   * Bulk Delete by username
   * @param {string} username
   * @returns {boolean}
   */
  bulkDelete(username) {
    const userTickets = this.findByUsername(username);
    if (userTickets.length <= 0) return false;

    const deletedResult = userTickets.map(
      /**
       * @param {Ticket} ticket
       * @returns {boolean}
       */
      (ticket) => this.deleteById(ticket.id)
    );
    return deletedResult.every((res) => res === true);
  }



  /**
   * Raffle draw and find winners
   * @param {number} winnerCount
   * @returns {Ticket}
   */
  draw(winnerCount) {
    const winnerIndexes = new Array(winnerCount);

    let winnerIndex = 0;
    while (winnerIndex < winnerCount) {
      let ticketIndex = Math.floor(Math.random() * this[tickets].length);

      if (!winnerIndexes.includes(ticketIndex)) {
        winnerIndexes[winnerIndex++] = ticketIndex;
      }
    }

    // Returns array of winner tickets
    return winnerIndexes.map((ticketIndex) => this[tickets][ticketIndex]);
  }
}

const ticketCollection = new TicketCollection();
module.exports = ticketCollection;
