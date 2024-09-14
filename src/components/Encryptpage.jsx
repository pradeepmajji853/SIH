import React, { useEffect, useState } from 'react';
import './Encryptpage.css';
import CryptoJS from 'crypto-js';
import forge from 'node-forge';

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
  const iv = CryptoJS.lib.WordArray.random(16); // Random IV
  const aesEncrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(password), {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString();
  setCipherText(aesEncrypted);
  break;

        case 'DES':
          const desEncrypted = CryptoJS.DES.encrypt(text, password).toString();
          setCipherText(desEncrypted);
          break;
        case 'TripleDES':
          const tripleDesEncrypted = CryptoJS.TripleDES.encrypt(text, password).toString();
          setCipherText(tripleDesEncrypted);
          break;
        case 'Blowfish':
          const blowfishEncrypted = forge.cipher.createCipher('Blowfish', password);
          blowfishEncrypted.start();
          blowfishEncrypted.update(forge.util.createBuffer(text));
          blowfishEncrypted.finish();
          setCipherText(forge.util.encode64(blowfishEncrypted.output.getBytes()));
          break;
        case 'ChaCha20':
          // Implement ChaCha20 encryption
          alert('ChaCha20 not implemented yet');
          break;
        case 'RSA':
          // Implement RSA encryption
          alert('RSA encryption not implemented yet');
          break;
        case 'RC4':
          const rc4Encrypted = CryptoJS.RC4.encrypt(text, password).toString();
          setCipherText(rc4Encrypted);
          break;
        case 'Camellia':
          // Implement Camellia encryption
          alert('Camellia not implemented yet');
          break;
        case 'Serpent':
          // Implement Serpent encryption
          alert('Serpent not implemented yet');
          break;
        case 'ElGamal':
          // Implement ElGamal encryption
          alert('ElGamal not implemented yet');
          break;
        case 'ECC':
          // Implement ECC encryption
          alert('ECC not implemented yet');
          break;
        case 'GOST':
          // Implement GOST encryption
          alert('GOST not implemented yet');
          break;
        default:
          alert('Selected algorithm is not implemented.');
      }
      setShowPopup(true);
    } catch (error) {
      console.error('Encryption failed:', error);
      alert('Error during encryption: ' + error.message);
    }
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
          <option value="DES">DES</option>
          <option value="TripleDES">Triple DES</option>
          <option value="Blowfish">Blowfish</option>
          <option value="ChaCha20">ChaCha20</option>
          <option value="RSA">RSA</option>
          <option value="RC4">RC4</option>
          <option value="Camellia">Camellia</option>
          <option value="Serpent">Serpent</option>
          <option value="ElGamal">ElGamal</option>
          <option value="ECC">ECC</option>
          <option value="GOST">GOST</option>
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
