import React, { useState } from 'react';
import './Encryptpage.css';

const generateRandomPassword = (length = 16) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
};

function Encryptpage() {
  const [text, setText] = useState('');
  const [algorithm, setAlgorithm] = useState('');
  const [cipherText, setCipherText] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value);
  };

  const handleEncrypt = async () => {
    const password = generateRandomPassword();
    setGeneratedPassword(password);

    try {
      switch (algorithm) {
        case 'AES':
          const encrypted = await encryptAES(text, password);
          setCipherText(encrypted);
          break;
        default:
          alert('Selected algorithm is not implemented.');
      }
      setShowPopup(true);
    } catch (error) {
      console.error('Encryption failed:', error);
      alert('Error during encryption.');
    }
  };

  const encryptAES = async (text, password) => {
    const encoder = new TextEncoder();
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    const key = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );

    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      key,
      encoder.encode(text)
    );

    const combined = new Uint8Array([...salt, ...iv, ...new Uint8Array(encrypted)]);
    return btoa(String.fromCharCode(...combined));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEncrypt();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cipherText);
    alert('Cipher text copied to clipboard!');
  };

  return (
    <div className='Encrypt-page'>
      <img src="assets/text2.png" alt="Encryption" />
      <p className='text-content'>
        Encryption is the process of converting plain text into a coded format, called ciphertext, to prevent unauthorized access.
      </p>
      <form className='encryption-form' onSubmit={handleSubmit}>
        <input
          type='text'
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text to encrypt"
          className='text-input'
        />

        <select value={algorithm} onChange={handleAlgorithmChange} className='algorithm-select'>
          <option value="">Select Algorithm</option>
          <option value="AES">AES256</option>
        </select>
        <button type="submit" className='submit-button'>Encrypt</button>
      </form>

      {showPopup && (
        <div className='popup'>
          <h3>Encryption Result</h3>
          <p><strong>Generated Password:</strong> {generatedPassword}</p>
          <p><strong>Cipher Text:</strong></p>
          <textarea readOnly value={cipherText} rows="4" className='cipher-text'></textarea>
          <button onClick={handleCopy} className='copy-button'>Copy Cipher Text</button>
          <button onClick={() => setShowPopup(false)} className='close-button'>Close</button>
        </div>
      )}
    </div>
  );
}

export default Encryptpage;
