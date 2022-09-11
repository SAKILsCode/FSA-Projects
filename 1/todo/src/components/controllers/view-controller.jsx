import PropTypes from 'prop-types';
import React from 'react';
import { Input, Label } from 'reactstrap';

const ViewController = ({ view, changeView }) => (
  <div className="d-flex">
    <Label for="list-view" className="m-1">
      <Input
        type="radio"
        name="view"
        value="list"
        id="list-view"
        onChange={changeView}
        className="d-inline-block mx-1"
        checked={view === 'list'}
      />
      List View
    </Label>
    <Label for="table-view" className="m-1">
      <Input
        type="radio"
        name="view"
        value="table"
        id="table-view"
        onChange={changeView}
        className="d-inline-block mx-1"
        checked={view === 'table'}
      />
      Table View
    </Label>
  </div>
);

ViewController.propTypes = {
  view: PropTypes.string.isRequired,
  changeView: PropTypes.func.isRequired,
};

export default ViewController;
