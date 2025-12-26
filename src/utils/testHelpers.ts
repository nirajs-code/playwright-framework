
export class DataHelper {
  /**
   * Generate random email with timestamp
   * @param prefix - Email prefix (default: 'test')
   * @returns email in format: prefix_timestamp@example.com
   * @example
   * DataHelper.generateEmail('user') // => 'user_1735200000000@example.com'
   */
  static generateEmail(prefix = 'test'): string {
    return `${prefix}_${Date.now()}@example.com`;
  }

  /**
   * Generate random string
   * @param length - Length of the string (default: 10)
   * @returns Random alphanumeric string
   * @example
   * DataHelper.generateRandomString(8) // => 'k9x2m4p1'
   */
  static generateRandomString(length = 10): string {
    return Math.random().toString(36).substring(2, length + 2);
  }

  /**
   * Generate random number within a range
   * @param min - Minimum value (default: 0)
   * @param max - Maximum value (default: 100)
   * @returns Random number between min and max (inclusive)
   * @example
   * DataHelper.generateRandomNumber(1, 10) // => 7
   */
  static generateRandomNumber(min = 0, max = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate random UK phone number
   * @returns Phone number in format: +44XXXXXXXXXX
   * @example
   * DataHelper.generatePhoneNumber() // => '+447459590380'
   */
  static generatePhoneNumber(): string {
    const number = Math.floor(1000000000 + Math.random() * 9000000000);
    return `+44${number}`;
  }

  /**
   * Generate random full name
   * @returns First name and last name
   * @example
   * DataHelper.generateFullName() // => 'John Smith'
   */
  static generateFullName(): { firstName: string; lastName: string; fullName: string } {
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'James', 'Olivia'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`
    };
  }

  /**
   * Generate random date within a range
   * @param startYear - Start year (default: current year - 1)
   * @param endYear - End year (default: current year)
   * @returns Random date
   * @example
   * DataHelper.generateRandomDate(2020, 2025)
   */
  static generateRandomDate(startYear?: number, endYear?: number): Date {
    const currentYear = new Date().getFullYear();
    const start = new Date(startYear || currentYear - 1, 0, 1);
    const end = new Date(endYear || currentYear, 11, 31);
    
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}
