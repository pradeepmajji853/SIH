import React, { useState } from 'react';
import './Decryptpage.css';

function Decryptpage() {
  const [cipherText, setCipherText] = useState('');
  const [showPredictingPopup, setShowPredictingPopup] = useState(false);
  const [showAlgorithmPopup, setShowAlgorithmPopup] = useState(false);
  const [predictedAlgorithm, setPredictedAlgorithm] = useState('');
  const [precision, setPrecision] = useState('');

  // Simulating a call to the backend to predict the algorithm
  const predictAlgorithm = async () => {
    try {
      // Simulate the backend response
      const response = await fetch('/api/predict-algorithm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cipherText }),
      });

      const data = await response.json();
      setPredictedAlgorithm(data.algorithm);
      setPrecision(data.precision);
    } catch (error) {
      console.error('Error predicting algorithm:', error);
      setPredictedAlgorithm('Unknown');
      setPrecision('N/A');
    }
  };

  // Handler for decrypt button
  const handleDecrypt = async () => {
    setShowPredictingPopup(true);

    // Simulate predicting algorithm for 2 seconds
    setTimeout(async () => {
      setShowPredictingPopup(false);

      // Call the backend to predict algorithm
      await predictAlgorithm();

      // Show the algorithm popup after prediction
      setShowAlgorithmPopup(true);
    }, 2000);
  };

  return (
    <div className='Decrypt-page'>
      <img src="assets/text3.png" alt="Decryption" />
      <p className='text-content'>
        Decryption is the process of converting encrypted ciphertext back into its original plain text form.
      </p>

      <div className='decryption-form'>
        <textarea
          className="cipher-text"
          placeholder="Enter Cipher Text here..."
          value={cipherText}
          onChange={(e) => setCipherText(e.target.value)}
        />
        <button className='submit-button' onClick={handleDecrypt}>Decrypt</button>
      </div>

      {/* Popup for predicting algorithm */}
      {showPredictingPopup && (
        <div className="popup">
          <h3>Predicting Algorithm...</h3>
        </div>
      )}

      {/* Popup for displaying predicted algorithm */}
      {showAlgorithmPopup && (
        <div className="popup">
          <h3>Algorithm Predicted</h3>
          <p><strong>Algorithm:</strong> {predictedAlgorithm}</p>
          <p><strong>Precision:</strong> {precision}</p>
          <button className="close-button" onClick={() => setShowAlgorithmPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Decryptpage;
