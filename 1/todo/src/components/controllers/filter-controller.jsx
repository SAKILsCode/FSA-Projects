import PropTypes from 'prop-types';
import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

const FilterController = ({ handleFilter, filter }) => (
  <ButtonGroup>
    <Button
      color={filter === 'all' ? 'light' : 'secondary'}
      onClick={() => handleFilter('all')}
    >
      All
    </Button>
    <Button color={filter === 'running' ? 'light' : 'secondary'} onClick={() => handleFilter('running')}>Running</Button>
    <Button color={filter === 'completed' ? 'light' : 'secondary'} onClick={() => handleFilter('completed')}>Completed</Button>
  </ButtonGroup>
);

FilterController.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default FilterController;
