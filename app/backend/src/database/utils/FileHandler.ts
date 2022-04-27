import * as fs from 'fs/promises';

export default class FileHandler {
  public static async readFile(fileName: string): Promise<string> {
    return fs.readFile(fileName, { encoding: 'utf-8' });
  }

  public static async writeFile(fileName: string, content: string): Promise<void> {
    await fs.writeFile(fileName, content.trim(), { encoding: 'utf-8' });
  }
}
