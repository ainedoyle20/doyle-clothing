import React from 'react';

interface AuthTogglesProps {
  showLogin: boolean;
  setShowLogin(arg: boolean): void;
}

const AuthToggles: React.FC<AuthTogglesProps> = ({ showLogin, setShowLogin }) => {
  return (
    <div className='w-[260px] flex cursor-pointer border-2 border-black'>
      <div 
        className={`w-1/2 px-3 py-1 flex justify-center items-center border-r-2 border-black ${showLogin ? "bg-[#000000] text-[#ffffff]" : "bg=[#ffffff] text-[#000000]"}`}
        onClick={() => setShowLogin(true)}
      >
        <span>Login</span>
      </div>

      <div 
        className={`w-1/2 px-3 py-1 flex justify-center items-center ${!showLogin ? "bg-[#000000] text-[#ffffff]" : "bg=[#ffffff] text-[#000000]"}`}
        onClick={() => setShowLogin(false)}
      >
        <span>Register</span>
      </div>
    </div>
  );
}

export default AuthToggles;
