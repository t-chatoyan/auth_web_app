import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { useAuth } from '../AuthContext';
import { User } from '../types/userType.type';

const Profile: React.FC = () => {
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
          setCurrentUser(userData);
        });
    }
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      {currentUser.id ? (
        <div>
          <header className="jumbotron">
            <h3>
              Hi <strong>{currentUser.name}</strong>  you're logged in.
            </h3>
          </header>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;