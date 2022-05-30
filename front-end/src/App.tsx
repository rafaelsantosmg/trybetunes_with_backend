import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';
import UserProvider from './context/UserProvider';
import './App.css';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
