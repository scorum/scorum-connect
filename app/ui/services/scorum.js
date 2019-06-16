import api from '@scorum/scorum-js/lib/api';
import config from '@scorum/scorum-js/lib/config';
import auth from '@scorum/scorum-js/lib/auth';
import broadcast from '@scorum/scorum-js/lib/broadcast';

if (process.env.NODE_ENV !== 'production') {
  global.scorum = {};
  global.scorum.api = api;
  global.scorum.auth = auth;
}

let initialized = false;

export const initialize = () => {
  api.setOptions({ url: process.env.SCORUM_MAIN_RPC_URL });
  config.set('chain_id', process.env.SCORUM_MAIN_CHAIN_ID);
  config.set('address_prefix', 'SCR');
  initialized = true;
};

export const isInitialized = () => initialized;

/**
 * Retrieve accounts from scorum by public key
 * @param {string} publicKey
 * @returns {[]} - array of account names
 */
export const getAccountsByPublicKey = accounts => api.getKeyReferencesAsync(accounts);

/**
 * Retrieve accounts from scorum by array of usernames
 * @param {[string]} userName
 * @returns {[{}]} - collection of accounts
 */
export const getAccounts = accounts => api.getAccountsAsync(accounts);


export const wifToPublic = privateKey => auth.wifToPublic(privateKey);

export const broadcastMethod = (method, privateKey, params) => broadcast[`${method}WithAsync`](privateKey, params);
