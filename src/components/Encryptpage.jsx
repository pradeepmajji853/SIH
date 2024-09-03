import React, { useState } from 'react';
import "./Encryptpage.css";

function Encryptpage() {
  const [text, setText] = useState('');
  const [algorithm, setAlgorithm] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const data = { text, algorithm };
    console.log(data);

//     fetch('/api/encrypt', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log('Success:', data);
//     })
//     .catch((error) => {
//       console.error('Error:', error);

//     });

setText('');
setAlgorithm('');
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
          <option value="AES">AES</option>
          <option value="DES">DES</option>
          <option value="RSA">RSA</option>
          <option value="Blowfish">Blowfish</option>
        </select>
        <button type="submit" className='submit-button'>Encrypt</button>
      </form>
    </div>
  );
}

export default Encryptpage;
