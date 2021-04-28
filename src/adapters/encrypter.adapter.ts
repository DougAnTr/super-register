import { hash, compare } from "bcrypt";

export default class Encrypter {
  public static async encrypt(value: string) {
    return hash(value, 10);
  }

  public static async validateHash(value: string, hash: string) {
    return compare(value, hash);
  }
}
