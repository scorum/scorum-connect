import '@babel/polyfill';

import OptionsSync from 'webext-options-sync';
import { ExtensionPlatform } from './helpers/extension-platform';
import { ExtensionStore } from './helpers/extension-store';
import { MESSAGE_EVENTS } from './constants';
// TODO: move services to app
import { initialize as initializeScorumJs, broadcastMethod } from './ui/services/scorum';

async function signAndBroadcast(privateKey, method, params) {
  console.log('method, username, params', method, params);

  // TODO: catch errors
  try {
    await broadcastMethod(method, privateKey, params);
  } catch (err) {
    console.error(err);
  }

  return true;
}

async function getPrivateKey(username) {
  const extensionStore = new ExtensionStore();
  const store = await extensionStore.get();

  if (!store) {
    console.error('you shoud add accounts into extension');
    return;
  }

  if (!store.accounts || !store.accounts[username]) {
    console.error('account is invalid');
    return;
  }

  return store.accounts[username].key;
}

async function chooseListener(action, data) {
  const result = {
    response: '',
  };

  if (action === MESSAGE_EVENTS.CHOOSE_KEY_FOR_SIGN) {
    console.log(`Background (msg event): ${MESSAGE_EVENTS.CHOOSE_KEY_FOR_SIGN}`);
    return result;
  }

  if (action === MESSAGE_EVENTS.EXT_SIGN_AND_BROADCAST) {
    const privateKey = await getPrivateKey(data.username);

    // TODO: check result or catch error
    const res = await signAndBroadcast(privateKey, data.trx.method, data.trx.params);
    if (res) {
      result.response = 'All OK!';
    }
    return result;
  }

  console.log(`Background: Msg Event "${action}"not found `);
  return result;
}

async function init() {
  initializeScorumJs();

  new OptionsSync().define({
    defaults: {
      previewCount: true,
      dropdown: 'compact',
      notifyTransactions: false,
    },
  });

  if (ExtensionPlatform && ExtensionPlatform.addMessageListener) {
    ExtensionPlatform.addMessageListener(({ action = '', data }, { tab }, sendResponse) => {
      if (tab && tab.id) {
        chooseListener(action, data)
          .then(res => sendResponse(res));
      }

      return true;
    });
  }
}

init();

/* On first install, open a new tab with ScorumConnect */
// extension.runtime.onInstalled.addListener(({ reason }) => {
  // if ((reason === 'install') && (!SCORUM_CONNECT_DEBUG)) {
  //   platform.openExtensionInBrowser();
  // }

  // OR

  // window.open(chrome.runtime.getURL('app/settings.html?firstTime=true'))
// });
