import { Locator } from "@playwright/test";

// Check the input checkbox
export const check = async (element: Locator): Promise<void> => {
  await element.check();
}

// Click the element
export const click = async (element: Locator): Promise<void> => {
  await element.click();
};

// Fill the form field, input text
export const fill = async (element: Locator, text: string): Promise<void> => {
  await element.fill(text);
};

// Uncheck the input checkbox
export const uncheck = async (element: Locator): Promise<void> => {
  await element.uncheck();
}

// Hover mouse over the element
export const hover = async (element: Locator): Promise<void> => {
  await element.hover();
};

// Focus the element
export const focus = async (element: Locator): Promise<void> => {
  await element.focus();
};

// Press single key
export const press = async (element: Locator, key: string): Promise<void> => {
  await element.press(key);
};

// Pick files to upload
export const setInputFiles = async (element: Locator, filePath: string): Promise<void> => {
  await element.setInputFiles(filePath);
};

// Select option from dropdown
export const selectOption = async (element: Locator, value: string): Promise<void> => {
  await element.selectOption(value);
};

export const getText = async (element: Locator): Promise<string> => {
  return await element.textContent() || '';
};

export const isVisible = async (element: Locator): Promise<boolean> => {
  try {
    await element.waitFor({ state: 'visible', timeout: 5000 });
    return true;
  } catch {
    return false;
  }
};

export const isHidden = async (element: Locator): Promise<boolean> => {
  try {
    await element.waitFor({ state: 'hidden', timeout: 5000 });
    return true;
  } catch {
    return false;
  }
};

export const getAttribute = async (element: Locator, attribute: string): Promise<string | null> => {
  return await element.getAttribute(attribute);
};

export const waitForElement = async (element: Locator, timeout: number = 5000): Promise<void> => {
  await element.waitFor({ state: 'visible', timeout });
};