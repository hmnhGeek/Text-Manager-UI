import * as CryptoJS from 'crypto-js';

class SecureEncryptor {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  encrypt(text: string): string {
    const encryptedText = CryptoJS.AES.encrypt(text, this.key).toString();
    return encryptedText;
  }

  decrypt(encryptedText: string): string {
    const decryptedText = CryptoJS.AES.decrypt(encryptedText, this.key).toString(CryptoJS.enc.Utf8);
    return decryptedText;
  }
}

export default SecureEncryptor;