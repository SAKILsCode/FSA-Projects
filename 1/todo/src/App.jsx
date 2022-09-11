import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Todos from './components/todos';

function App() {
  return (
    <Container className="my-3">
      <Row>
        <Col>
          <Todos />
        </Col>
      </Row>
    </Container>
  );
}

export default App;