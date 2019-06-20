import extension from 'extensionizer';

// Returns whether or not the given object contains no keys
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

// TODO: think about rewrite class into collection of functions

/**
 * A wrapper around the extension's storage local API
 */
export class ExtensionStore {
  /**
   * @constructor
   */
  constructor() {
    this.isSupported = !!(extension.storage.local);
    if (!this.isSupported) {
      console.error('Storage local API not available.');
    }
  }

  // Returns all of the keys currently saved
  async get() {
    if (!this.isSupported) {
      return undefined;
    }

    const result = await ExtensionStore._get();
    // extension.storage.local always returns an obj
    // if the object is empty, treat it as undefined
    if (isEmpty(result)) {
      return undefined;
    }

    return result;
  }

  // Sets the key in local state
  async set(state) {
    return ExtensionStore._set(state);
  }

  // Returns all of the keys currently saved
  static _get() {
    const { local } = extension.storage;

    return new Promise((resolve, reject) => {
      local.get(null, (result) => {
        const err = extension.runtime.lastError;
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Sets the key in local state
  static _set(obj) {
    const { local } = extension.storage;

    return new Promise((resolve, reject) => {
      local.set(obj, () => {
        const err = extension.runtime.lastError;
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
