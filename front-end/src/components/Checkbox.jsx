import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Checkbox extends Component {
  render() {
    const { id, dataId, onChange, isChecked } = this.props;
    return (
      <div className="form-check">
        <label className="form-check-label" htmlFor={ id }>
          Favorita
          <input
            className="form-check-input"
            data-testid={ dataId }
            name="flexCheckDefault"
            type="checkbox"
            id={ id }
            onChange={ onChange }
            checked={ isChecked }
          />
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  id: propTypes.number.isRequired,
  dataId: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  isChecked: propTypes.bool.isRequired,
};
