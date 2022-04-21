import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { children, id, isDisabled } = this.props;
    return (
      <button
        data-testid={ id }
        type="submit"
        className="btn btn-primary btn-lg"
        disabled={ isDisabled }
      >
        { children }
      </button>
    );
  }
}

Button.propTypes = {
  children: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  isDisabled: propTypes.bool.isRequired,
};
