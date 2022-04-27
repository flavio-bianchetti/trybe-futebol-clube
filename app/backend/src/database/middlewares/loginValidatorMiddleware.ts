import { Request, Response, NextFunction } from 'express';

export default class LoginValidatorMiddleware {
  private static emailValidator = (email: string): boolean => {
    // regex adaptado do site:
    // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    const emailRegex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    return !!email.match(emailRegex);
  };

  private static passwordValidator = (password: string): boolean => password.length > 6;

  public static validate =
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }

      if (!this.emailValidator(email) || !this.passwordValidator(password)) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server error' });
    }
  };
}
