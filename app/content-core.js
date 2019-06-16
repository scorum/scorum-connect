import { ExtensionPlatform } from './helpers/extension-platform';
import { ExtensionStore } from './helpers/extension-store';

global.platform = new ExtensionPlatform();

// TODO: setupSentry Sentry

export async function launchUi(cb) {
  const extensionStoreInstance = new ExtensionStore();

  await cb({ extensionStore: extensionStoreInstance });
}
