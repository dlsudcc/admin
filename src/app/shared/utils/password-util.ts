import { secretKey } from "src/environment";
import CryptoJS from 'crypto-js';
export class PasswordUtils {
  static encryptData(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  }
  static decryptData(data: string): string {
    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8); // Convert bytes to string using UTF-8 encoding
  }
}