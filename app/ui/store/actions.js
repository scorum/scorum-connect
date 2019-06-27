import omit from 'lodash/omit';
import keyBy from 'lodash/keyBy';
import each from 'lodash/each';
import { ExtensionStore } from '../../helpers/extension-store';
import { USER_PROFILE_KEYS } from '../../constants';

// TODO: think about inject store like in popup.js
// launchUi(({ extensionStore }) => {})
// or do ExtensionStore as singleton
const extensionStore = new ExtensionStore();

// TODO: add automatic persist, when store was changed

export const addAccount = (state, { username, privateKey, bcProfile, profile }) => {
  const account = {
    [USER_PROFILE_KEYS.USERNAME]: username,
    [USER_PROFILE_KEYS.KEY]: privateKey,
    [USER_PROFILE_KEYS.SCR]: bcProfile.balance.slice(0, -4),
    [USER_PROFILE_KEYS.SP]: bcProfile.scorumpower.slice(0, -3),
    [USER_PROFILE_KEYS.VP]: bcProfile.voting_power,
    [USER_PROFILE_KEYS.DISPLAY_NAME]: profile.display_name,
    [USER_PROFILE_KEYS.AVATAR]: profile.avatar_url,
    [USER_PROFILE_KEYS.COVER_URL]: profile.cover_url,
    [USER_PROFILE_KEYS.BIO]: profile.bio,
    [USER_PROFILE_KEYS.FOLLOWERS_COUNT]: profile.followers_count,
    [USER_PROFILE_KEYS.FOLLOWING_COUNT]: profile.following_count,
    [USER_PROFILE_KEYS.LOCATION]: profile.location,
  };

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

export const refreshProfiles = (state, profiles) => {
  const profilesObject = keyBy(profiles, 'name');

  const refreshedAccounts = { ...state.accounts };

  each(refreshedAccounts, (account) => {
    account[USER_PROFILE_KEYS.SCR] = profilesObject[account[USER_PROFILE_KEYS.USERNAME]].balance.slice(0, -4);
    account[USER_PROFILE_KEYS.SP] = profilesObject[account[USER_PROFILE_KEYS.USERNAME]].scorumpower.slice(0, -3);
    account[USER_PROFILE_KEYS.VP] = profilesObject[account[USER_PROFILE_KEYS.USERNAME]].voting_power;
  });

  extensionStore.set({ accounts: refreshedAccounts });
  return { accounts: refreshedAccounts };
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
