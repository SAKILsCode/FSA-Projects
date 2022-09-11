import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row } from 'reactstrap';
import BulkController from './bulk-controller';
import FilterController from './filter-controller';
import SearchPanel from './search-panel';
import ViewController from './view-controller';

const Controller = ({
  term,
  view,
  filter,
  changeView,
  handleSearch,
  toggleForm,
  handleFilter,
  clearSelected,
  clearCompleted,
  reset,
}) => (
  <div>
    <SearchPanel
      term={term}
      handleSearch={handleSearch}
      toggleForm={toggleForm}
    />

    <Row className="my-4">
      <Col md={{ size: 4 }}>
        <FilterController handleFilter={handleFilter} filter={filter} />
      </Col>

      <Col md={{ size: 4 }}>
        <ViewController view={view} changeView={changeView} />
      </Col>

      <Col md={{ size: 4 }}>
          <BulkController
            clearSelected={clearSelected}
            clearCompleted={clearCompleted}
            reset={reset}
          />
      </Col>
    </Row>
  </div>
);

Controller.propTypes = {
  term: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
  clearSelected: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default Controller;
