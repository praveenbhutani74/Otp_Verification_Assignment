import React, { useState } from 'react';
import PhoneVerificationModel from './PhoneVerificationModel';
import './PhoneVerification.css';
const PhoneVerification = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="App">
        <h1>OTP Verification</h1>
        <button
          className="openModalBtn"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Enter OTP
        </button>

        {modalOpen && <PhoneVerificationModel setOpenModal={setModalOpen} />}
      </div>
    </>
  );
};

export default PhoneVerification;
