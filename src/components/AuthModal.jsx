import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./AuthModal.css";

const AuthModal = ({ isOpen, onClose }) => {
  const { loginWithGoogle, loginWithPhone, verifyOTP } = useAuth();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [intendedRole, setIntendedRole] = useState('student');

  if (!isOpen) return null;

  const handleGoogle = async () => {
    try {
      await loginWithGoogle(intendedRole);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Login Failed: " + (err.message || "Unknown error"));
    }
  };

  const handlePhone = async () => {
    try {
      const result = await loginWithPhone(phone);
      setConfirmation(result);
      alert("OTP sent to " + phone);
    } catch (err) {
      alert("Phone Auth Failed: " + err.message);
    }
  };

  const handleOTP = async () => {
    try {
      await verifyOTP(confirmation, otp, intendedRole);
      onClose();
    } catch (err) {
      alert("OTP Verification Failed: " + err.message);
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal">

        <h2>Join HustleHub</h2>
        <p className="text-secondary text-center mb-4">Choose your side</p>

        <div className="role-toggle mb-4">
          <button
            className={intendedRole === 'student' ? 'active' : ''}
            onClick={() => setIntendedRole('student')}
          >
            🎓 Student
          </button>
          <button
            className={intendedRole === 'client' ? 'active' : ''}
            onClick={() => setIntendedRole('client')}
          >
            💼 Client
          </button>
        </div>

        <button onClick={handleGoogle} className="btn-primary full-width mb-3">
          Continue with Google
        </button>

        <div className="divider"><span>OR</span></div>

        {!confirmation ? (
          <div className="phone-auth">
            <input
              placeholder="+91XXXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mb-2"
            />
            <button onClick={handlePhone} className="btn-secondary full-width">Send OTP</button>
          </div>
        ) : (
          <div className="phone-auth">
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mb-2"
            />
            <button onClick={handleOTP} className="btn-primary full-width">Verify OTP</button>
          </div>
        )}

        <div id="recaptcha-container"></div>
        <button className="auth-close" onClick={onClose} style={{ margin: '0', padding: '0', background: 'none', border: 'none', position: 'absolute', top: '20px', right: '20px', cursor: 'pointer', color: 'white', fontSize: '1.5rem' }}>×</button>
      </div>
    </div>
  );
};

export default AuthModal;
