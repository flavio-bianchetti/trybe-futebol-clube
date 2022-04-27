import * as bcrypt from 'bcryptjs';

export default class CryptPass {
  public static generate(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  public static verify(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
