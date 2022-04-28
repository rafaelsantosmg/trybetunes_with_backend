import React from 'react';
import propTypes from 'prop-types';

export default function Button({ children, id, isDisabled }) {
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

Button.propTypes = {
  children: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  isDisabled: propTypes.bool.isRequired,
};
