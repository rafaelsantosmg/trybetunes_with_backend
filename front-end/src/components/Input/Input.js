import React from 'react';
import propTypes from 'prop-types';

export default function Input() {
    const { id, onChangeInput, placeholder, type, name, value } = this.props;
    return (
      <input
        data-testid={ id }
        type={ type }
        name={ name }
        value={ value }
        className="form-control"
        placeholder={ placeholder }
        aria-label="Username"
        aria-describedby="basic-addon1"
        onChange={ onChangeInput }
      />
    );
}

Input.propTypes = {
  id: propTypes.string,
  name: propTypes.string,
  value: propTypes.string,
  type: propTypes.string,
  placeholder: propTypes.string,
  onChangeInput: propTypes.func,
};

Input.defaultProps = {
  id: '',
  name: '',
  value: '',
  type: 'text',
  placeholder: '',
  onChangeInput: () => {},
};
