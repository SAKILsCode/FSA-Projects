import PropTypes from 'prop-types';
import React from 'react';
import { Button, Input, ListGroup, ListGroupItem } from 'reactstrap';

const ListItem = ({ todo, toggleSelect, toggleComplete }) => {
  return (
    <ListGroupItem className="d-flex align-item-center">
      <Input
        className="my-4"
        type="checkbox"
        id={todo.id}
        checked={todo.isSelect}
        onChange={() => toggleSelect(todo.id)}
      />
      <div className="mx-3">
        <h4>{todo.text}</h4>
        <p>{todo.time.toDateString()}</p>
      </div>
      <Button
        className="position-absolute end-0 m-3"
        color={todo.isComplete ? 'danger' : 'success'}
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.isComplete ? 'Complete' : 'Running'}
      </Button>
    </ListGroupItem>
  );
};

ListItem.propTypes = {
  todo: PropTypes.object.isRequired,
  toggleSelect: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
};

const ListView = ({ todos, toggleSelect, toggleComplete }) => (
  <ListGroup>
    {todos.map((todo) => (
      <ListItem
        key={todo.id}
        todo={todo}
        toggleSelect={toggleSelect}
        toggleComplete={toggleComplete}
      />
    ))}
  </ListGroup>
);

ListView.propTypes = {
  todos: PropTypes.object.isRequired,
  toggleSelect: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
};

export default ListView;
