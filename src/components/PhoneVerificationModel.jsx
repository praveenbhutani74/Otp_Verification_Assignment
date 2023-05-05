import React, { useState, useRef, useEffect } from 'react';
import './PhoneVerificationModal.css';

function PhoneVerificationModel({ setOpenModal }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  console.log(inputRefs);
  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) {
      return;
    }

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    if (value !== '') {
      if (index === otp.length - 1) {
        inputRefs.current[index].blur();
      } else {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      if (index === 0) {
        return;
      }
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowLeft') {
      if (index === 0) {
        return;
      }
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowRight') {
      if (index === otp.length - 1) {
        return;
      }
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    console.log(e);
    e.preventDefault();
    const clipboardData = e.clipboardData.getData('Text');
    console.log(clipboardData);
    const pastedOTP = clipboardData.slice(0, 6).replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    for (let i = 0; i < pastedOTP.length; i++) {
      newOtp[i] = pastedOTP[i];
    }
    setOtp(newOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            className="closeModal"
          >
            X
          </button>
          <h2>Enter OTP</h2>
          <form onSubmit={handleSubmit}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="otpInput"
              />
            ))}
            <button type="submit" className="submitBtn btn-primary">
              Verify
            </button>
            <small class="info">
              <strong> RESEND</strong>
            </small>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PhoneVerificationModel;
