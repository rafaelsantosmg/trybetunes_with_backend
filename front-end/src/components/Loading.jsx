import React, { Component } from 'react';
import './Loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <h1 className="loading-title">
          Carregando...
        </h1>
      </div>
    );
  }
}
