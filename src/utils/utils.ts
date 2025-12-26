import { Locator } from '@playwright/test';

/**
 * Get text content from element with fallback
 * @param element - Locator object
 * @returns Text content or empty string
 */
export const getText = async (element: Locator): Promise<string> => {
  return (await element.textContent()) || '';
};

/**
 * Get attribute value from element
 * @param element - Locator object
 * @param attribute - Attribute name
 * @returns Attribute value or null
 */
export const getAttribute = async (
  element: Locator,
  attribute: string
): Promise<string | null> => {
  return await element.getAttribute(attribute);
};

/**
 * Check if element is visible (with timeout handling)
 * Useful for conditional logic in tests
 * @param element - Locator object
 * @param timeout - Timeout in milliseconds (default: 5000)
 * @returns true if visible, false otherwise
 */
export const isVisible = async (element: Locator, timeout = 5000): Promise<boolean> => {
  try {
    await element.waitFor({ state: 'visible', timeout });
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if element is hidden (with timeout handling)
 * @param element - Locator object
 * @param timeout - Timeout in milliseconds (default: 5000)
 * @returns true if hidden, false otherwise
 */
export const isHidden = async (element: Locator, timeout = 5000): Promise<boolean> => {
  try {
    await element.waitFor({ state: 'hidden', timeout });
    return true;
  } catch {
    return false;
  }
};

/**
 * Wait for element to be in a specific state
 * @param element - Locator object
 * @param state - Element state ('visible' | 'hidden' | 'attached' | 'detached')
 * @param timeout - Timeout in milliseconds (default: 5000)
 */
export const waitForElement = async (
  element: Locator,
  state: 'visible' | 'hidden' | 'attached' | 'detached' = 'visible',
  timeout = 5000
): Promise<void> => {
  await element.waitFor({ state, timeout });
};
