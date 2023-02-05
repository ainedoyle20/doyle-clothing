import { useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";

const Register = () => {
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    setRegisterInfo({
      email: "",
      password: "",
      confirmPassword: ""
    });
  }

  return (
    <div className="flex flex-col justify-center gap-8 w-[300px] h-[350px] border-2 border-black px-3">

      {/*  Email  */}
      <div className="w-full border-2 border-black flex items-center gap-2 px-2 py-1">
        <span className="h-full flex justify-center items-center text-xl">
          <TfiEmail />
        </span>
        
        <input
          className="w-full text-lg outline-none text-black"
          type="email"
          value={registerInfo.email}
          onChange={(e) => setRegisterInfo({ ...registerInfo, email: e.target.value })}
          placeholder="Email"
          required
        />
      </div>

      {/*  Password  */}
      <div className="w-full border-2 border-black flex items-center gap-2 px-2 py-1">
        <span className="h-full flex justify-center items-center text-xl">
          <RiLockPasswordLine />
        </span>
        
        <input
          className="w-full text-lg outline-none text-black"
          type="password"
          value={registerInfo.password}
          onChange={(e) => setRegisterInfo({ ...registerInfo, password: e.target.value })}
          placeholder="Password"
          required
        />
      </div>

      {/*  Confirm Password  */}
      <div className="w-full border-2 border-black flex items-center gap-2 px-2 py-1">
        <span className="h-full flex justify-center items-center text-xl">
          <RiLockPasswordLine />
        </span>
        
        <input
          className="w-full text-lg outline-none text-black"
          type="password"
          value={registerInfo.confirmPassword}
          onChange={(e) => setRegisterInfo({ ...registerInfo, confirmPassword: e.target.value })}
          placeholder="Confirm Password"
          required
        />
      </div>


      <button type="button" onClick={(e) => handleSubmit(e)} 
        className="w-full bg-[#000000] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#000000] text-lg px-2 py-1"
      >
        Register
      </button>
    </div>
  );
}

export default Register;
