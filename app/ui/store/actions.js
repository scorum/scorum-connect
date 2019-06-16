import omit from 'lodash/omit';
import { ExtensionStore } from '../../helpers/extension-store';

// TODO: think about inject store like in popup.js
// launchUi(({ extensionStore }) => {})
// or do ExtensionStore as singleton
const extensionStore = new ExtensionStore();

// TODO: add automatic persist, when store was changed

export const addAccount = (state, account) => {
  const accounts = {
    ...state.accounts,
    ...{
      [account.username]: account,
    },
  };

  extensionStore.set({ accounts });
  return { accounts };
};

export const removeAccount = (state, account) => {
  const accounts = omit(state.accounts, [account]);

  extensionStore.set({ accounts });
  return { accounts };
};

export const hideNotification = state => ({
  ...state,
  notificationShowed: false,
});

export const showNotification = state => ({
  ...state,
  notificationShowed: true,
});

export const setTransaction = (state, { trx }) => {
  extensionStore.set({ trx });
  return { trx };
};

export const clearTransaction = () => {
  extensionStore.set({ trx: {} });
  return { trx: {} };
};
