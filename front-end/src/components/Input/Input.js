import React from 'react';
import PropTypes from 'prop-types';

export default function Input({ id, onChangeInput, placeholder, type, name, value }) {
  return (
    <label htmlFor={ id }>
      <input
        id={ id }
        type={ type }
        name={ name }
        value={ value }
        className="form-control"
        placeholder={ placeholder }
        aria-label="Username"
        aria-describedby="basic-addon1"
        onChange={ onChangeInput }
      />
    </label>
  );
}

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeInput: PropTypes.func,
};

Input.defaultProps = {
  id: '',
  name: '',
  value: '',
  type: 'text',
  placeholder: '',
  onChangeInput: () => {},
};
