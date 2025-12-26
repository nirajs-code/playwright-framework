/**
 * Test Data Configuration
 * Centralized location for all test data
 */

export const testData = {
  users: {
    validUser: {
      username: process.env.USERNAME || '',
      password: process.env.PASSWORD || '',
    },
    invalidUser: {
      username: 'invalid@test.com',
      password: 'wrongpassword',
    },
  },
  
  urls: {
    baseURL: process.env.URL || 'https://www.amazon.co.uk',
  },
  
  expectedTexts: {
    homepage: {
      title: 'Amazon.co.uk: Low Prices in Electronics, Books, Sports Equipment & more',
    },
    login: {
      signInHeading: /Sign\s+in/i,
    },
  },
};
