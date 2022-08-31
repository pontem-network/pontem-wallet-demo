import { IPontemWalletProvider, IWindow } from './types';

export function camelCaseKeysToUnderscore(obj: any) {
  if (typeof obj !== 'object') {
    return obj;
  }

  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const oldName in obj) {
    // Camel to underscore
    const newName = oldName.replace(/([A-Z])/g, ($1) => `_${$1.toLowerCase()}`);

    // Only process if names are different
    if (newName !== oldName) {
      // Check for the old property name to avoid a ReferenceError in strict mode.
      if (obj.hasOwnProperty(oldName)) {
        // eslint-disable-next-line no-param-reassign
        obj[newName] = obj[oldName];
        // eslint-disable-next-line no-param-reassign
        delete obj[oldName];
      }
    }

    // Recursion
    if (typeof obj[newName] === 'object') {
      // eslint-disable-next-line no-param-reassign
      obj[newName] = camelCaseKeysToUnderscore(obj[newName]);
    }
  }
  return obj;
}

export function detectPontemProvider<T extends IPontemWalletProvider>(
  { timeout = 3000 } = {},
): Promise<T | undefined> {
  let handled = false;

  return new Promise((resolve) => {
    if ((window as IWindow).pontem) {
      handleProvider();
    } else {
      setTimeout(() => {
        handleProvider();
      }, timeout);
    }

    function handleProvider() {
      if (handled) {
        return;
      }
      handled = true;
      const { pontem } = window as IWindow;

      if (pontem) {
        resolve(pontem as unknown as T);
      } else {
        resolve(undefined);
      }
    }
  });
}

export const camel2title = (camelCase: string) => camelCase
  .replace(/([A-Z])/g, (match) => ` ${match}`)
  .replace(/^./, (match) => match.toUpperCase())
  .trim();
