import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom'; 
import { BASEURL } from '../hooks/UseUsers';
import { useNavigate } from 'react-router-dom'; 
import { errorFromServer, successFromServer } from '../utils/toast';
import axios from 'axios';


const NumberInputForm: React.FC = () => {

  const { email } = useParams<{ email: string }>();
  const [values, setValues] = useState<string[]>(Array(6).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [loadind, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // Check if the input is a digit only
    if (/^\d*$/.test(value)) {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      // Move to the next field after filling
      if (value && index < values.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && index > 0 && !values[index]) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const otp = values.join('');
      const response = await axios.post(`${BASEURL}verifyOTP`, { otp, email }, { withCredentials: true });
      if (response.data.isSuccessful) {
        successFromServer(response.data.displayMessage);
        navigate('/users');
      }
    } catch (err){
      errorFromServer("Error in verify OTP");
    }


  };

  const handleResend = async () => {
    try {
      const response = await axios.post(`${BASEURL}otpService`, { email }, { withCredentials: true }); 
      if (response.data.isSuccessful) {
        navigate(`/otp/${email}`); 
      }
    } catch (err) {
      errorFromServer("Failed to send code. Please try again")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100"> 
      <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-4">One-time code Verification</h1>
          <p className="text-[15px] text-slate-500">
            Please enter the 6-digit verification code sent to your Email.
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-3 mb-12">
            {values.map((value, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                value={value}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                maxLength={1}
                type="text"
              />
            ))}
          </div>

          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 transition-colors duration-150"
            >
             {loadind ? 'Sending...':'Send code'}
            </button>
          </div>
        </form>

        <div className="text-sm text-slate-500 mt-4">
          Didn't receive a code?{' '}
          <button
            className="font-medium text-indigo-500 hover:text-indigo-600"
            onClick={handleResend}
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumberInputForm;
