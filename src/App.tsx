import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AuthService from './services/auth.service';
import Login from './components/login.component';
import Register from './components/register.component';
import Profile from './components/profile.component';
import { useAuth } from './AuthContext';
import { User } from './types/userType.type';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentUser, setCurrentUser] = useState<User>({
    id: null,
    name: '',
    username: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      AuthService.getCurrentUser()
        .then((userData: any) => {
          if (userData) {
            setCurrentUser(userData);
          }
        });
    }
  }, [isAuthenticated]);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser({
      id: null,
      name: '',
      username: '',
    });
  };


  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Auth-App
        </Link>

        {currentUser && currentUser.username ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser?.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
