import fs from 'fs';
import path from 'path';

async function globalTeardown() {
  const authDir = path.join(__dirname, 'playwright', '.auth');
  const authFile = path.join(authDir, 'user.json');

  try {
    if (fs.existsSync(authFile)) {
      fs.unlinkSync(authFile);
      console.log(`Authentication state deleted: ${authFile}`);
    }
  } catch (error) {
    console.error(`Error deleting auth state: ${error}`);
  }
}

export default globalTeardown;
