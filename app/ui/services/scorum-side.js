import api from '@scorum/scorum-side-js/lib/api';
// import broadcast from '@scorum/scorum-side-js/lib/broadcast';
import config from '@scorum/scorum-side-js/lib/config';

let initialized = false;

export const initialize = () => {
  api.setOptions({ url: process.env.SCORUM_SIDE_MAIN_RPC_URL });
  config.set('chain_id', process.env.SCORUM_SIDE_MAIN_CHAIN_ID);
  config.set('address_prefix', 'SCR');
  initialized = true;
};

export const isInitialized = () => initialized;

/**
 * Get profile information
 * @see https://github.com/scorum/scorum-side-js/blob/master/examples/server/get-profile.js
 * @param {string} account name
 * @returns {{}} - object with profile information
 */
export const getProfile = username => api.getProfileAsync(username);

/**
 * Get profiles information
 * @see https://github.com/scorum/scorum-side-js/blob/master/examples/server/get-profiles.js
 * @param {string[]} - array of account names
 * @returns {{}} - object with profile information
 */
export const getProfiles = usernames => api.getProfilesAsync(usernames);
