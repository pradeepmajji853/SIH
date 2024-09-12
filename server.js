import crypto from 'crypto';


async function decryptAES(encryptedText, password) {
  try {
    const encryptedData = Buffer.from(encryptedText, 'base64');
    const salt = encryptedData.slice(0, 16); 
    const iv = encryptedData.slice(16, 28); 
    const data = encryptedData.slice(28); 

    const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);

    let decrypted = decipher.update(data);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString('utf8');
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Error during decryption. Please check your password and data.');
  }
}

(async () => {
  const encryptedText = 'nZWtr5f27esvGFeq4WBIBHKnQaEVTxFWrvWqAwfLO24mBq9smEdSYv/1wSecRrx4x16K'; // Replace with your base64 encoded cipher text
  const password = 'McIc$MJ13qGEIcvE';

  try {
    const decryptedText = await decryptAES(encryptedText, password);
    console.log('Decrypted Text:', decryptedText);
  } catch (error) {
    console.error(error.message);
  }
})();

  