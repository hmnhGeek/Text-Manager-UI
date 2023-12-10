class SecureEncryptor {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  private applyKey(text: string, operation: 'encrypt' | 'decrypt'): string {
    let result = '';
    const keyLen = this.key.length;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      if (char.match(/[a-zA-Z]/)) {
        const keyChar = this.key[i % keyLen];
        const keyShift = keyChar.charCodeAt(0);

        let start: number;
        if (char === char.toLowerCase()) {
          start = 'a'.charCodeAt(0);
        } else {
          start = 'A'.charCodeAt(0);
        }

        let shiftedChar: string;
        if (operation === 'encrypt') {
          shiftedChar = String.fromCharCode(((char.charCodeAt(0) - start + keyShift) % 26) + start);
        } else {
          shiftedChar = String.fromCharCode(((char.charCodeAt(0) - start - keyShift + 26) % 26 + 26) % 26 + start);
        }

        result += shiftedChar;
      } else {
        result += char;
      }
    }

    return result;
  }

  encrypt(text: string): string {
    return this.applyKey(text, 'encrypt');
  }

  decrypt(text: string): string {
    return this.applyKey(text, 'decrypt');
  }
}

export default SecureEncryptor;