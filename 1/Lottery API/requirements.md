# Lottery API

- sell lottery ticket
- update lottery ticket
- delete lottery ticket
- get all tickets
- get ticket by id
- bulk buy (users can buy multiple tickets at a time)
- raffle draw


Ticket:
 - number (unique)
 - username
 - price
 - timestamp

Routes:
 - /ticket/t/:ticketId GET find single ticket
 - /ticket/t/:ticketId PATCH update ticket by id
 - /ticket/t/:ticketId DELETE delete ticket by id
 - /ticket/u/:username GET find ticket for a given user
 - /ticket/u/:username PATCH update ticket for a given user
 - /ticket/u/:username DELETE delete all ticket for a given user
 - /tickets/bulk - bulk sell tickets
 - /tickets/sell - create ticket
 - /tickets/draw
 - /ticket - find all tickets