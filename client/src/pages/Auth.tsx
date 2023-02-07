import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserStore } from '../store/userStore';

import AuthToggles from '../components/auth/AuthToggles';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const Auth = () => {
  const user = useUserStore(state => state.userProfile);

  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className='w-screen h-screen flex flex-col gap-8 items-center justify-center'>
      {/*  Login / Register toggles */}
      <AuthToggles 
        showLogin={showLogin}
        setShowLogin={setShowLogin}
      />

      {/*  Login / Register form */}
      {showLogin ? (
        <Login />
      ) : (
        <Register />
      )}
    </div>
  );
}

export default Auth;
