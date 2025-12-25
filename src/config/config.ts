export const config = {
  baseURL: process.env.URL || 'https://www.amazon.co.uk',
  username: process.env.USERNAME || '',
  password: process.env.PASSWORD || '',
  timeout: 20000,
  headless: false,
};