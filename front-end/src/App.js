import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';
import './App.css';
import UserProvider from './context/UserProvider';

class App extends React.Component {
  render() {
    return (
      <UserProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </UserProvider>
    );
  }
}

export default App;
