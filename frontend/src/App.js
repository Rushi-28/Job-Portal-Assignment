import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import NotAuthorizedPage from './components/NotAuthorizedPage';

const isAuthenticated = () => !!localStorage.getItem('token');

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/not-authorized" element={<NotAuthorizedPage />} />
      <Route
        path="/"
        element={
          isAuthenticated() ? <Home /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}

export default App;